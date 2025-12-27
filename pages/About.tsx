import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen flex flex-col items-center">
      
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-24 mt-12">
        <h2 className="font-serif text-5xl md:text-7xl text-stone-900 mb-8 leading-tight">
          Redefining personal style with <span className="italic text-stone-800 decoration-accent decoration-2 underline underline-offset-4">Artificial Intelligence.</span>
        </h2>
        <div className="h-0.5 w-20 bg-accent mx-auto mb-8"></div>
        <p className="text-xl text-stone-500 font-light leading-relaxed">
          StyleSync AI merges cutting-edge generative models with high-fashion aesthetics to solve the daily dilemma: "What do I wear with this?"
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mb-24">
        <div className="bg-white border border-stone-100 shadow-sm p-12 rounded-2xl">
          <h3 className="font-serif text-2xl text-stone-900 mb-4">The Problem</h3>
          <p className="text-stone-600 leading-relaxed font-light">
            We all have those unique pieces in our wardrobe—a patterned skirt, a bold blazer, a vintage scarf—that we love but struggle to style. They sit unworn because visualizing a complete outfit is a creative challenge.
          </p>
        </div>
        <div className="bg-stone-900 text-stone-100 p-12 rounded-2xl relative overflow-hidden">
          {/* Subtle Sage Gradient blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-sage/20 rounded-full blur-3xl"></div>
          
          <h3 className="font-serif text-2xl text-white mb-4 relative z-10">The Solution</h3>
          <p className="text-stone-300 leading-relaxed font-light relative z-10">
            Using Google's advanced Gemini 2.5 multimodal models, we analyze the fabric, color palette, and cut of your item. We then generate photorealistic flat-lays demonstrating exactly how to pair it for any occasion.
          </p>
        </div>
      </div>

      {/* Tech Specs */}
      <div className="w-full max-w-4xl border-t border-stone-200 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-accent-dark mb-2 text-sm">Model</h4>
            <p className="text-stone-500 font-serif italic text-lg">Gemini 2.5 Flash</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-accent-dark mb-2 text-sm">Latency</h4>
            <p className="text-stone-500 font-serif italic text-lg">Real-time Generation</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-accent-dark mb-2 text-sm">Design</h4>
            <p className="text-stone-500 font-serif italic text-lg">React + Tailwind</p>
          </div>
        </div>
      </div>

    </div>
  );
};