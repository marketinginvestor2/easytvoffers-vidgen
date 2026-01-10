import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

// GET /api/session?session_id=...
router.get("/session", async (req, res) => {
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
      flowType: metadata.flowType,
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
  } catch (err) {
    console.error("SESSION ERROR:", err);
    return res.status(500).json({ error: "Failed to retrieve session" });
  }
});

export default router;
