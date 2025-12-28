import React, { useState } from 'react';
import { Button } from '../components/Button';
import { performWardrobeAudit } from '../services/geminiService';
import { ClosetItem, WardrobeAudit } from '../types';

export const Collection: React.FC = () => {
  // Mock Data mimicking a user's closet
  const [items, setItems] = useState<ClosetItem[]>([
    { id: '1', title: 'Summer Linen Ensemble', category: 'Two-Piece Set', cost: 120, wearCount: 4, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80' },
    { id: '2', title: 'Corporate Minimalist', category: 'Blazer', cost: 250, wearCount: 15, image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80' },
    { id: '3', title: 'Evening Gala Dress', category: 'Dress', cost: 400, wearCount: 1, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80' },
    { id: '4', title: 'Weekend Brunch Top', category: 'Blouse', cost: 85, wearCount: 12, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80' },
    { id: '5', title: 'Gallery Leather Skirt', category: 'Skirt', cost: 180, wearCount: 3, image: 'https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=800&q=80' },
    { id: '6', title: 'Client Meeting Suit', category: 'Suit', cost: 350, wearCount: 8, image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80' },
    { id: '7', title: 'Floral Sundress', category: 'Dress', cost: 60, wearCount: 8, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80' },
  ]);

  const [auditResult, setAuditResult] = useState<WardrobeAudit | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAudit = async () => {
    setIsAuditing(true);
    try {
      const result = await performWardrobeAudit(items);
      setAuditResult(result);
    } catch (error) {
      console.error("Audit failed", error);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Closet Intelligence</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Your Smart Wardrobe</h2>
        </div>
        <div>
          <Button onClick={handleAudit} disabled={isAuditing} isLoading={isAuditing} variant="primary">
            {auditResult ? 'Re-Run Audit' : 'Run Smart Audit'}
          </Button>
        </div>
      </div>

      {/* Audit Results Dashboard */}
      {auditResult && (
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
          {/* Main Score Card */}
          <div className="lg:col-span-4 bg-stone-900 text-stone-50 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">Capsule Score</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-7xl font-serif">{auditResult.capsuleScore}</span>
              <span className="text-2xl font-serif text-stone-500 mb-2">/100</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed border-t border-stone-800 pt-6">
              {auditResult.stylistNote}
            </p>
          </div>

          {/* Gap Analysis */}
          <div className="lg:col-span-4 bg-white border border-stone-200 p-8 rounded-2xl">
             <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2">
               <svg className="w-4 h-4 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
               Missing Essentials
             </h3>
             <ul className="space-y-4">
               {auditResult.missingPieces.map((piece, idx) => (
                 <li key={idx} className="flex items-center gap-3 text-stone-800">
                    <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs font-serif italic text-stone-500">{idx + 1}</span>
                    {piece}
                 </li>
               ))}
             </ul>
             <p className="text-xs text-stone-400 mt-6 pt-4 border-t border-stone-100">
               Adding these will increase outfit combinations by ~30%.
             </p>
          </div>

          {/* Saturation Alerts */}
          <div className="lg:col-span-4 bg-white border border-stone-200 p-8 rounded-2xl">
             <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2">
               <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Saturation Alerts
             </h3>
             {auditResult.saturationWarnings.length > 0 ? (
                <ul className="space-y-4">
                  {auditResult.saturationWarnings.map((warn, idx) => (
                    <li key={idx} className="text-stone-600 text-sm bg-orange-50 p-3 rounded-lg border border-orange-100">
                      {warn}
                    </li>
                  ))}
                </ul>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center pb-8">
                 <span className="text-2xl mb-2">✨</span>
                 <p className="text-sm">No redundancy detected.<br/>Great balance!</p>
               </div>
             )}
          </div>
        </div>
      )}

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden bg-stone-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Cost Per Wear Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm flex flex-col items-end">
                <span className="text-stone-400">CPW</span>
                <span className={`${(item.cost / item.wearCount) > 20 ? 'text-orange-500' : 'text-green-600'}`}>
                  ${(item.cost / item.wearCount).toFixed(0)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-serif text-lg text-stone-900 truncate">{item.title}</h3>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-stone-500">{item.category}</span>
                <span className="text-stone-400">{item.wearCount} Wears</span>
              </div>
            </div>

            {/* Hover Action */}
            <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              {/* This could be a "Style Now" button overlay in future iterations */}
            </div>
          </div>
        ))}
        
        {/* Add Item Placeholder */}
        <div className="aspect-[3/4] border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 hover:text-stone-600 hover:border-stone-400 transition-colors cursor-pointer group">
           <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
             </svg>
           </div>
           <span className="text-xs font-bold uppercase tracking-widest">Add Item</span>
        </div>
      </div>
    </div>
  );
};