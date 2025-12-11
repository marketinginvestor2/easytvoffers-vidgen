import React from 'react';
import { PlayCircle, Tv, ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark selection:bg-brand-primary selection:text-brand-dark">
      {/* Abstract Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/50 to-brand-dark"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        
        {/* Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-10 backdrop-blur-md shadow-2xl animate-fade-in-up">
          <div className="flex -space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <span className="text-gray-300 font-medium text-xs uppercase tracking-widest">
            Accepting Partners for Q4
          </span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl">
          Command <br className="md:hidden" />
          Attention on <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-teal-200 to-brand-primary bg-[length:200%_auto] animate-gradient">
            Local TV Screens
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light">
          Bypass the noise of social media. We engineer <span className="text-white font-semibold border-b border-brand-primary/50">hyper-targeted Connected TV campaigns</span> that place your brand in front of customers watching YouTube on the big screen.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <a 
            href="https://tidycal.com/tv/amkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-10 py-5 bg-brand-primary text-brand-dark text-lg font-bold rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(0,196,180,0.3)] hover:shadow-[0_0_60px_rgba(0,196,180,0.5)] transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              Book Your Strategy Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
          </a>
          <button 
            onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full sm:w-auto px-10 py-5 bg-transparent text-white text-lg font-semibold rounded-full hover:bg-white/5 transition-all border border-white/20 hover:border-brand-primary flex items-center justify-center backdrop-blur-sm"
          >
            <PlayCircle className="w-5 h-5 mr-2 text-brand-primary group-hover:scale-110 transition-transform" />
            See How It Works
          </button>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t border-white/5 pt-10">
          <p className="text-xs text-gray-500 font-bold tracking-[0.3em] uppercase mb-8">Trusted by Local Market Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
             <span className="font-black text-2xl text-white tracking-tighter">THE GYRO BOYS</span>
             <span className="font-black text-2xl text-white tracking-tighter">MATHNASIUM</span>
             <span className="font-black text-2xl text-white tracking-tighter">SKIN BY KAT</span>
             <span className="font-black text-2xl text-white tracking-tighter">THE AVENUE</span>
          </div>
          
          <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-500">
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> No Retainers</div>
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> Done-For-You</div>
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> Guaranteed Reach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;