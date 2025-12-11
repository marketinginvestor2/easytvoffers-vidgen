import { GoogleGenAI, Type, Modality } from "@google/genai";

// Ensure the API Key is present. 
// In Vite, this is replaced by the string value from .env during build.
const apiKey = process.env.API_KEY;

if (!apiKey || apiKey === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
  console.warn("Gemini API Key is missing. Please add it to your .env file.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

export interface AdResult {
  script: string;
  visualHeadline: string;
  audioBase64: string | null;
  imageBase64: string | null;
}

export const generateTvCommercial = async (
  businessName: string, 
  businessType: string, 
  offer: string,
  extraInfo: string
): Promise<AdResult> => {
  if (!apiKey || apiKey === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    alert("API Key is missing! Please configure your API_KEY in the .env file and rebuild.");
    throw new Error("Missing API Key");
  }

  try {
    // Step 1: Generate Script & Visual Headline (Structured JSON)
    // We ask the AI to rewrite the offer for TV visuals and write the script in one go.
    const prompt = `
      Act as a world-class direct response TV copywriter.
      
      Input Data:
      - Business Name: ${businessName}
      - Business Type: ${businessType}
      - Core Offer: ${offer}
      - Additional Info: ${extraInfo}

      Task:
      1. Create a "visualHeadline": Rewrite the Core Offer into a short, punchy, high-impact headline (3-6 words) suitable for large text on a TV screen. It must be compelling and urgent.
      2. Create a "script": Write a 45-second persuasive TV commercial voiceover script.
         - Tone: Deep, authoritative, trustworthy, and confident. A premium American male narrator voice.
         - Style: Strong, resonant statements. Energetic but grounded and professional. Not "shouty".
         - Constraints: Spoken words ONLY. No scene descriptions.
         - Ending: MUST end with "Scan the QR code on your screen right now."
         - Length: Approximately 100-110 words.
    `;

    const textPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            script: { type: Type.STRING },
            visualHeadline: { type: Type.STRING }
          },
          required: ["script", "visualHeadline"]
        }
      }
    });

    // Step 2: Generate Background Image (Visual) - Run in parallel
    // We create a cinematic image that we will animate later to look like video
    const imagePromise = ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: `Cinematic shot of a ${businessType} environment, high quality, 4k, professional lighting, motion blur background style, commercial photography.`,
    });

    const [textResponse, imageResponse] = await Promise.all([textPromise, imagePromise]);

    // Parse JSON
    let content = { script: "Come visit us!", visualHeadline: offer };
    try {
      if (textResponse.text) {
        content = JSON.parse(textResponse.text);
      }
    } catch (e) {
      console.error("Failed to parse JSON response", e);
    }

    // Extract Image
    let imageBase64: string | null = null;
    if (imageResponse.candidates?.[0]?.content?.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    // Step 3: Generate Voiceover (Audio) based on the generated script
    const audioResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: content.script }] }],
      config: {
        // Fix: Use Modality.AUDIO enum instead of string "AUDIO"
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Charon is the deepest, most resonant male voice, good for authority/trust.
            prebuiltVoiceConfig: { voiceName: 'Charon' }, 
          },
        },
      },
    });

    const audioBase64 = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;

    return {
      script: content.script,
      visualHeadline: content.visualHeadline,
      audioBase64: audioBase64,
      imageBase64: imageBase64
    };

  } catch (error) {
    console.error("Error generating commercial:", error);
    throw new Error("Failed to generate commercial. Please try again.");
  }
};