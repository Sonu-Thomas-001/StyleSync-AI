import React from 'react';

export const Collection: React.FC = () => {
  // Mock data for the collection
  const mockItems = [
    { id: 1, title: 'Summer Linen Ensemble', date: 'Oct 12, 2023', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', occasion: 'Casual' },
    { id: 2, title: 'Corporate Minimalist', date: 'Nov 04, 2023', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80', occasion: 'Business' },
    { id: 3, title: 'Evening Gala', date: 'Dec 15, 2023', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80', occasion: 'Night Out' },
    { id: 4, title: 'Weekend Brunch', date: 'Jan 20, 2024', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', occasion: 'Casual' },
    { id: 5, title: 'Gallery Opening', date: 'Feb 14, 2024', image: 'https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=800&q=80', occasion: 'Night Out' },
    { id: 6, title: 'Client Meeting', date: 'Mar 01, 2024', image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800&q=80', occasion: 'Business' },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      <div className="flex flex-col mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Digital Wardrobe</span>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Archived Looks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 mb-4">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                {item.occasion}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-lg text-stone-900 group-hover:underline decoration-stone-300 underline-offset-4">{item.title}</h3>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};