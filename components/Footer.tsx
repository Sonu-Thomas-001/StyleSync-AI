import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-8 border-t border-stone-200 mt-auto bg-stone-50">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 uppercase tracking-widest font-medium">
        <p>&copy; {new Date().getFullYear()} StyleSync AI.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button 
            onClick={() => onNavigate('Privacy')} 
            className="hover:text-stone-900 transition-colors"
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate('Terms')} 
            className="hover:text-stone-900 transition-colors"
          >
            Terms
          </button>
          <span className="text-stone-300">|</span>
          <span>Powered by Gemini 2.5</span>
        </div>
      </div>
    </footer>
  );
};