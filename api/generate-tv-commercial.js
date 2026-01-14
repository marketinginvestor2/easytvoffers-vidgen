// api/generate-tv-commercial.js

export default async function generateTvCommercial(req, res) {
  try {
    const {
      businessName = "Your Business",
      offer = "A limited-time offer",
      phone = "",
      website = "",
      zipCodes = [],
      tone = "confident",
      lengthSeconds = 30
    } = req.body || {};

    const script = [
      `This is ${businessName}.`,
      offer,
      phone ? `Call ${phone}.` : null,
      website ? `Visit ${website}.` : null,
      zipCodes.length ? `Serving ${zipCodes.join(", ")}.` : null,
      `(Tone: ${tone}, ${lengthSeconds}s)`
    ]
      .filter(Boolean)
      .join(" ");

    res.status(200).json({
      ok: true,
      message: "generate-tv-commercial placeholder is live",
      script
    });
  } catch (err) {
    console.error("generate-tv-commercial error:", err);
    res.status(500).json({ ok: false, error: "generate-tv-commercial failed" });
  }
}
