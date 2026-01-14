// api/search-businesses.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function searchBusinesses(req, res) {
  // Always return JSON
  res.setHeader("Content-Type", "application/json");

  try {
    // 1) Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY on server",
        hint: "Set GEMINI_API_KEY in Cloud Run env vars and redeploy."
      });
    }

    // 2) Validate request body
    const { query, city } = req.body || {};
    if (!query || !city) {
      return res.status(400).json({
        error: "Missing query or city",
        received: { query, city }
      });
    }

    // 3) Call Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try a very safe, stable model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
Return ONLY a valid JSON array (no markdown, no code fences).

Task: List 5 real-looking business candidates for:
Type: ${query}
City: ${city}

Each item MUST include:
- name (string)
- address (string)
- mapsUri (string URL, can be "https://maps.google.com/?q=" + encodeURIComponent(name + " " + address))
- phoneNumber (string optional)

Return ONLY JSON array.
    `.trim();

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "";

    // 4) Parse JSON reliably (strip possible ```json fences)
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      return res.status(500).json({
        error: "Gemini returned non-JSON",
        raw: text.slice(0, 2000),
      });
    }

    if (!Array.isArray(parsed)) {
      return res.status(500).json({
        error: "Gemini returned JSON but not an array",
        raw: parsed,
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    // ✅ THIS is the key change: show the real error details
    const msg = err?.message || String(err);
    const status = err?.status || err?.code || 500;

    console.error("search-businesses ERROR:", err);

    return res.status(500).json({
      error: "Search failed (details below)",
      message: msg,
      // This helps when Google returns nested objects
      details: err?.response?.data || err?.response || null,
    });
  }
}
