import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
 * Robust JSON extraction helper
 */
const parseJsonSafe = (text: string) => {
  if (!text) return null;
  let cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const startObj = cleaned.indexOf('{');
    const startArr = cleaned.indexOf('[');
    let start = -1;
    let end = -1;
    if (startObj !== -1 && (startArr === -1 || startObj < startArr)) {
      start = startObj;
      let count = 0;
      for (let i = start; i < cleaned.length; i++) {
        if (cleaned[i] === '{') count++;
        else if (cleaned[i] === '}') count--;
        if (count === 0) { end = i; break; }
      }
    } else if (startArr !== -1) {
      start = startArr;
      let count = 0;
      for (let i = start; i < cleaned.length; i++) {
        if (cleaned[i] === '[') count++;
        else if (cleaned[i] === ']') count--;
        if (count === 0) { end = i; break; }
      }
    }
    if (start !== -1 && end !== -1) {
      const jsonStr = cleaned.substring(start, end + 1);
      try {
        return JSON.parse(jsonStr);
      } catch (innerError) {
        console.error("Failed to parse extracted JSON:", jsonStr);
      }
    }
    return null;
  }
};

/**
 * Search Google Maps for businesses
 */
export const searchBusinesses = async (query: string, city: string): Promise<BusinessCandidate[]> => {
  if (query.length < 3) return [];
  const prompt = `Search Google Maps for "${query}" in "${city}". Provide top 3 results. 
  Extract phone number and maps URI. Return as JSON array: "name", "address", "mapsUri", "phoneNumber".`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { tools: [{ googleMaps: {} }] },
    });
    if (response.text) {
      const data = parseJsonSafe(response.text);
      if (Array.isArray(data)) return data;
      if (data && typeof data === 'object') return [data as BusinessCandidate];
    }
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      return chunks.filter(c => c.maps).map(c => ({
        name: c.maps.title || "Local Business",
        address: "Address found on map",
        mapsUri: c.maps.uri || "",
        phoneNumber: ""
      }));
    }
    return [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

/**
 * Generate AI Visuals
 */
const generateAiVisual = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("Image generation failed", e);
    return null;
  }
};

/**
 * Generate the full TV commercial package
 */
export const generateTvCommercial = async (
  business: BusinessCandidate,
  offer: string = "",
  city: string = ""
): Promise<AdResult> => {
  try {
    const textPrompt = `
      Act as an expert Direct Response TV Copywriter.
      Business: ${business.name}
      City: ${city}
      Offer: ${offer || 'Claim your special neighbor offer today'}
      Phone: ${business.phoneNumber || '1-800-LOCAL-SPOT'}

      TASK:
      1. "visualHeadline": A powerful benefit-driven DR headline. It should be punchy, impactful, and optimized for a left-aligned visual layout. MAX 35 characters.
      2. "script": A high-converting 60-second broadcast script (approx 160 words). Authoritative tone.
      Return strictly as JSON with "script" and "visualHeadline".
    `;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            script: { type: Type.STRING },
            visualHeadline: { type: Type.STRING },
          },
          required: ["script", "visualHeadline"],
        },
      },
    });

    const textContent = parseJsonSafe(textResponse.text) || { 
      script: `Welcome to ${business.name}. Serving ${city} daily. Call now to claim your offer.`, 
      visualHeadline: "EXCEPTIONAL LOCAL SERVICE" 
    };

    const imagePrompt = `Wide-angle cinematic scene for a local business named "${business.name}" in ${city}. High-end commercial production style, sharp focus, professional lighting, photorealistic. The image should be a beautiful environment or storefront representing the quality of ${business.name}. No text in the image. 4k resolution.`;

    const [imageB64, audioResponse] = await Promise.all([
      generateAiVisual(imagePrompt),
      ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textContent.script }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
        },
      }),
    ]);

    return {
      script: textContent.script,
      visualHeadline: (textContent.visualHeadline || "").toUpperCase().trim(),
      audioBase64: audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null,
      imageBase64: imageB64,
    };
  } catch (error: any) {
    console.error("TV Commercial Generation Error:", error);
    throw new Error(error.message || "Generation failed.");
  }
};