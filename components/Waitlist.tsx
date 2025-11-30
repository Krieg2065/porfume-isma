import React, { useState } from 'react';
import { Button } from './Button';
import { generateWelcomePoem } from '../services/geminiService';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [poem, setPoem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call for waitlist
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate welcome poem
    const welcomeMessage = await generateWelcomePoem(name);
    setPoem(welcomeMessage);
    setStatus('success');
  };

  return (
    <section id="waitlist" className="py-24 bg-black relative overflow-hidden">
      {/* Abstract Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-xl text-center">
        {status === 'success' ? (
          <div className="animate-fade-in space-y-6 p-8 border border-crimson-800/30 bg-crimson-950/20 backdrop-blur-lg">
            <h3 className="text-3xl font-serif text-gold-500 mb-2">You are Listed</h3>
            <p className="text-crimson-100/80 font-serif italic text-lg leading-relaxed">
              "{poem}"
            </p>
            <p className="text-sm text-crimson-100/40 mt-4 uppercase tracking-widest">
              Watch your inbox for the sign.
            </p>
            <button 
              onClick={() => { setStatus('idle'); setEmail(''); setName(''); setPoem(''); }}
              className="text-xs text-crimson-500 underline mt-8 hover:text-crimson-400"
            >
              Register another soul
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wider">
              JOIN THE <span className="text-crimson-600">COVEN</span>
            </h2>
            <p className="text-crimson-100/60 font-sans">
              Limited to 500 bottles for the first release. Secure your access to the Crimson Note.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="group">
                <label htmlFor="name" className="block text-xs font-serif text-crimson-500 mb-1 tracking-widest uppercase">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-crimson-900 text-crimson-50 py-2 focus:outline-none focus:border-crimson-500 transition-colors placeholder-crimson-900/50"
                  placeholder="Enter your name"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-xs font-serif text-crimson-500 mb-1 tracking-widest uppercase">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-crimson-900 text-crimson-50 py-2 focus:outline-none focus:border-crimson-500 transition-colors placeholder-crimson-900/50"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="pt-6">
                <Button type="submit" isLoading={status === 'loading'} className="w-full">
                  REQUEST ACCESS
                </Button>
              </div>
            </form>
            
            <p className="text-[10px] text-crimson-100/20 uppercase tracking-widest">
              By joining, you agree to succumb to the allure.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};