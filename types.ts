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
}

export interface StylePrompt {
  occasion: Occasion;
  systemInstruction: string;
  userPrompt: string;
}

export type LoadingState = 'idle' | 'analyzing' | 'generating' | 'editing';
