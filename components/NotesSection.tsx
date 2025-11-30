import React from 'react';
import { Droplets, Flower, Flame, Leaf } from 'lucide-react';
import { ScentNote } from '../types';

const notes: ScentNote[] = [
  {
    name: "Midnight Rose",
    description: "Plucked at the witching hour, velvet petals dripping with secrets.",
    icon: <Flower className="w-6 h-6 text-crimson-500" />
  },
  {
    name: "Ancient Oud",
    description: "Resinous wood from the depths of forgotten forests.",
    icon: <Leaf className="w-6 h-6 text-gold-500" />
  },
  {
    name: "Smoked Amber",
    description: "Warmth that lingers like a memory of fire.",
    icon: <Flame className="w-6 h-6 text-gold-600" />
  },
  {
    name: "Blood Orange",
    description: "A sharp, metallic citrus sting to awaken the senses.",
    icon: <Droplets className="w-6 h-6 text-crimson-600" />
  }
];

export const NotesSection: React.FC = () => {
  return (
    <section className="py-20 relative bg-crimson-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-transparent via-gold-900/10 to-transparent rotate-45 blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-crimson-100 tracking-[0.2em] mb-4">
            THE COMPOSITION
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {notes.map((note, idx) => (
            <div 
              key={note.name}
              className="group p-8 border border-crimson-900/30 bg-gradient-to-b from-crimson-950/80 to-black/80 backdrop-blur-sm hover:border-gold-700/40 transition-all duration-700 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Inner Gradient Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-900/0 via-gold-900/0 to-gold-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="mb-6 p-4 rounded-full bg-black/50 w-fit border border-crimson-900 group-hover:border-gold-600/50 transition-colors duration-500 relative z-10">
                {note.icon}
              </div>
              <h3 className="text-xl font-serif text-gold-400 mb-3 tracking-wide group-hover:text-gold-300 transition-colors">
                {note.name}
              </h3>
              <p className="text-crimson-100/70 font-sans text-sm leading-relaxed">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};