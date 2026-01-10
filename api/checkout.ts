import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const PRICE_ID =
  process.env.STRIPE_PRICE_ID || "price_1SnxspAmtP0cuRDmt8bjUAvV";

const BASE_URL =
  process.env.APP_BASE_URL || "https://easytvoffers.com";

// POST /api/checkout/trial
router.post("/trial", async (req, res) => {
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
    console.error("TRIAL ERROR:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to create trial session" });
  }
});

// POST /api/checkout/multizip
router.post("/multizip", async (req, res) => {
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
        .json({ error: "Multi-zip requires at least 2 zip codes" });
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
    console.error("PAID ERROR:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to create paid session" });
  }
});

export default router;
