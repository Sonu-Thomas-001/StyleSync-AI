import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const navItems = ['Home', 'Collection', 'Inspiration', 'Journal', 'About'];
  const [imgError, setImgError] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-white/20">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('Home')}
        >
          {/* Logo Logic: separate images for Mobile (Mark) and Desktop (Full) */}
          {!imgError ? (
            <>
              {/* Mobile: SAS Monogram */}
              <img 
                src="img/logo-mark.png" 
                alt="StyleSync" 
                className="h-9 w-auto object-contain md:hidden transition-opacity duration-300"
                onError={() => setImgError(true)}
              />
              
              {/* Desktop: Full Logo with Text */}
              <img 
                src="img/logo-full.png" 
                alt="StyleSync AI" 
                className="hidden md:block h-10 w-auto object-contain transition-opacity duration-300"
                onError={() => setImgError(true)}
              />
            </>
          ) : (
            // Elegant Fallback if images fail - Mimics the "SAS" design
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                 <span className="font-serif text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8e7264] via-[#d6bba8] to-[#8e7264]">
                    SAS
                 </span>
              </div>
              <div className="hidden md:flex flex-col justify-center h-9 pl-3 border-l border-stone-300">
                <span className="font-serif text-lg font-bold text-stone-900 tracking-tight leading-none">
                  StyleSync
                </span>
                <span className="text-[0.5rem] font-sans font-bold uppercase tracking-[0.3em] text-accent-dark leading-none mt-1">
                  Artificial Intelligence
                </span>
              </div>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
          {navItems.map((item) => (
            <button 
              key={item}
              onClick={() => onNavigate(item)}
              className={`hover:text-stone-900 transition-colors ${currentPage === item ? 'text-stone-900' : ''}`}
            >
              {item}
            </button>
          ))}
          
          {/* Profile Icon / Link */}
          <button 
            onClick={() => onNavigate('Profile')}
            className={`flex items-center gap-2 pl-4 border-l border-stone-200 hover:text-stone-900 transition-colors ${currentPage === 'Profile' ? 'text-stone-900' : ''}`}
            aria-label="Your Profile"
          >
            <div className="w-8 h-8 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
               <img src="https://i.pravatar.cc/150?u=sarah" alt="User" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
            </div>
          </button>
        </nav>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => onNavigate('Profile')} className="w-8 h-8 rounded-full bg-stone-100 overflow-hidden">
             <img src="https://i.pravatar.cc/150?u=sarah" alt="User" className="w-full h-full object-cover" />
          </button>
          <div className="text-stone-900 cursor-pointer hover:text-stone-600 transition-colors">
             <span className="text-xs font-bold uppercase tracking-widest" onClick={() => onNavigate('Collection')}>Menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};