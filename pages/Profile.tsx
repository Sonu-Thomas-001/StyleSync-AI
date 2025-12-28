import React from 'react';
import { Button } from '../components/Button';
import { StyleDNA } from '../types';

export const Profile: React.FC = () => {
  // Mock Data for User's "Style DNA"
  const userDNA: StyleDNA = {
    riskAppetite: 65,
    styleArchetype: "Modern Minimalist",
    colorPalette: ["#1a1a1a", "#e5e5e5", "#bfa390", "#5b6e5b"],
    topSilhouettes: ["Oversized Blazers", "Tapered Trousers", "Midi Skirts"]
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-stone-200 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Personal Stylist Layer</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Your Style DNA</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <span className="block text-sm font-bold text-stone-900">Sarah Jenkins</span>
            <span className="block text-xs text-stone-500">Free Tier Member</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
            <img src="https://i.pravatar.cc/150?u=sarah" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Col: DNA Stats */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Archetype Card */}
          <div className="bg-stone-900 text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Primary Archetype</h3>
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-6">
              <span className="font-serif text-4xl md:text-5xl">{userDNA.styleArchetype}</span>
            </div>
            <p className="text-stone-400 font-light max-w-lg leading-relaxed">
              Your choices lean towards clean lines, neutral tones, and functional elegance. You value quality over quantity and prefer structured silhouettes.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Risk Appetite */}
            <div className="bg-white border border-stone-200 p-8 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6">Risk Appetite</h3>
              <div className="relative h-2 bg-stone-100 rounded-full mb-4">
                <div 
                  className="absolute top-0 left-0 h-full bg-stone-900 rounded-full transition-all duration-1000"
                  style={{ width: `${userDNA.riskAppetite}%` }}
                ></div>
                {/* Marker */}
                <div 
                  className="absolute top-1/2 w-4 h-4 bg-white border-2 border-stone-900 rounded-full transform -translate-y-1/2 shadow-sm"
                  style={{ left: `${userDNA.riskAppetite}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-stone-400 font-medium uppercase tracking-wide">
                <span>Safe</span>
                <span>Bold</span>
              </div>
              <p className="mt-4 text-sm text-stone-600">
                You're willing to experiment with textures, but stick to a cohesive color story.
              </p>
            </div>

            {/* Color Palette */}
            <div className="bg-white border border-stone-200 p-8 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6">Comfort Palette</h3>
              <div className="flex gap-4">
                {userDNA.colorPalette.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <div 
                      className="w-12 h-12 rounded-full shadow-inner border border-stone-100 transition-transform group-hover:scale-110" 
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-stone-600">
                You favor cool neutrals with occasional earth tone accents.
              </p>
            </div>
          </div>

          {/* Top Silhouettes */}
          <div className="bg-white border border-stone-200 p-8 rounded-2xl">
             <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6">Signature Silhouettes</h3>
             <div className="flex flex-wrap gap-3">
               {userDNA.topSilhouettes.map((item, idx) => (
                 <span key={idx} className="px-4 py-2 bg-stone-50 text-stone-900 rounded-lg text-sm font-medium border border-stone-100">
                   {item}
                 </span>
               ))}
             </div>
          </div>
        </div>

        {/* Right Col: Pro Upsell */}
        <div className="lg:col-span-4">
          <div className="bg-gradient-to-br from-[#d6bba8] to-[#bfa390] text-stone-900 p-8 rounded-2xl sticky top-24 shadow-xl shadow-accent/20">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-2xl font-bold">StyleSync Pro</h3>
              <span className="bg-white/20 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Premium</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm font-medium">Unlimited Outfit Generation</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm font-medium">Advanced Closet Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm font-medium">Seasonal Trend Reports</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm font-medium">Personal Stylist Chat</span>
              </li>
            </ul>

            <Button variant="primary" className="w-full bg-stone-900 text-white hover:bg-black border-none">
              Upgrade - $9.99/mo
            </Button>
            <p className="text-xs text-center mt-4 opacity-70">Cancel anytime. 7-day free trial.</p>
          </div>
        </div>

      </div>
    </div>
  );
};