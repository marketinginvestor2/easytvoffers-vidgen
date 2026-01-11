// api/search-businesses.ts
import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonSafe = (text: string) => {
  if (!text) return null;
  let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const startObj = cleaned.indexOf("{");
    const startArr = cleaned.indexOf("[");
    let start = -1;
    let end = -1;

    if (startObj !== -1 && (startArr === -1 || startObj < startArr)) {
      start = startObj;
      let count = 0;
      for (let i = start; i < cleaned.length; i++) {
        if (cleaned[i] === "{") count++;
        else if (cleaned[i] === "}") count--;
        if (count === 0) {
          end = i;
          break;
        }
      }
    } else if (startArr !== -1) {
      start = startArr;
      let count = 0;
      for (let i = start; i < cleaned.length; i++) {
        if (cleaned[i] === "[") count++;
        else if (cleaned[i] === "]") count--;
        if (count === 0) {
          end = i;
          break;
        }
      }
    }

    if (start !== -1 && end !== -1) {
      const jsonStr = cleaned.substring(start, end + 1);
      try {
        return JSON.parse(jsonStr);
      } catch {
        return null;
      }
    }
    return null;
  }
};

export default async function handler(req: Request, res: Response) {
  try {
    const { query, city } = req.body || {};
    if (!query || String(query).trim().length < 3) return res.json([]);

    const prompt = `Search Google Maps for "${query}" in "${city}". Provide top 3 results.
Extract phone number and maps URI. Return as JSON array: "name", "address", "mapsUri", "phoneNumber".`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { tools: [{ googleMaps: {} }] },
    });

    const text = (response as any)?.text || "";
    const data = parseJsonSafe(text);

    if (Array.isArray(data)) return res.json(data);
    if (data && typeof data === "object") return res.json([data]);

    return res.json([]);
  } catch (error: any) {
    console.error("Search error:", error);
    return res.status(500).json({ error: error?.message || "Search failed" });
  }
}
