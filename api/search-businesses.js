// api/search-businesses.js

export default async function searchBusinesses(req, res) {
  try {
    const { query = "", location = "", limit = 10 } = req.body || {};

    return res.status(200).json({
      ok: true,
      message: "search-businesses placeholder is live",
      input: { query, location, limit },
      results: []
    });
  } catch (err) {
    console.error("search-businesses error:", err);
    res.status(500).json({ ok: false, error: "search-businesses failed" });
  }
}
