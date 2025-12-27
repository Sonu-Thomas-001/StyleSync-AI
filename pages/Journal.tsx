import React from 'react';

export const Journal: React.FC = () => {
  const articles = [
    {
      id: 1,
      category: 'Trend Report',
      title: 'The Return of Maximalist Accessories',
      excerpt: 'Why less isn\'t always more in the coming season. We explore the resurgence of bold statement pieces.',
      date: 'October 24, 2023',
      image: 'https://images.unsplash.com/photo-1509319117193-42d427418599?w=800&q=80'
    },
    {
      id: 2,
      category: 'Sustainability',
      title: 'Building a Capsule Wardrobe with AI',
      excerpt: 'How artificial intelligence helps you buy less but wear more by identifying versatile combinations.',
      date: 'November 12, 2023',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80'
    },
    {
      id: 3,
      category: 'Style Guide',
      title: 'Color Theory for the Modern Professional',
      excerpt: 'Navigating the psychology of color in the workplace without sacrificing your personal brand.',
      date: 'January 05, 2024',
      image: 'https://images.unsplash.com/photo-1485230946086-1d99d529c7ad?w=800&q=80'
    }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      <div className="flex flex-col items-center text-center mb-20 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">The Journal</span>
        <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">Notes on Style.</h2>
        <p className="text-stone-500 text-lg font-light leading-relaxed">
          Curated insights on fashion technology, sustainable styling, and the future of your wardrobe.
        </p>
      </div>

      <div className="flex flex-col gap-20">
        {articles.map((article, index) => (
          <article key={article.id} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
               <img 
                 src={article.image} 
                 alt={article.title} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
               />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-200 pb-2 mb-6">
                {article.category}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 leading-tight">
                {article.title}
              </h3>
              <p className="text-stone-500 leading-relaxed mb-6 font-light">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                <span className="text-stone-400">{article.date}</span>
                <a href="#" className="text-stone-900 hover:text-stone-600 border-b border-transparent hover:border-stone-900 transition-all">Read Story</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};