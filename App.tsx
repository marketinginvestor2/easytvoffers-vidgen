import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import AdScriptGenerator from './components/AdScriptGenerator';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';

function App() {
  return (
    <div className="font-sans text-brand-dark overflow-x-hidden bg-white">
      <Navigation />
      <main>
        <Hero />
        <AdScriptGenerator />
        <ProblemSolution />
        <Features />
        <Process />
        <Testimonials />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

export default App;