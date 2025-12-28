import React, { useState } from 'react';
import { GeneratedOutfit, ShopItem } from '../types';
import { Button } from './Button';
import { explainOutfitChoice } from '../services/geminiService';

interface OutfitCardProps {
  outfit: GeneratedOutfit;
  onEdit: (id: string, prompt: string) => Promise<void>;
  isRetail?: boolean; // New prop for Kiosk Mode
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onEdit, isRetail = false }) => {
  const [activeTab, setActiveTab] = useState<'look' | 'explain' | 'shop'>('look');
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isShareMode, setIsShareMode] = useState(false);

  // Mock Shop Items (In a real app, these would come from the API based on the image analysis)
  const mockShopItems: ShopItem[] = [
    { id: '1', name: 'Premium Cotton Tee', brand: 'Everlane', price: '$35', url: '#', aisle: 'Aisle 4', stockStatus: 'In Stock' },
    { id: '2', name: 'Structured Blazer', brand: 'Theory', price: '$295', url: '#', aisle: 'Aisle 2', stockStatus: 'Low Stock' },
    { id: '3', name: 'Leather Loafers', brand: 'Gucci', price: '$950', url: '#', aisle: 'Shoe Salon', stockStatus: 'In Stock' },
  ];

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim()) return;

    setIsSubmittingEdit(true);
    await onEdit(outfit.id, editPrompt);
    setIsSubmittingEdit(false);
    setIsEditing(false);
    setEditPrompt('');
  };

  const handleExplain = async () => {
    setActiveTab('explain');
    if (!explanation) {
      setIsLoadingExplanation(true);
      const text = await explainOutfitChoice(outfit.occasion, outfit.description);
      setExplanation(text);
      setIsLoadingExplanation(false);
    }
  };

  const handleShare = () => {
    // In a real app, this would use html2canvas or native share with a generated blob
    setIsShareMode(!isShareMode);
  };

  return (
    <div className={`group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up ${isShareMode ? 'ring-4 ring-accent' : ''}`}>
      
      {/* Social Share Overlay Mode */}
      {isShareMode && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-stone-900 text-white p-3 text-center text-xs uppercase tracking-widest font-bold flex justify-between items-center">
          <span>Ready to Share</span>
          <button onClick={() => setIsShareMode(false)} className="hover:text-accent">Close</button>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex border-b border-stone-100">
        <button 
          onClick={() => setActiveTab('look')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'look' ? 'text-stone-900 bg-stone-50' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Look
        </button>
        <button 
          onClick={handleExplain}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'explain' ? 'text-stone-900 bg-stone-50' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Explain
        </button>
        <button 
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'shop' ? 'text-stone-900 bg-stone-50' : 'text-stone-400 hover:text-stone-600'}`}
        >
          {isRetail ? 'Find in Store' : 'Shop'}
        </button>
      </div>

      {/* Image / Content Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {outfit.loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50">
            <div className="w-16 h-16 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin mb-4"></div>
            <p className="text-xs uppercase tracking-widest text-stone-500 animate-pulse">Designing...</p>
          </div>
        ) : outfit.error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-stone-50">
             <span className="text-3xl mb-3 text-stone-300">⚠</span>
             <p className="text-sm text-stone-500 font-medium">{outfit.error}</p>
          </div>
        ) : (
          <>
            {/* View: Look */}
            {activeTab === 'look' && (
              <>
                <img 
                  src={outfit.imageUrl} 
                  alt={`${outfit.occasion} Outfit`} 
                  className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isShareMode ? 'scale-100' : 'group-hover:scale-105'}`}
                />
                
                {/* Logo Overlay for Share Mode */}
                {isShareMode && (
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="inline-block bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900">
                      StyleSync AI • {outfit.occasion}
                    </span>
                  </div>
                )}

                {/* Quick Actions (Hidden in Share Mode) */}
                {!isShareMode && (
                  <>
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-500 pointer-events-none" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button 
                        onClick={handleShare}
                        className="p-2.5 bg-white/90 backdrop-blur rounded-full text-stone-900 hover:bg-white shadow-lg transition-colors"
                        title="Share Card"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button 
                        variant="glass" 
                        onClick={() => setIsEditing(true)}
                        className="w-full py-2 text-xs uppercase tracking-widest"
                      >
                        Refine Look
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* View: Explain */}
            {activeTab === 'explain' && (
              <div className="absolute inset-0 bg-stone-50 p-6 flex flex-col overflow-y-auto">
                 <h4 className="font-serif text-xl text-stone-900 mb-4">Why this works</h4>
                 {isLoadingExplanation ? (
                   <div className="space-y-3 animate-pulse">
                     <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                     <div className="h-4 bg-stone-200 rounded w-full"></div>
                     <div className="h-4 bg-stone-200 rounded w-5/6"></div>
                   </div>
                 ) : (
                   <p className="text-stone-600 font-light leading-relaxed text-sm">
                     {explanation}
                   </p>
                 )}
                 <div className="mt-6 p-4 bg-white rounded-lg border border-stone-100">
                    <span className="block text-xs font-bold uppercase tracking-widest text-accent-dark mb-1">Stylist Tip</span>
                    <p className="text-xs text-stone-500">
                      Try swapping the footwear to transition this look from {outfit.occasion.toLowerCase()} to something more casual.
                    </p>
                 </div>
              </div>
            )}

            {/* View: Shop / Find in Store */}
            {activeTab === 'shop' && (
              <div className="absolute inset-0 bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-serif text-lg text-stone-900">
                    {isRetail ? 'Nearby in Store' : 'Shop Similar'}
                  </h4>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wide">
                    {isRetail ? 'Inventory: Live' : 'Ad'}
                  </span>
                </div>
                <div className="space-y-3">
                  {mockShopItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg transition-colors group/item border border-transparent hover:border-stone-100">
                       <div className="w-12 h-12 bg-stone-200 rounded-md overflow-hidden">
                          {/* Placeholder for product thumb */}
                          <div className="w-full h-full bg-stone-300"></div>
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                         <p className="text-[10px] text-stone-500">{item.brand}</p>
                         {isRetail && (
                            <p className="text-[10px] font-bold text-accent-dark mt-0.5">{item.aisle}</p>
                         )}
                       </div>
                       <div className="text-right">
                         <span className="block text-xs font-medium text-stone-900">{item.price}</span>
                         {isRetail ? (
                           <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${item.stockStatus === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                             {item.stockStatus}
                           </span>
                         ) : (
                           <a href={item.url} className="text-[10px] text-accent-dark hover:underline">Buy</a>
                         )}
                       </div>
                    </div>
                  ))}
                </div>
                {isRetail && (
                    <div className="mt-6">
                        <Button variant="outline" className="w-full py-2 text-xs">Request Runner</Button>
                    </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Footer */}
      <div className="p-6 flex-1 flex flex-col bg-white">
        <div className="mb-3">
           <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">{outfit.occasion}</span>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="mt-auto animate-fade-in-up">
            <input
              type="text"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="e.g. Add a leather jacket..."
              className="w-full text-sm border-b border-stone-200 py-2 mb-3 focus:border-stone-900 focus:outline-none bg-transparent placeholder-stone-400 font-serif italic"
              autoFocus
            />
            <div className="flex justify-between items-center">
               <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="text-xs text-stone-400 hover:text-stone-600 uppercase tracking-wider"
              >
                Cancel
              </button>
              <Button type="submit" disabled={isSubmittingEdit || !editPrompt.trim()} className="px-4 py-1.5 text-xs h-auto">
                {isSubmittingEdit ? 'Working...' : 'Update'}
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-stone-600 leading-relaxed font-light line-clamp-3 group-hover:text-stone-900 transition-colors">
            {outfit.description}
          </p>
        )}
      </div>
    </div>
  );
};