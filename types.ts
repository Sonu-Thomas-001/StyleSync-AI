export enum Occasion {
  CASUAL = 'Casual',
  BUSINESS = 'Business',
  NIGHT_OUT = 'Night Out'
}

export interface GeneratedOutfit {
  id: string;
  occasion: Occasion;
  imageUrl: string;
  description: string;
  loading: boolean;
  error?: string;
  explanation?: string; // New: AI explanation
}

export interface StylePrompt {
  occasion: Occasion;
  systemInstruction: string;
  userPrompt: string;
}

export interface ClothingAnalysis {
  fabric: string;
  pattern: string;
  formality: string;
  seasonality: string;
  colors: string[];
}

export interface StylePreferences {
  weather: string;
  context: string;
  region: string;
  bodyType: string;
  fit: string;
  isEcoMode: boolean;
}

// Smart Wardrobe Types
export interface ClosetItem {
  id: string;
  title: string;
  category: string;
  image: string;
  wearCount: number;
  cost: number;
  lastWorn?: string;
}

export interface WardrobeAudit {
  missingPieces: string[];
  saturationWarnings: string[];
  capsuleScore: number;
  stylistNote: string;
}

// Commerce & Sharing
export interface ShopItem {
  id: string;
  name: string;
  price: string;
  brand: string;
  url: string;
  image?: string;
  // Retail Mode Extensions
  aisle?: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface CommunityLook {
  id: string;
  imageUrl: string;
  likes: number;
  occasion: string;
  items_used: string[];
}

// Style DNA Profile
export interface StyleDNA {
  riskAppetite: number; // 0-100 (Safe to Bold)
  colorPalette: string[];
  topSilhouettes: string[];
  styleArchetype: string; // e.g., "Modern Minimalist"
}

// Brand / Enterprise Types
export interface BrandAnalytic {
  item: string;
  topPairing: string;
  usageCount: number;
  trend: 'up' | 'down' | 'stable';
}

export type LoadingState = 'idle' | 'analyzing' | 'generating' | 'editing';