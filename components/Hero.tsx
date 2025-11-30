import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-crimson-950">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson-900/20 via-gold-950/40 to-black opacity-80"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      ></div>

      {/* Spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-crimson-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-soft-light"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gold-800/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 pt-20 md:pt-0 order-2 md:order-1">
          <div className="inline-block px-3 py-1 border border-gold-700/30 rounded-full bg-gradient-to-r from-crimson-950/50 to-gold-950/50 backdrop-blur-sm">
            <span className="text-xs font-serif text-gold-400 tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-500">
              Limited Release 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            CRIMSON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-gold-500 to-crimson-800 animate-gradient-x">
              NOTE
            </span>
          </h1>
          
          <p className="text-crimson-100/70 text-lg md:text-xl font-sans max-w-md mx-auto md:mx-0 leading-relaxed border-l-2 border-gold-800/30 pl-4">
            An intoxicating blend of forbidden florals and ancient resins. <br/>
            <span className="text-gold-500/80 italic">Wear the mystery.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              JOIN WAITLIST
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('oracle')?.scrollIntoView({ behavior: 'smooth' })}>
              CONSULT ORACLE
            </Button>
          </div>
        </div>

        {/* Bottle Image */}
        <div className="md:w-1/2 relative order-1 md:order-2 flex justify-center">
          {/* Bottle Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-crimson-600/20 to-gold-600/10 blur-[80px] rounded-full transform scale-75"></div>
          
          <img 
            src="https://github.com/Krieg2065/lottie/blob/main/Gemini_Generated_Image_qnwbtiqnwbtiqnwb-removebg-preview.png?raw=true" 
            alt="Crimson Note Perfume Bottle" 
            className="relative w-full max-w-md md:max-w-lg object-contain animate-float drop-shadow-[0_20px_50px_rgba(166,130,54,0.15)]"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold-600/50">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};