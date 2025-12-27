import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-stone-50";
  
  // Modern rounded-full for a pill shape
  const shapeStyles = "rounded-full"; 

  const variants = {
    // Primary: Midnight Black with subtle warm undertones on hover
    primary: "bg-stone-900 text-white hover:bg-black shadow-lg shadow-stone-900/20 hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0",
    
    // Secondary: Soft Ivory background, Charcoal text
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 border border-transparent",
    
    // Outline: Charcoal border, Accent hover
    outline: "bg-transparent border border-stone-300 text-stone-900 hover:border-accent hover:text-accent-dark hover:bg-stone-50",
    
    // Ghost: Subtle interaction
    ghost: "bg-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100/50",
    
    // Glass: For overlays, keeps the luxury feel
    glass: "bg-white/80 backdrop-blur-md border border-white/50 text-stone-900 hover:bg-white shadow-sm hover:shadow-md"
  };

  return (
    <button
      className={`${baseStyles} ${shapeStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-accent" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="opacity-80">Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};