import express from "express";
import cors from "cors";
import path from "path";
import Stripe from "stripe";

/**
 * Cloud Run / Node server
 * Serves:
 *  - API routes under /api/*
 *  - Frontend build from /dist
 */

// -------------------- Stripe Setup --------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const PRICE_ID =
  process.env.STRIPE_PRICE_ID || "price_1SnxspAmtP0cuRDmt8bjUAvV";

const BASE_URL =
  process.env.APP_BASE_URL || "https://easytvoffers.com";

// -------------------- Express App --------------------
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// -------------------- API: Trial Checkout --------------------
// POST /api/checkout/trial
app.post("/api/checkout/trial", async (req, res) => {
  try {
    const { businessName, businessType, city, primaryZip, qrDestination } =
      req.body || {};

    if (!primaryZip) {
      return res.status(400).json({ error: "primaryZip required" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      subscription_data: { trial_period_days: 30 },
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/#generator`,
      metadata: {
        businessName,
        businessType,
        city,
        primaryZip,
        zipCodes: primaryZip,
        qrDestination,
        flowType: "trial_1zip",
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("[TRIAL ERROR]", err);
    return res
      .status(500)
      .json({ error: err?.message || "Stripe trial session creation failed" });
  }
});

// -------------------- API: Multi-Zip Paid Checkout --------------------
// POST /api/checkout/multizip
app.post("/api/checkout/multizip", async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      city,
      zipCodes,
      zipCount,
      qrDestination,
    } = req.body || {};

    if (!zipCount || zipCount < 2) {
      return res
        .status(400)
        .json({ error: "Multi-zip flow requires at least 2 zip codes" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PRICE_ID, quantity: zipCount }],
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/#generator`,
      metadata: {
        businessName,
        businessType,
        city,
        zipCodes: Array.isArray(zipCodes) ? zipCodes.join(",") : zipCodes,
        qrDestination,
        flowType: "paid_multizip",
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("[PAID ERROR]", err);
    return res
      .status(500)
      .json({ error: err?.message || "Stripe paid session creation failed" });
  }
});

// -------------------- API: Session Details for /success --------------------
// GET /api/session?session_id=...
app.get("/api/session", async (req, res) => {
  const sessionId = req.query.session_id as string;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "line_items"],
    });

    const subscription: any = session.subscription;
    const metadata = session.metadata || {};

    return res.status(200).json({
      zipCount: session.line_items?.data?.[0]?.quantity || 1,
      zipCodes: (metadata.zipCodes || "").split(","),
      flowType: metadata.flowType || null,
      trialEnd: subscription?.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      nextBillingDate: subscription?.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
      amount: session.amount_total
        ? (session.amount_total / 100).toFixed(2)
        : "0.00",
    });
  } catch (err: any) {
    console.error("[SESSION ERROR]", err);
    return res.status(500).json({ error: "Failed to retrieve session details" });
  }
});

// -------------------- Serve Frontend (dist) --------------------
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// SPA fallback (all non-API routes go to index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// -------------------- Start Server (Cloud Run) --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
