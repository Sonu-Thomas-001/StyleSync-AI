import React, { useState } from 'react';
import { GeneratedOutfit } from '../types';
import { Button } from './Button';

interface OutfitCardProps {
  outfit: GeneratedOutfit;
  onEdit: (id: string, prompt: string) => Promise<void>;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim()) return;

    setIsSubmittingEdit(true);
    await onEdit(outfit.id, editPrompt);
    setIsSubmittingEdit(false);
    setIsEditing(false);
    setEditPrompt('');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = outfit.imageUrl;
    link.download = `stylist-${outfit.occasion.toLowerCase().replace(' ', '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!navigator.share) {
      alert("Sharing is not supported on this browser.");
      return;
    }

    setIsSharing(true);
    try {
      // Convert base64 data URL to a Blob/File for sharing
      const response = await fetch(outfit.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `stylist-${outfit.occasion.toLowerCase()}.png`, { type: 'image/png' });

      await navigator.share({
        title: `My ${outfit.occasion} Look`,
        text: `Check out this ${outfit.occasion} outfit curated by AI Stylist!`,
        files: [file],
      });
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up">
      {/* Image Container */}
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
            <img 
              src={outfit.imageUrl} 
              alt={`${outfit.occasion} Outfit`} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-500" />
            
            {/* Quick Actions (Hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
               <button 
                onClick={handleShare}
                disabled={isSharing}
                className="p-2.5 bg-white/90 backdrop-blur rounded-full text-stone-900 hover:bg-white shadow-lg transition-colors disabled:opacity-50"
                title="Share"
              >
                {isSharing ? (
                   <div className="w-4 h-4 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                )}
              </button>
               <button 
                onClick={handleDownload}
                className="p-2.5 bg-white/90 backdrop-blur rounded-full text-stone-900 hover:bg-white shadow-lg transition-colors"
                title="Download"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
      </div>

      {/* Details */}
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