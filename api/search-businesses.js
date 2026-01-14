// api/search-businesses.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function searchBusinesses(req, res) {
  try {
    const { query, city } = req.body || {};

    if (!query || !city) {
      return res.status(400).json({ error: "Missing query or city" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
List 5 real businesses for:
Type: ${query}
City: ${city}

Return ONLY valid JSON array.
Each item must include:
- name
- address
- mapsUri
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        raw: text,
      });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("search-businesses error:", err);
    res.status(500).json({ error: "Search failed" });
  }
}
