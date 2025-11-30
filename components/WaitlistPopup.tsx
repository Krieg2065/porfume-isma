import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { generateWelcomePoem } from '../services/geminiService';

export const WaitlistPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [poem, setPoem] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Open popup after 3.5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Small delay for fade-in animation
      setTimeout(() => setIsVisible(true), 50);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 500); // Wait for fade out
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate welcome poem using Gemini
    const welcomeMessage = await generateWelcomePoem(name);
    setPoem(welcomeMessage);
    setStatus('success');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-black border border-gold-900/40 p-8 shadow-[0_0_50px_rgba(166,130,54,0.1)] transform transition-transform duration-500">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-600/60"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold-600/60"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold-600/60"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-600/60"></div>

        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gold-800 hover:text-gold-500 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center space-y-6 py-6 animate-fade-in">
            <h3 className="text-2xl font-serif text-gold-500 tracking-widest">ACCEPTED</h3>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto"></div>
            <p className="text-gold-100/90 font-serif italic text-lg leading-relaxed">
              "{poem}"
            </p>
            <p className="text-xs text-gold-400/40 uppercase tracking-widest pt-4">
              We await you in the shadows.
            </p>
            <Button onClick={handleClose} variant="outline" className="mt-4 w-full !border-gold-800 !text-gold-400 hover:!text-gold-200">
              ENTER
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-serif text-gold-600 tracking-[0.2em] uppercase">Exclusive Access</span>
              <h2 className="text-3xl font-serif text-white">
                THE LIST IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 to-gold-600">FILLING</span>
              </h2>
              <p className="text-gold-100/40 text-sm font-sans pt-2">
                Join our society to receive early access to the Crimson Note release.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gold-950/30 border border-gold-900/50 text-gold-100 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-gold-900/50"
                  placeholder="NAME"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gold-950/30 border border-gold-900/50 text-gold-100 px-4 py-3 text-sm focus:outline-none focus:border-gold-600 transition-colors placeholder-gold-900/50"
                  placeholder="EMAIL ADDRESS"
                />
              </div>
              
              <Button type="submit" isLoading={status === 'loading'} className="w-full mt-2 !bg-crimson-900 hover:!bg-black hover:!border-gold-600">
                JOIN THE LIST
              </Button>
            </form>
            
            <p className="text-[10px] text-center text-gold-600/30 uppercase tracking-widest">
              Limited spots available for 2025 release
            </p>
          </div>
        )}
      </div>
    </div>
  );
};