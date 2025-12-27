import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

/**
 * Generates an outfit image based on an input image and a text prompt.
 */
export const generateOutfitImage = async (
  base64InputImage: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
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
      model: MODEL_NAME,
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
      model: MODEL_NAME,
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