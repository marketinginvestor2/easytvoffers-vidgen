import React from 'react';
import { CheckCircle2, ClipboardList, Clapperboard, Rocket, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-28 bg-brand-dark text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            How It <span className="text-brand-primary underline decoration-4 decoration-brand-primary/30 underline-offset-4">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            We have systematized the production and media buying process. From concept to broadcast in 72 hours.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connection Line - Updated for dark mode */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-800 via-brand-primary/50 to-gray-800 -z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-800 border-4 border-gray-700 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                <ClipboardList className="w-10 h-10 text-gray-300 group-hover:text-brand-primary transition-colors" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-800 shadow-lg">1</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Create Your Preview</h3>
              <p className="text-gray-400 leading-relaxed px-4">
                Use the AI tool to visualize your message instantly. We analyze your core offer and target demographics to build a custom campaign profile.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-brand-primary border-4 border-brand-primary/30 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(0,196,180,0.3)]">
                 <Clapperboard className="w-10 h-10 text-brand-dark" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-brand-primary shadow-lg">2</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Select Your ZIP Codes</h3>
              <p className="text-gray-400 leading-relaxed px-4">
                Choose where you want to air. We handle the rest. Our creative team executes the script, professional voiceover, and motion graphics.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-800 border-4 border-gray-700 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                 <Rocket className="w-10 h-10 text-gray-300 group-hover:text-brand-primary transition-colors" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-800 shadow-lg">3</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Go Live</h3>
              <p className="text-gray-400 leading-relaxed px-4">
                Your 30-day trial begins. Track scans in your dashboard. You gain instant access to metrics on impressions and scans.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
             <div className="inline-flex items-center bg-white/5 px-8 py-4 rounded-full font-bold border border-white/10 shadow-sm text-gray-200">
                <CheckCircle2 className="w-6 h-6 mr-3 text-brand-primary" />
                <span>Includes: Video Production, Media Buying & Tracking</span>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Process;