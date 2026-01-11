import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
import searchBusinesses from "./api/search-businesses.js";
import generateTvCommercial from "./api/generate-tv-commercial.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----- Config -----
const PORT = process.env.PORT || 8080;
const APP_BASE_URL = process.env.APP_BASE_URL || "";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || "";

if (!STRIPE_SECRET_KEY) console.warn("Missing STRIPE_SECRET_KEY");
if (!STRIPE_PRICE_ID) console.warn("Missing STRIPE_PRICE_ID");
if (!APP_BASE_URL) console.warn("Missing APP_BASE_URL (recommended)");

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// ----- API -----
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, service: "easy-tv-offers", ts: Date.now() });
});
// ----- Gemini AI Routes -----
app.post("/api/search-businesses", searchBusinesses);
app.post("/api/generate-tv-commercial", generateTvCommercial);

// TRIAL checkout (qty defaults to 1)
app.post("/api/checkout-trial", async (req, res) => {
  try {
    const { email, success_path = "/success", cancel_path = "/cancel" } = req.body || {};

    if (!APP_BASE_URL) return res.status(500).json({ error: "APP_BASE_URL not set" });
    if (!STRIPE_SECRET_KEY) return res.status(500).json({ error: "STRIPE_SECRET_KEY not set" });
    if (!STRIPE_PRICE_ID) return res.status(500).json({ error: "STRIPE_PRICE_ID not set" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email || undefined,
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      subscription_data: {
        trial_period_days: 30
      },
      success_url: `${APP_BASE_URL}${success_path}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_BASE_URL}${cancel_path}`,
      metadata: { flowType: "trial" }
    });

    res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("checkout-trial error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// MULTI-ZIP checkout (qty passed in body)
app.post("/api/checkout-multizip", async (req, res) => {
  try {
    const {
      email,
      qty = 1,
      zipCodes = [],
      success_path = "/success",
      cancel_path = "/cancel"
    } = req.body || {};

    if (!APP_BASE_URL) return res.status(500).json({ error: "APP_BASE_URL not set" });
    if (!STRIPE_SECRET_KEY) return res.status(500).json({ error: "STRIPE_SECRET_KEY not set" });
    if (!STRIPE_PRICE_ID) return res.status(500).json({ error: "STRIPE_PRICE_ID not set" });

    const quantity = Math.max(1, Number(qty) || 1);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email || undefined,
      line_items: [{ price: STRIPE_PRICE_ID, quantity }],
      success_url: `${APP_BASE_URL}${success_path}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_BASE_URL}${cancel_path}`,
      metadata: {
        flowType: "multizip",
        zipCodes: Array.isArray(zipCodes) ? zipCodes.join(",") : String(zipCodes || "")
      }
    });

    res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("checkout-multizip error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Session lookup
app.get("/api/session", async (req, res) => {
  try {
    const sessionId = String(req.query.session_id || "");
    if (!sessionId) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "line_items"]
    });

    // pull qty reliably
    let qty = 1;
    try {
      const li = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
      qty = li?.data?.[0]?.quantity || 1;
    } catch (_) {
      // not fatal
    }

    const metadata = session.metadata || {};
    const subscription = session.subscription || null;

    res.status(200).json({
      flowType: metadata.flowType || "",
      zipCount: qty,
      zipCodes: (metadata.zipCodes || "").split(",").map(s => s.trim()).filter(Boolean),
      trialEnd: subscription?.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
      nextBillingDate: subscription?.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      customerId: session.customer || null,
      subscriptionId: subscription?.id || null
    });
  } catch (err) {
    console.error("session error:", err);
    res.status(500).json({ error: "Failed to retrieve session details" });
  }
});

// ----- Serve the Vite build (dist) -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

// SPA fallback (keeps React routes working)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


