import React from 'react';
import { Button } from '../components/Button';
import { CommunityLook } from '../types';

export const Inspiration: React.FC = () => {
  // Mock Community Data
  const looks: CommunityLook[] = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', likes: 124, occasion: 'Weekend Brunch', items_used: ['Silk Blouse', 'Denim'] },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', likes: 89, occasion: 'Summer Wedding', items_used: ['Linen Suit'] },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80', likes: 245, occasion: 'Date Night', items_used: ['Black Dress'] },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=600&q=80', likes: 56, occasion: 'Art Gallery', items_used: ['Leather Skirt'] },
    { id: '5', imageUrl: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', likes: 112, occasion: 'Board Meeting', items_used: ['Structured Blazer'] },
    { id: '6', imageUrl: 'https://images.unsplash.com/photo-1485230946086-1d99d529c7ad?w=600&q=80', likes: 178, occasion: 'Airport Style', items_used: ['Trench Coat'] },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Community</span>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Inspiration Feed</h2>
        <p className="text-stone-500 leading-relaxed">
          Discover how the StyleSync community is styling their pieces. <br/>
          <span className="italic text-stone-400 text-sm">All submissions are anonymous to encourage pure creativity.</span>
        </p>
      </div>

      {/* Masonry-ish Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {looks.map((look) => (
          <div key={look.id} className="break-inside-avoid group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <img src={look.imageUrl} alt={look.occasion} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Button variant="glass" className="w-full text-xs py-2">Try this Look</Button>
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg text-stone-900">{look.occasion}</h4>
                <p className="text-xs text-stone-500 mt-1">{look.items_used.join(', ')}</p>
              </div>
              <div className="flex items-center gap-1 text-stone-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-xs font-bold">{look.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Button variant="outline">Load More Inspiration</Button>
      </div>

    </div>
  );
};