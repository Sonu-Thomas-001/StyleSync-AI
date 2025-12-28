import { Occasion, StylePrompt } from './types';

export const PLACEHOLDER_IMAGE = 'https://picsum.photos/400/600';

export const STYLE_PROMPTS: Record<Occasion, StylePrompt> = {
  [Occasion.CASUAL]: {
    occasion: Occasion.CASUAL,
    systemInstruction: "You are a high-end fashion stylist. Create a clean, aesthetic flat-lay image.",
    userPrompt: "Create a photorealistic flat-lay image of a complete CASUAL outfit that includes the clothing item in the provided image. Pair it with relaxed footwear (like sneakers or sandals), minimal accessories, and comfortable complementary pieces (like jeans, shorts, or a soft tee). The background should be neutral and clean. Ensure the uploaded item is the focal point."
  },
  [Occasion.BUSINESS]: {
    occasion: Occasion.BUSINESS,
    systemInstruction: "You are a high-end fashion stylist. Create a clean, aesthetic flat-lay image.",
    userPrompt: "Create a photorealistic flat-lay image of a complete PROFESSIONAL BUSINESS outfit that includes the clothing item in the provided image. Pair it with structured pieces (like a blazer, trousers, or pencil skirt), professional footwear (loafers or heels), and subtle, elegant jewelry. The background should be neutral. Ensure the uploaded item is the focal point."
  },
  [Occasion.NIGHT_OUT]: {
    occasion: Occasion.NIGHT_OUT,
    systemInstruction: "You are a high-end fashion stylist. Create a clean, aesthetic flat-lay image.",
    userPrompt: "Create a photorealistic flat-lay image of a complete NIGHT OUT / EVENING outfit that includes the clothing item in the provided image. Pair it with statement pieces, heels or dress boots, and bold accessories (like a clutch or sparkly jewelry). The lighting can be slightly more dramatic but still a clean flat-lay. Ensure the uploaded item is the focal point."
  }
};

// New Configuration Options for Advanced Styling
export const WEATHER_OPTIONS = [
  'Sunny / Warm',
  'Cold / Winter',
  'Rainy / Overcast',
  'Transitional / Mild',
  'Humid / Tropical'
];

export const CONTEXT_OPTIONS = [
  'General Daily Wear',
  'Job Interview',
  'Wedding Guest',
  'First Date',
  'Office / Corporate',
  'Travel / Vacation',
  'Party / Club',
  'Weekend Brunch'
];

export const REGION_OPTIONS = [
  'Global / Neutral',
  'NYC Minimalist',
  'Parisian Chic',
  'Scandinavian Clean',
  'Tokyo Street Style',
  'Indian Contemporary',
  'London Sharp'
];

export const BODY_TYPE_OPTIONS = [
  'Standard',
  'Petite',
  'Tall',
  'Curvy / Plus',
  'Athletic'
];

export const FIT_OPTIONS = [
  'Standard Fit',
  'Oversized / Relaxed',
  'Tailored / Slim',
  'Structured / Sharp'
];