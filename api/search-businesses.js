// /api/search-businesses.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function searchBusinesses(req, res) {
  try {
    // Ensure JSON body is present
    const { query, city } = req.body || {};

    if (!query || !city) {
      return res.status(400).json({ error: "Missing query or city" });
    }

    // Require Gemini key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not set in Cloud Run environment variables",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
List 5 real businesses for:
Type: ${query}
City: ${city}

Return ONLY a valid JSON array.
Each item must include:
- name
- address
- mapsUri
`;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "";

    // Gemini sometimes wraps JSON in ```json ... ```
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        raw: text,
      });
    }

    if (!Array.isArray(parsed)) {
      return res.status(500).json({
        error: "Gemini did not return an array",
        raw: text,
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("search-businesses error:", err);
    return res.status(500).json({
      error: err?.message || "search-businesses failed",
    });
  }
}
