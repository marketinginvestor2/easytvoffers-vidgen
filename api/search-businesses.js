// api/search-businesses.js
// Real business lookup using Google Places Text Search API.
// Returns: [{ name, address, mapsUri, phoneNumber? }]

export default async function searchBusinesses(req, res) {
  try {
    const { query, city } = req.body || {};
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: "Missing query" });
    }

    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing GOOGLE_MAPS_API_KEY" });
    }

    // Build a single search string (business name + optional city)
    const q = city ? `${query} in ${city}` : query;

    // Places Text Search
    const url =
      "https://maps.googleapis.com/maps/api/place/textsearch/json" +
      `?query=${encodeURIComponent(q)}` +
      `&key=${encodeURIComponent(key)}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!r.ok || data.status === "REQUEST_DENIED") {
      return res.status(500).json({
        error: "Places API request failed",
        message: data.error_message || data.status || "Unknown error",
      });
    }

    const results = (data.results || []).slice(0, 8);

    // Convert to your frontend shape
    const out = results.map((p) => ({
      name: p.name,
      address: p.formatted_address || p.vicinity || "",
      mapsUri: p.place_id
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            p.name
          )}&query_place_id=${encodeURIComponent(p.place_id)}`
        : `https://maps.google.com/?q=${encodeURIComponent(p.name)}`,
      // phoneNumber requires Place Details API; leave blank for now
      phoneNumber: undefined,
      placeId: p.place_id,
    }));

    return res.status(200).json(out);
  } catch (e) {
    return res.status(500).json({
      error: "Search failed",
      message: e?.message || String(e),
    });
  }
}
