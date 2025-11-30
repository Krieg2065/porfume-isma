import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NotesSection } from './components/NotesSection';
import { Oracle } from './components/Oracle';
import { Waitlist } from './components/Waitlist';
import { WaitlistPopup } from './components/WaitlistPopup';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-crimson-900 selection:text-white">
      <WaitlistPopup />
      <Navbar />
      <main>
        <Hero />
        <NotesSection />
        <div id="oracle">
          <Oracle />
        </div>
        <Waitlist />
      </main>
      <footer className="py-8 bg-black border-t border-crimson-900/20 text-center">
        <p className="text-crimson-100/20 text-xs font-serif tracking-widest">
          © 2025 CRIMSON NOTE. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default App;