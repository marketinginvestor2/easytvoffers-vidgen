import React, { useState } from 'react';
import { PlayCircle, Tv, ArrowRight, CheckCircle2, Wand2, X, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeVideo = () => {
    setActiveVideoId(null);
    document.body.style.overflow = 'unset';
  };

  const clients = [
    { name: 'THE GYRO BOYZ', videoId: '0R8ex29_noQ' },
    { name: 'MATHNASIUM', videoId: 'ou0N4bR-kQs' },
    { name: 'SKIN BY KAT', videoId: '2DofyIPgHIc' },
    { name: 'THE AVENUE', videoId: 'x7FYaIc30fM' },
    { name: 'FINJAN CAFE', videoId: 'x7FYaIc30fM' },
    { name: 'RYANRX', videoId: 'CyoaDJUCz4I' },
  ];

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
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
          </div>
          <span className="text-gray-300 font-medium text-xs uppercase tracking-widest">
             Local TV Spotlight
          </span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl">
          Preview Your Business <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-teal-200 to-brand-primary bg-[length:200%_auto] animate-gradient">
             On Local TV.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light">
          Target local customers in specific ZIP codes. Use our AI Commercial Preview to create a broadcast-ready spot in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <button 
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative w-full sm:w-auto px-12 py-6 bg-brand-primary text-brand-dark text-xl font-black rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(0,196,180,0.4)] hover:shadow-[0_0_80px_rgba(0,196,180,0.6)] transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              <Wand2 className="mr-3 w-6 h-6 animate-pulse" />
              Preview My Commercial
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
          </button>

          <a 
            href="https://tidycal.com/tv/amkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-6 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
          >
            <Calendar className="mr-3 w-5 h-5" />
            Book Strategy Call
          </a>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t border-white/5 pt-10">
          <p className="text-xs text-gray-500 font-bold tracking-[0.3em] uppercase mb-8">Trusted by Local Businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 opacity-90 transition-all duration-500">
             
             {clients.map((client) => (
                <button 
                  key={client.name}
                  onClick={() => openVideo(client.videoId)}
                  className="group flex items-center space-x-2 focus:outline-none transition-transform hover:scale-105"
                  aria-label={`Watch ${client.name} Testimonial`}
                >
                  <span className="font-black text-xl md:text-2xl text-gray-400 tracking-tighter group-hover:text-brand-primary transition-colors uppercase">
                    {client.name}
                  </span>
                  <PlayCircle className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
             ))}

          </div>
          
          <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-500">
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> Instant Preview</div>
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> Done-For-You</div>
             <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-brand-primary" /> ZIP-Based Targeting</div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Blurred Backdrop - Reduced opacity and blur for visibility */}
          <div 
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md transition-opacity duration-300"
            onClick={closeVideo}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-fade-in-up">
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-brand-primary text-white hover:text-brand-dark rounded-full transition-all duration-300 backdrop-blur-md group"
            >
              <X className="w-6 h-6" />
            </button>
            
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title="Client Testimonial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;