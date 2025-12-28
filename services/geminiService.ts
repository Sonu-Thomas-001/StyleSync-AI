import { GoogleGenAI, Type } from "@google/genai";
import { ClothingAnalysis, ClosetItem, WardrobeAudit } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const IMAGE_MODEL_NAME = 'gemini-2.5-flash-image';
const ANALYSIS_MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Generates an outfit image based on an input image and a text prompt.
 */
export const generateOutfitImage = async (
  base64InputImage: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64InputImage,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Extract the generated image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Error generating outfit:", error);
    throw error;
  }
};

/**
 * Edits an existing generated outfit based on a text prompt.
 */
export const editOutfitImage = async (
  base64InputImage: string,
  editInstruction: string
): Promise<string> => {
  try {
    // Remove data URL prefix if present for the API call
    const cleanBase64 = base64InputImage.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64,
            },
          },
          {
            text: `Edit this image: ${editInstruction}. Maintain the flat-lay style and high quality.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No edited image generated.");
  } catch (error) {
    console.error("Error editing outfit:", error);
    throw error;
  }
};

/**
 * Removes the background from an image using the AI model.
 */
export const removeBackground = async (
  base64InputImage: string
): Promise<string> => {
  try {
    // Remove data URL prefix if present
    const cleanBase64 = base64InputImage.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64,
            },
          },
          {
            text: "Identify the main clothing item in this image and crop it to a solid white background. Do not alter the item's appearance, just remove the background.",
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No processed image generated.");
  } catch (error) {
    console.error("Error removing background:", error);
    throw error;
  }
};

/**
 * Analyzes a clothing item to extract attributes like fabric, pattern, formality, and seasonality.
 */
export const analyzeClothingItem = async (
  base64InputImage: string
): Promise<ClothingAnalysis> => {
  try {
    const cleanBase64 = base64InputImage.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: "Analyze this clothing item. Identify the fabric type, pattern complexity, formality level, seasonality, and dominant colors.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fabric: { type: Type.STRING, description: "The primary fabric or material (e.g., Silk, Denim, Wool, Cotton)." },
            pattern: { type: Type.STRING, description: "The pattern type or 'Solid' (e.g., Floral, Striped, Solid, Plaid)." },
            formality: { type: Type.STRING, description: "The formality level (e.g., Casual, Smart Casual, Business, Formal)." },
            seasonality: { type: Type.STRING, description: "The best season or 'All Season' (e.g., Summer, Winter, Transition)." },
            colors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 dominant colors." },
          },
          required: ["fabric", "pattern", "formality", "seasonality", "colors"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No analysis result returned.");
    
    return JSON.parse(text) as ClothingAnalysis;
  } catch (error) {
    console.error("Error analyzing item:", error);
    throw error;
  }
};

/**
 * Performs a Gap Analysis and Audit on the wardrobe.
 */
export const performWardrobeAudit = async (
  items: ClosetItem[]
): Promise<WardrobeAudit> => {
  try {
    // Construct a text representation of the closet
    const closetDescription = items.map(item => `${item.title} (${item.category})`).join(', ');

    const prompt = `
      Act as a strict, high-end fashion strategist. 
      Analyze this wardrobe inventory: [${closetDescription}].
      
      1. Identify 3 critical "Gap Items" that are missing but would maximize outfit combinations.
      2. Identify any "Saturation" where the user has too many similar items.
      3. Give a "Capsule Score" (0-100) based on versatility and cohesion.
      4. Provide a brief 1-sentence strategic note.
    `;

    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            missingPieces: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 specific items to buy." },
            saturationWarnings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Categories with too many items." },
            capsuleScore: { type: Type.NUMBER, description: "0 to 100 score." },
            stylistNote: { type: Type.STRING, description: "Strategic advice." },
          },
          required: ["missingPieces", "saturationWarnings", "capsuleScore", "stylistNote"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No audit result returned.");

    return JSON.parse(text) as WardrobeAudit;
  } catch (error) {
    console.error("Error auditing wardrobe:", error);
    // Fallback if AI fails
    return {
      missingPieces: ["Classic White Shirt", "Neutral Blazer", "Dark Denim"],
      saturationWarnings: [],
      capsuleScore: 50,
      stylistNote: "AI Audit unavailable. Consider adding basics.",
    };
  }
};

/**
 * Generates an educational explanation for why an outfit works.
 */
export const explainOutfitChoice = async (
  occasion: string,
  outfitDescription: string
): Promise<string> => {
  try {
    const prompt = `
      Act as a fashion professor. Explain WHY this outfit works for a "${occasion}" setting.
      Outfit Description: "${outfitDescription}".
      
      Focus on:
      1. Color Theory (contrast, harmony)
      2. Silhouette balance
      3. Appropriateness for the occasion.
      
      Keep it brief (max 3 sentences), educational, and encouraging.
    `;

    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL_NAME,
      contents: prompt,
    });

    return response.text || "This outfit balances structure and comfort, creating a look that is both professional and approachable.";
  } catch (error) {
    console.error("Error explaining outfit:", error);
    return "This combination uses complementary textures and colors to create a balanced, stylish silhouette.";
  }
};