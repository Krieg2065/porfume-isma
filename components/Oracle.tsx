import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { askOracle } from '../services/geminiService';
import { Button } from './Button';
import { ChatMessage } from '../types';

export const Oracle: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askOracle(input);
    
    const modelMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-crimson-950/30 to-black relative border-y border-gold-900/20">
      {/* Decorative corner gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-800/30 to-transparent"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold-500 mb-4 opacity-80">
            <Sparkles className="w-5 h-5 animate-pulse-slow text-gold-400" />
            <span className="text-sm tracking-widest font-serif uppercase bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-600">
              Powered by Gemini AI
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-crimson-100 mb-6">
            Consult the Oracle
          </h2>
          <p className="text-crimson-100/60 max-w-lg mx-auto font-sans">
            Whisper your mood, your desires, or your occasion. The spirit of Crimson Note will reveal if this elixir is your destiny.
          </p>
        </div>

        <div className="bg-black/40 border border-gold-800/20 rounded-lg backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group">
            {/* Subtle golden glow on container hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-gold-600/0 via-gold-600/10 to-gold-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

          <div className="h-80 overflow-y-auto p-6 space-y-4 custom-scrollbar relative z-10">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gold-900/20 border border-gold-800/30 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gold-600/60" />
                </div>
                <p className="text-gold-200/30 italic font-serif">"Ask me... Do I suit a moonlit walk?"</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-sm border backdrop-blur-sm transition-all duration-500 ${
                  msg.role === 'user' 
                    ? 'bg-crimson-900/20 border-crimson-800/50 text-crimson-50' 
                    : 'bg-gradient-to-br from-black to-gold-950/30 border-gold-800/30 text-gold-200 font-serif italic shadow-[0_0_15px_rgba(133,99,38,0.05)]'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-black/60 border border-gold-800/20 p-4 rounded-sm shadow-lg">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce delay-0"></div>
                      <div className="w-1.5 h-1.5 bg-gold-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-gold-700 rounded-full animate-bounce delay-200"></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAsk} className="p-4 border-t border-gold-900/30 flex gap-2 bg-black/60 relative z-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the essence..."
              className="flex-1 bg-transparent border-b border-gold-900/50 text-gold-100 placeholder-gold-900/50 focus:outline-none focus:border-gold-500 px-2 py-2 font-sans transition-colors"
            />
            <Button type="submit" disabled={isLoading || !input} className="!px-4 !py-2 !border-gold-700/50 !text-gold-300 hover:!border-gold-500 hover:!bg-gold-900/20">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};