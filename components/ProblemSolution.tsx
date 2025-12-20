import React from 'react';
import { TrendingUp, AlertTriangle, MonitorPlay, BarChart, XCircle, ArrowRight } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section id="problem" className="py-28 bg-brand-dark relative overflow-hidden">
       {/* Background accents */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-8 border border-red-500/20">
              <AlertTriangle className="w-4 h-4" />
              <span>The Problem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Traditional Advertising <br />
              <span className="relative inline-block text-red-500">
                Has Changed
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>.
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
              <p>
                <strong className="text-white font-bold">Cable is plummeting.</strong> Radio is background noise. And social media feeds are more crowded than ever.
              </p>
              <p>
                To dominate a local market today, you must be where the attention actually is: <span className="bg-brand-primary/20 px-1 text-brand-primary font-bold">Connected TV (CTV)</span>.
              </p>
            </div>
            
            <div className="mt-10 space-y-4">
                <div className="flex items-center text-gray-400">
                    <XCircle className="w-5 h-5 text-red-500 mr-3" />
                    <span>Traditional Ads Are Hard To Track</span>
                </div>
                <div className="flex items-center text-gray-400">
                    <XCircle className="w-5 h-5 text-red-500 mr-3" />
                    <span>Low Retention & Brand Recall</span>
                </div>
                <div className="flex items-center text-gray-400">
                    <XCircle className="w-5 h-5 text-red-500 mr-3" />
                    <span>Broad Targeting Wastes Budget</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
                <a href="https://tidycal.com/tv/amkhan" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center text-brand-primary font-bold hover:text-white transition-colors">
                    See how it works. Book a strategy call.
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
             {/* The Solution Card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-primary to-brand-dark rounded-3xl opacity-20 blur-2xl"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform transition-transform hover:scale-[1.02] duration-500">
              <div className="bg-gray-900 p-8 text-white">
                 <div className="flex items-center mb-6">
                   <div className="p-3 bg-brand-primary rounded-xl mr-4 shadow-lg shadow-brand-primary/20">
                     <MonitorPlay className="text-brand-dark w-8 h-8" />
                   </div>
                   <div>
                     <span className="block font-bold text-2xl tracking-tight">The Solution</span>
                     <span className="text-xs text-brand-primary uppercase tracking-widest font-bold">Connected TV (CTV)</span>
                   </div>
                 </div>
                 <p className="text-gray-300 text-lg leading-relaxed font-light">
                   Target specific <strong className="text-white">ZIP codes and households</strong> with premium video placements.
                 </p>
              </div>
              
              <div className="p-8 bg-white">
                 <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Audience Reach</p>
                        <p className="text-5xl font-black text-brand-dark">91<span className="text-brand-primary">%</span></p>
                    </div>
                    <BarChart className="w-12 h-12 text-gray-200" />
                 </div>
                 <p className="text-sm text-gray-600 border-t border-gray-100 pt-4">
                    Reach customers on the big screen with sound-on attention.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;