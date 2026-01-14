// api/search-businesses.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_CANDIDATES = [
  // Newer names (some projects have these enabled)
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",

  // “-latest” names (common on v1beta)
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",

  // Older v1beta names (often available)
  "gemini-pro",
  "text-bison-001",
];

async function generateWithFirstWorkingModel(genAI, prompt) {
  let lastErr = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result?.response?.text?.() || "";
      return { modelName, text };
    } catch (err) {
      lastErr = err;
      // If this model isn't found / supported, try next
      const msg = err?.message || String(err);
      const isNotFound =
        msg.includes("404") ||
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("is not supported");

      if (!isNotFound) {
        // If it's NOT a model-name issue (e.g., auth/quota), stop immediately
        throw err;
      }
    }
  }

  const msg = lastErr?.message || String(lastErr);
  const hint =
    "None of the candidate model IDs worked for this API key/project. " +
    "Your Gemini API access may be restricted, not enabled, or using a different API version/SDK expectation.";

  const err = new Error(`${hint} Last error: ${msg}`);
  err._lastErr = lastErr;
  throw err;
}

export default async function searchBusinesses(req, res) {
  res.setHeader("Content-Type", "application/json");

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing GEMINI_API_KEY on server",
        hint: "Set GEMINI_API_KEY in Cloud Run env vars and redeploy.",
      });
    }

    const { query, city } = req.body || {};
    if (!query || !city) {
      return res.status(400).json({
        error: "Missing query or city",
        received: { query, city },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `
Return ONLY a valid JSON array (no markdown, no code fences).

Task: List 5 business candidates for:
Type: ${query}
City: ${city}

Each item MUST include:
- name (string)
- address (string)
- mapsUri (string URL; can be "https://maps.google.com/?q=" + encodeURIComponent(name + " " + address))
- phoneNumber (string optional)

Return ONLY JSON array.
    `.trim();

    const { modelName, text } = await generateWithFirstWorkingModel(genAI, prompt);

    const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({
        error: "Gemini returned non-JSON",
        modelUsed: modelName,
        raw: text.slice(0, 2000),
      });
    }

    if (!Array.isArray(parsed)) {
      return res.status(500).json({
        error: "Gemini returned JSON but not an array",
        modelUsed: modelName,
        raw: parsed,
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("search-businesses ERROR:", err);
    return res.status(500).json({
      error: "Search failed (details below)",
      message: err?.message || String(err),
      details: err?._lastErr?.response?.data || err?.response?.data || null,
    });
  }
}
