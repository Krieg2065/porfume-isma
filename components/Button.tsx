import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 font-serif tracking-widest transition-all duration-500 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-crimson-900 to-crimson-800 text-crimson-100 border border-crimson-600 hover:from-crimson-800 hover:to-gold-900 hover:border-gold-600 hover:shadow-[0_0_25px_rgba(166,130,54,0.2)]",
    outline: "bg-transparent text-gold-200 border border-gold-800/50 hover:bg-gold-900/10 hover:border-gold-500 hover:text-gold-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-gold-300/30 border-t-gold-300 rounded-full animate-spin"></span>
            Wait...
          </>
        ) : children}
      </span>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    </button>
  );
};