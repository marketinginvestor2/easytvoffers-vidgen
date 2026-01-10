import React from 'react';
import { AlertTriangle, MonitorPlay, XCircle, ArrowRight, Zap } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section id="problem" className="py-16 md:py-28 bg-brand-dark relative overflow-hidden">
       {/* Background accents */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 border border-red-500/20">
              <AlertTriangle className="w-3 md:w-4 h-3 md:h-4" />
              <span>The Local Visibility Gap</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[0.95] tracking-tighter uppercase">
              Most Local Businesses<br />
              <span className="relative inline-block text-red-500">
                Are Invisible
                <svg className="absolute w-full h-2 md:h-3 -bottom-1 md:-bottom-2 left-0 text-red-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              <p>
                Local businesses don't fail because of bad products—they fail because <strong className="text-white">they aren't seen often enough.</strong> A static Maps pin is a passive asset.
              </p>
              <p>
                To own your market, you must be seen in the living room <strong className="text-brand-primary uppercase">before the search starts.</strong> Our Engine bridges that physical gap.
              </p>
            </div>
            
            <div className="mt-8 md:mt-12 space-y-4 md:space-y-5 text-left inline-block">
                <div className="flex items-center text-gray-400 font-medium text-sm md:text-base">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 md:mr-4 shrink-0" />
                    <span>Search traffic misses 95% of neighborhood potential</span>
                </div>
                <div className="flex items-center text-gray-400 font-medium text-sm md:text-base">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 md:mr-4 shrink-0" />
                    <span>Social media trust is declining for local services</span>
                </div>
                <div className="flex items-center text-gray-400 font-medium text-sm md:text-base">
                    <XCircle className="w-5 h-5 text-red-600 mr-3 md:mr-4 shrink-0" />
                    <span>Owners lack a predictable "fame" engine</span>
                </div>
            </div>

            <div className="mt-10 md:mt-12 pt-8 border-t border-gray-800 flex justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center text-brand-primary font-black text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
                >
                    Claim My TV Credit
                    <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative px-4 md:px-0">
             {/* The Solution Card */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-brand-primary to-brand-dark rounded-3xl opacity-20 blur-2xl md:blur-3xl"></div>
            
            <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gray-900 p-8 md:p-10 text-white relative">
                 <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-brand-primary animate-pulse fill-brand-primary" />
                 </div>
                 <div className="flex items-center mb-6 md:mb-8">
                   <div className="p-3 md:p-4 bg-brand-primary rounded-xl md:rounded-2xl mr-4 md:mr-5 shadow-xl shadow-brand-primary/30">
                     <MonitorPlay className="text-brand-dark w-6 h-6 md:w-10 md:h-10" />
                   </div>
                   <div>
                     <span className="block font-black text-xl md:text-3xl tracking-tighter uppercase leading-none">The Fame Engine</span>
                     <span className="text-[8px] md:text-[10px] text-brand-primary uppercase tracking-[0.3em] font-black mt-1.5 inline-block">Daily Saturation</span>
                   </div>
                 </div>
                 <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light">
                   We turn your verified listing into a <strong className="text-white">neighborhood engine</strong> that saturates every screen in your target zip.
                 </p>
              </div>
              
              <div className="p-8 md:p-10 bg-white">
                 <div className="flex justify-between items-end mb-6">
                    <div className="text-left">
                        <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mb-1.5">Visibility</p>
                        <p className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none">1,000<span className="text-brand-primary text-2xl md:text-4xl">/zip</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] md:text-[10px] text-brand-primary uppercase tracking-[0.3em] font-black mb-1.5">Cost</p>
                        <p className="text-3xl md:text-4xl font-black text-brand-dark">$0.00</p>
                    </div>
                 </div>
                 <div className="border-t border-gray-100 pt-6">
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                        We pay for your first <strong className="text-brand-dark">1,000 neighborhood airings</strong> so you can witness the conversion daily.
                    </p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;