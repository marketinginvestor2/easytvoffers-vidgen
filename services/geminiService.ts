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
  isScreenshot?: boolean;
}

// Helper: Fetch Website Screenshot using Google PageSpeed Insights API (Free/Robust)
const fetchWebsiteScreenshot = async (url: string): Promise<string | null> => {
  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    // Add a simple timeout to prevent hanging indefinitely
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=desktop&category=PERFORMANCE`;
    
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
        console.warn(`PageSpeed API returned ${response.status}: ${response.statusText}`);
        return null; 
    }

    const data = await response.json();
    
    // Extract base64 screenshot
    const base64Data = data?.lighthouseResult?.audits?.['final-screenshot']?.details?.data;
    
    if (base64Data && typeof base64Data === 'string') {
        // Remove the data URI prefix to match Gemini's raw base64 output style
        return base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch website screenshot (falling back to AI generation):", error);
    return null;
  }
};

// Helper: Generate AI Image
const generateAiImage = async (prompt: string): Promise<string | null> => {
  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    
    if (imageResponse.candidates?.[0]?.content?.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          return part.inlineData.data;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("AI Image Generation failed (continuing without image)", e);
    // Return null so the UI can just show a placeholder/gradient instead of crashing
    return null;
  }
};

export const generateTvCommercial = async (
  businessName: string, 
  businessType: string, 
  offer: string,
  extraInfo: string,
  websiteUrl?: string // Optional URL for visual background
): Promise<AdResult> => {
  if (!apiKey || apiKey === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    throw new Error("Missing API Key. Please configure your .env file.");
  }

  try {
    // Step 1: Script & Headline (Text)
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

    // Step 2: Visuals (Screenshot OR AI Image)
    // If a website URL is provided, try to screenshot it. If that fails (or no URL), generate AI image.
    let imagePromise: Promise<{ data: string | null; isScreenshot: boolean }>;

    if (websiteUrl && (websiteUrl.includes('.') || websiteUrl.startsWith('http'))) {
      imagePromise = fetchWebsiteScreenshot(websiteUrl).then(data => {
        if (data) return { data, isScreenshot: true };
        // Fallback to AI if screenshot is null
        return generateAiImage(`Cinematic shot of a ${businessType} environment, high quality, 4k, professional lighting, motion blur background style, commercial photography.`).then(aiData => ({ data: aiData, isScreenshot: false }));
      });
    } else {
      imagePromise = generateAiImage(`Cinematic shot of a ${businessType} environment, high quality, 4k, professional lighting, motion blur background style, commercial photography.`).then(aiData => ({ data: aiData, isScreenshot: false }));
    }

    // Execute in parallel
    const [textResponse, imageResult] = await Promise.all([textPromise, imagePromise]);

    // Parse JSON Script
    let content = { script: "Come visit us!", visualHeadline: offer };
    try {
      if (textResponse.text) {
        content = JSON.parse(textResponse.text);
      }
    } catch (e) {
      console.error("Failed to parse JSON response", e);
    }

    // Step 3: Audio (TTS)
    // If previous steps succeeded, this likely will too.
    const audioResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: content.script }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
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
      imageBase64: imageResult.data,
      isScreenshot: imageResult.isScreenshot
    };

  } catch (error: any) {
    console.error("Error generating commercial:", error);
    // Propagate the real error message to the UI
    throw new Error(error.message || "Unknown API Error");
  }
};

export const refineTvCommercial = async (
  businessName: string,
  businessType: string,
  currentScript: string,
  refinementInstruction: string
): Promise<AdResult> => {
   if (!apiKey) throw new Error("Missing API Key");

   try {
    // Step 1: Refine Script based on feedback
    const prompt = `
      Act as a world-class direct response TV copywriter. 
      You are editing an existing script based on client feedback.
      
      Context:
      - Business: ${businessName} (${businessType})
      - Previous Script: "${currentScript}"
      
      CLIENT FEEDBACK / REFINEMENT INSTRUCTION: 
      "${refinementInstruction}"

      Task:
      1. Create a "visualHeadline": A short, punchy 3-6 word headline for the screen.
      2. Create a "script": Rewrite the script to incorporate the client feedback.
         - Tone: Deep, authoritative, trustworthy (Voice: Charon).
         - Constraints: Spoken words ONLY. 
         - Ending: MUST end with "Scan the QR code on your screen right now."
         - Length: Keep it to approx 45 seconds (100-110 words).
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

    // Step 2: Regenerate Image
    const imagePromise = generateAiImage(`Cinematic shot of a ${businessType} environment related to: ${refinementInstruction}. High quality, 4k, professional lighting, motion blur background style.`);

    const [textResponse, imageBase64] = await Promise.all([textPromise, imagePromise]);

    let content = { script: currentScript, visualHeadline: "" };
    try {
      if (textResponse.text) {
        content = JSON.parse(textResponse.text);
      }
    } catch (e) {
      console.error("Failed to parse JSON", e);
    }

    // Step 3: Generate Voiceover
    const audioResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: content.script }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
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
      imageBase64: imageBase64,
      isScreenshot: false 
    };

   } catch (error: any) {
     console.error("Refinement failed:", error);
     throw new Error(error.message || "Refinement Error");
   }
}