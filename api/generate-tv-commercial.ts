// api/generate-tv-commercial.ts
import type { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(req: Request, res: Response) {
  try {
    const { business, offer = "", city = "" } = req.body || {};
    if (!business?.name) {
      return res.status(400).json({ error: "Missing business.name" });
    }

    const textPrompt = `
Act as an expert Direct Response TV Copywriter.
Business: ${business.name}
City: ${city}
Offer: ${offer || "Claim your special neighbor offer today"}
Phone: ${business.phoneNumber || "1-800-LOCAL-SPOT"}

TASK:
1. "visualHeadline": A powerful benefit-driven DR headline. MAX 35 characters.
2. "script": A high-converting 60-second broadcast script (approx 160 words).
Return strictly as JSON with "script" and "visualHeadline".
`;

    const textResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            script: { type: Type.STRING },
            visualHeadline: { type: Type.STRING },
          },
          required: ["script", "visualHeadline"],
        },
      },
    });

    const text = (textResponse as any)?.text || "";
    const parsed = (() => {
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    })();

    const script =
      parsed?.script ||
      `Welcome to ${business.name}. Serving ${city} daily. Call now to claim your offer.`;
    const visualHeadline =
      (parsed?.visualHeadline || "EXCEPTIONAL LOCAL SERVICE")
        .toUpperCase()
        .trim();

    // Optional image generation (may return null if model isn't enabled)
    let imageBase64: string | null = null;
    try {
      const imagePrompt = `Wide-angle cinematic scene for a local business named "${business.name}" in ${city}. Photorealistic, professional lighting, no text in image.`;
      const imageResp = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: imagePrompt,
      });
      const parts = (imageResp as any)?.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part?.inlineData?.data) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
    } catch (e) {
      console.warn("Image generation skipped/failed:", e);
    }

    // TTS
    const audioResp = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: script }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } },
        },
      },
    });

    const audioBase64 =
      (audioResp as any)?.candidates?.[0]?.content?.parts?.[0]?.inlineData
        ?.data || null;

    return res.json({
      script,
      visualHeadline,
      audioBase64,
      imageBase64,
    });
  } catch (error: any) {
    console.error("TV Commercial Generation Error:", error);
    return res
      .status(500)
      .json({ error: error?.message || "Generation failed" });
  }
}
