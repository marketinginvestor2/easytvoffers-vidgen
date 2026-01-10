import React, { useState } from 'react';
import { PlayCircle, Tv, ArrowRight, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    document.body.style.overflow = 'hidden'; 
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
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-[4000ms]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-900/20 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/50 to-brand-dark"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 md:pt-40 pb-20">
        
        {/* Trust Badge - CENTERED */}
        <div className="inline-flex items-center justify-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 mb-8 md:mb-10 backdrop-blur-md shadow-2xl animate-fade-in-up">
          <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-brand-primary" />
          <span className="text-brand-primary font-black text-[9px] md:text-xs uppercase tracking-widest text-center">
             $300 TV Visibility Credit Applied Automatically
          </span>
        </div>
        
        {/* Main Headline - SYMMETRICAL & RESPONSIVE */}
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 drop-shadow-2xl uppercase">
          We Pay For Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-teal-200 to-brand-primary bg-[length:200%_auto] animate-gradient">
             First 1,000 Spots.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 md:mt-8 max-w-3xl mx-auto text-lg md:text-2xl text-gray-300 mb-10 md:mb-14 leading-relaxed font-light px-2">
          We front the cost of your first 1,000 TV airings so your business appears on local living room screens every day — <span className="text-white font-bold uppercase tracking-tight">before customers ever search</span>.
        </p>

        {/* CTA Buttons - CENTERED */}
        <div className="flex flex-col items-center gap-4 mb-16 md:mb-20">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 w-full max-w-lg sm:max-w-none">
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto px-8 md:px-14 py-5 md:py-7 bg-brand-primary text-brand-dark text-lg md:text-xl font-black rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(0,196,180,0.3)] hover:shadow-[0_0_60px_rgba(0,196,180,0.5)] transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                Claim My TV Credit
                <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-7 border-2 border-white/20 text-white text-lg md:text-xl font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Preview My Presence
            </button>
          </div>
          
          {/* Microcopy under CTA */}
          <div className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mt-4">
            <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-primary" />
            <span>$0 today · Cancel before day 30</span>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t border-white/5 pt-10 md:pt-12">
          <p className="text-[8px] md:text-[10px] text-gray-500 font-black tracking-[0.4em] uppercase mb-8 md:mb-10 text-center">Saturating Neighborhoods Across The Nation</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-16 md:gap-y-8 opacity-80 px-4">
             
             {clients.map((client) => (
                <button 
                  key={client.name}
                  onClick={() => openVideo(client.videoId)}
                  className="group flex items-center space-x-2 focus:outline-none transition-transform hover:scale-110"
                >
                  <span className="font-black text-lg md:text-3xl text-gray-500 tracking-tighter group-hover:text-brand-primary transition-colors uppercase">
                    {client.name}
                  </span>
                  <PlayCircle className="w-4 h-4 md:w-5 md:h-5 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
             ))}

          </div>
          
          <div className="mt-10 md:mt-12 flex flex-wrap justify-center items-center gap-x-6 md:gap-x-8 gap-y-3 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
             <div className="flex items-center"><CheckCircle2 className="w-3 md:w-4 h-3 md:h-4 mr-2 text-brand-primary" /> Daily Presence</div>
             <div className="flex items-center"><CheckCircle2 className="w-3 md:w-4 h-3 md:h-4 mr-2 text-brand-primary" /> 1,000 Guaranteed Spots</div>
             <div className="flex items-center"><CheckCircle2 className="w-3 md:w-4 h-3 md:h-4 mr-2 text-brand-primary" /> AI Production</div>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div 
            className="absolute inset-0 bg-brand-dark/70 backdrop-blur-lg transition-opacity duration-300"
            onClick={closeVideo}
          ></div>

          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-fade-in-up">
            <button 
              onClick={closeVideo}
              className="absolute top-4 md:top-6 right-4 md:right-6 z-20 p-2 bg-black/50 hover:bg-brand-primary text-white hover:text-brand-dark rounded-full transition-all duration-300 backdrop-blur-md group"
            >
              <X className="w-5 md:w-6 h-5 md:h-6" />
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