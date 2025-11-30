import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-crimson-950/95 backdrop-blur-xl py-4 border-b border-gold-900/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold tracking-widest text-white group cursor-pointer">
          C<span className="text-crimson-600 group-hover:text-gold-500 transition-colors duration-500">N</span>
          <span className="text-gold-500/50">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-serif tracking-widest text-crimson-100/80">
          <a href="#" className="hover:text-gold-400 transition-colors">MAISON</a>
          <a href="#" className="hover:text-gold-400 transition-colors">NOTES</a>
          <a href="#oracle" className="hover:text-gold-400 transition-colors">ORACLE</a>
        </div>
        <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className={`text-xs tracking-widest uppercase border border-gold-700/50 px-4 py-2 transition-all hover:bg-gold-900/20 hover:border-gold-500 hover:text-gold-200 text-gold-400 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}
        >
          Pre-Order
        </button>
      </div>
    </nav>
  );
};