import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { OutfitCard } from '../components/OutfitCard';
import { Button } from '../components/Button';
import { GeneratedOutfit, Occasion } from '../types';
import { STYLE_PROMPTS } from '../constants';
import { generateOutfitImage, editOutfitImage } from '../services/geminiService';

export const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [outfits, setOutfits] = useState<GeneratedOutfit[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageSelected = (base64: string) => {
    setSelectedImage(base64);
    setOutfits([]); 
  };

  const handleClear = () => {
    setSelectedImage(null);
    setOutfits([]);
    setIsGenerating(false);
  };

  const generateOutfits = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    
    // Initialize placeholders
    const newOutfits: GeneratedOutfit[] = [
      { id: '1', occasion: Occasion.CASUAL, imageUrl: '', description: 'A relaxed ensemble perfect for coffee runs or casual fridays.', loading: true },
      { id: '2', occasion: Occasion.BUSINESS, imageUrl: '', description: 'Polished and commanding. Ready for the boardroom.', loading: true },
      { id: '3', occasion: Occasion.NIGHT_OUT, imageUrl: '', description: 'Sophisticated glamour for evening events.', loading: true },
    ];
    setOutfits(newOutfits);

    // Create promises for parallel generation
    const promises = newOutfits.map(async (outfit) => {
      const promptData = STYLE_PROMPTS[outfit.occasion];
      try {
        const imageUrl = await generateOutfitImage(selectedImage, promptData.userPrompt);
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
    <div className="animate-fade-in-up">
      {/* Dynamic Split Layout / Hero */}
      <div className={`transition-all duration-1000 ease-in-out ${outfits.length > 0 ? 'min-h-[40vh]' : 'min-h-[calc(100vh-80px)]'} flex flex-col justify-center`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className={`md:col-span-7 lg:col-span-6 flex flex-col justify-center transition-all duration-700 ${outfits.length > 0 ? 'text-left' : 'text-center md:text-left'}`}>
              {!outfits.length && (
                <div className="animate-fade-in-up">
                  <span className="inline-block py-1.5 px-4 border border-accent/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-6 bg-accent-light/20 backdrop-blur-sm">
                    Personal Styling Assistant
                  </span>
                  <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-stone-900 mb-8">
                    Defining <br/>
                    <span className="italic font-light text-stone-800 decoration-accent/50 underline-offset-4 decoration-2">Your Look.</span>
                  </h2>
                  <p className="text-lg md:text-xl text-stone-500 font-light max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
                    Upload that one challenging piece. We'll curate complete outfits for work, weekend, and evening.
                  </p>
                </div>
              )}
              {outfits.length > 0 && (
                <div className="animate-fade-in-up">
                  <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">The Collection</h2>
                  <p className="text-stone-500 max-w-md">Curated looks designed around your item. Refine any look with AI.</p>
                </div>
              )}
          </div>

          {/* Right Content / Uploader */}
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-8 w-full">
            <div className={`transition-all duration-700 ${outfits.length > 0 ? 'scale-90 opacity-90 origin-right' : 'scale-100'}`}>
              <ImageUploader 
                onImageSelected={handleImageSelected} 
                selectedImage={selectedImage}
                onClear={handleClear}
              />
              
              {selectedImage && !isGenerating && outfits.length === 0 && (
                <div className="mt-8 flex justify-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <Button 
                    onClick={generateOutfits} 
                    className="w-full text-base py-4"
                  >
                    Curate My Outfits
                  </Button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Results Section */}
      {outfits.length > 0 && (
        <section className="bg-white border-t border-stone-100 py-20 animate-fade-in-up">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">03 Looks Generated</span>
              <Button variant="ghost" onClick={handleClear} disabled={isGenerating} className="text-xs hover:text-accent-dark">
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {outfits.map((outfit, idx) => (
                <div key={outfit.id} style={{ animationDelay: `${idx * 150}ms` }} className="animate-fade-in-up">
                  <OutfitCard 
                    outfit={outfit} 
                    onEdit={handleEditOutfit}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};