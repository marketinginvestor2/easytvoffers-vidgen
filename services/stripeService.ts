/**
 * Stripe Service Layer
 * Handles communication with the backend for Checkout Sessions
 */

interface TrialInput {
  businessName: string;
  businessType: string;
  city: string;
  primaryZip: string;
  qrDestination: string;
}

interface MultiZipInput {
  businessName: string;
  businessType: string;
  city: string;
  zipCodes: string[];
  zipCount: number;
  qrDestination: string;
}

export interface SessionDetails {
  zipCount: number;
  zipCodes: string[];
  flowType: 'trial_1zip' | 'paid_multizip';
  trialEnd?: string;
  nextBillingDate?: string;
  amount?: number;
}

/**
 * Creates a Stripe Checkout Session for the 30-day Trial
 * ENFORCED RULES: quantity=1, trial_period_days=30, mode=subscription
 */
export const createTrialSession = async (data: TrialInput): Promise<void> => {
  try {
    const response = await fetch('/api/checkout/trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        flowType: "trial_1zip"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server returned ${response.status}`);
    }

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url;
    } else {
      throw new Error('No checkout URL returned from server.');
    }
  } catch (error: any) {
    console.error('Stripe Trial Error:', error);
    alert(`Checkout Error: ${error.message || 'Failed to connect to Stripe.'}`);
  }
};

/**
 * Creates a Stripe Checkout Session for immediate Multi-Zip payment
 * ENFORCED RULES: quantity=zipCount, no trial, mode=subscription
 */
export const createPaidSession = async (data: MultiZipInput): Promise<void> => {
  try {
    const response = await fetch('/api/checkout/multizip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        flowType: "paid_multizip"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server returned ${response.status}`);
    }

    const session = await response.json();
    if (session.url) {
      window.location.href = session.url;
    } else {
      throw new Error('No checkout URL returned from server.');
    }
  } catch (error: any) {
    console.error('Stripe Multi-Zip Error:', error);
    alert(`Checkout Error: ${error.message || 'Failed to connect to Stripe.'}`);
  }
};

/**
 * Fetches session details from the backend for the success page
 */
export const fetchSessionDetails = async (sessionId: string): Promise<SessionDetails> => {
  const response = await fetch(`/api/session?session_id=${sessionId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch session details');
  }
  return response.json();
};
