// services/geminiService.ts
// Frontend-safe client wrapper (NO @google/genai here).
// This file calls your backend endpoints instead of importing Gemini SDK in the browser.

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

type SearchBusinessesResponse = BusinessCandidate[];
type GenerateTvCommercialResponse = AdResult;

/**
 * API base URL behavior:
 * - If VITE_API_BASE is set (ex: https://easytvoffers-vidgen-api-xxxx.run.app) => use it
 * - Else => same-origin (""), which works when frontend+backend are served by the same Cloud Run service
 */
const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE?.toString()?.trim() || "";

const jsonHeaders = {
  "Content-Type": "application/json",
};

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Non-JSON response (${res.status}): ${text}`);
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}

/**
 * Search businesses (backend does the Gemini + Google Maps tool call)
 */
export const searchBusinesses = async (
  query: string,
  city: string
): Promise<BusinessCandidate[]> => {
  if (!query || query.trim().length < 3) return [];

  const res = await fetch(`${API_BASE}/api/search-businesses`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ query, city }),
  });

  return handleResponse<SearchBusinessesResponse>(res);
};

/**
 * Generate the full TV commercial package (backend does Gemini text + image + TTS)
 */
export const generateTvCommercial = async (
  business: BusinessCandidate,
  offer: string = "",
  city: string = ""
): Promise<AdResult> => {
  const res = await fetch(`${API_BASE}/api/generate-tv-commercial`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ business, offer, city }),
  });

  return handleResponse<GenerateTvCommercialResponse>(res);
};
