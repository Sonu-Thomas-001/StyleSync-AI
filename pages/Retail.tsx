import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { OutfitCard } from '../components/OutfitCard';
import { Button } from '../components/Button';
import { GeneratedOutfit, Occasion } from '../types';
import { STYLE_PROMPTS } from '../constants';
import { generateOutfitImage, editOutfitImage } from '../services/geminiService';

export const Retail: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [outfits, setOutfits] = useState<GeneratedOutfit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Brand Configuration for this Kiosk
  const storeName = "NORDSTROM";
  
  const handleImageSelected = async (base64: string) => {
    setSelectedImage(base64);
    setOutfits([]); 
    // Auto-trigger generation for Kiosk Mode (Less clicks)
    generateOutfits(base64);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setOutfits([]);
    setIsGenerating(false);
  };

  const generateOutfits = async (image: string) => {
    setIsGenerating(true);
    
    // Kiosk generates 3 variations optimized for store inventory
    const newOutfits: GeneratedOutfit[] = [
      { id: '1', occasion: Occasion.CASUAL, imageUrl: '', description: 'Weekend ready. Available in Aisle 3.', loading: true },
      { id: '2', occasion: Occasion.BUSINESS, imageUrl: '', description: 'Office chic. Available in Suiting.', loading: true },
      { id: '3', occasion: Occasion.NIGHT_OUT, imageUrl: '', description: 'Evening elegance. Accessories on Floor 1.', loading: true },
    ];
    setOutfits(newOutfits);

    const promises = newOutfits.map(async (outfit) => {
      const promptData = STYLE_PROMPTS[outfit.occasion];
      // Inject Store Context into prompt
      const enhancedPrompt = `${promptData.userPrompt} IMPORTANT: Style this item using clothing available at ${storeName}. Prioritize current season trends.`;

      try {
        const imageUrl = await generateOutfitImage(image, enhancedPrompt);
        setOutfits(current => current.map(o => 
          o.id === outfit.id 
            ? { ...o, imageUrl, loading: false }
            : o
        ));
      } catch (error) {
        setOutfits(current => current.map(o => 
          o.id === outfit.id 
            ? { ...o, loading: false, error: 'Could not generate style.' }
            : o
        ));
      }
    });

    await Promise.all(promises);
    setIsGenerating(false);
  };

  const handleEditOutfit = async (id: string, prompt: string) => {
    setOutfits(current => current.map(o => 
      o.id === id ? { ...o, loading: true } : o
    ));

    const outfitToEdit = outfits.find(o => o.id === id);
    if (!outfitToEdit) return;

    try {
      const newImageUrl = await editOutfitImage(outfitToEdit.imageUrl, prompt);
      setOutfits(current => current.map(o => 
        o.id === id 
          ? { ...o, imageUrl: newImageUrl, loading: false, description: `Stylist Note: ${prompt}` }
          : o
      ));
    } catch (error) {
      setOutfits(current => current.map(o => 
        o.id === id 
          ? { ...o, loading: false, error: 'Edit failed.' }
          : o
      ));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Kiosk Header */}
      <div className="bg-stone-900 text-white p-6 flex justify-between items-center">
        <h1 className="text-3xl font-serif tracking-tight">{storeName} <span className="text-stone-400 italic text-xl">Stylist Kiosk</span></h1>
        <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-stone-400">System Online</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        
        {!selectedImage ? (
          <div className="text-center animate-fade-in-up">
             <h2 className="text-6xl font-serif text-stone-900 mb-8">Scan Item to Style</h2>
             <p className="text-xl text-stone-500 mb-12 max-w-lg mx-auto">
               Place any garment under the scanner to instantly see how to wear it.
             </p>
             <div className="scale-125 origin-top">
               <ImageUploader 
                 onImageSelected={handleImageSelected} 
                 selectedImage={null} 
                 onClear={() => {}} 
               />
             </div>
          </div>
        ) : (
          <div className="w-full max-w-screen-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif text-stone-900">Styling Suggestions</h2>
              <Button onClick={handleClear} variant="outline" className="text-lg px-8 py-4">New Scan</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
               {/* Show source image for reference */}
               <div className="md:hidden lg:block bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex flex-col items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-stone-400 mb-4">Scanned Item</span>
                  <img src={`data:image/jpeg;base64,${selectedImage}`} className="max-h-[300px] object-contain" alt="Scanned" />
               </div>

               {outfits.map((outfit) => (
                  <div key={outfit.id} className="h-full">
                    <OutfitCard 
                      outfit={outfit} 
                      onEdit={handleEditOutfit}
                      isRetail={true} // Enable Retail Mode
                    />
                  </div>
               ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Kiosk Footer */}
      <div className="bg-stone-100 p-4 text-center text-stone-400 text-sm uppercase tracking-widest">
         Tap screen for assistance • Store #0424 • Seattle Flagship
      </div>
    </div>
  );
};