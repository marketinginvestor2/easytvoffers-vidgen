// services/geminiService.ts
// Frontend-safe service: calls your backend API (DO NOT import @google/genai here)

export interface BusinessCandidate {
  name: string;
  address: string;
  mapsUri: string;
  phoneNumber?: string;
}

export interface AdResult {
  script: string;
  visualHeadline: string;
  audioBase64: string | null;
  imageBase64: string | null;
}

/**
 * If you want to point to a different backend URL, set:
 * VITE_API_BASE_URL="https://your-backend-domain.com"
 * Otherwise it will use same-origin (recommended).
 */
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL?.toString()?.trim() || "";

/**
 * Generic JSON POST helper
 */
const postJson = async <T>(path: string, body: any): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });

  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // If backend accidentally returns non-JSON, surface it clearly
    throw new Error(
      `Backend returned non-JSON response (${res.status}): ${text?.slice(0, 500)}`
    );
  }

  if (!res.ok) {
    const msg =
      data?.error ||
      data?.message ||
      `Request failed (${res.status}): ${JSON.stringify(data)}`;
    throw new Error(msg);
  }

  return data as T;
};

/**
 * Search businesses (backend uses Gemini + Maps tool)
 */
export const searchBusinesses = async (
  query: string,
  city: string
): Promise<BusinessCandidate[]> => {
  if (!query || query.trim().length < 3) return [];

  // Your backend endpoint (you will add this)
  // Expected response: BusinessCandidate[]
  return postJson<BusinessCandidate[]>("/api/search-businesses", {
    query,
    city,
  });
};

/**
 * Generate TV commercial package (backend uses Gemini text + image + TTS)
 */
export const generateTvCommercial = async (
  business: BusinessCandidate,
  offer: string = "",
  city: string = ""
): Promise<AdResult> => {
  if (!business?.name) {
    throw new Error("Business name is required.");
  }

  // Your backend endpoint (you will add this)
  // Expected response: AdResult
  return postJson<AdResult>("/api/generate-tv-commercial", {
    business,
    offer,
    city,
  });
};
