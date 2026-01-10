import React from 'react';
import { CheckCircle2, ClipboardList, Clapperboard, Rocket, MapPin, Target } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-28 bg-brand-dark text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            The Path to <span className="text-brand-primary">Local Fame</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Simple, automated, and guaranteed. We bridge the gap between your physical location and every living room in your zip code.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-gray-800 via-brand-primary/50 to-gray-800 -z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-800 border-4 border-gray-700 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                <ClipboardList className="w-10 h-10 text-gray-300 group-hover:text-brand-primary transition-colors" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-800">1</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Preview Your Message</h3>
              <p className="text-sm text-gray-400 px-4">Generate your AI commercial in seconds based on your current Google Maps identity.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-800 border-4 border-gray-700 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                 <Target className="w-10 h-10 text-gray-300 group-hover:text-brand-primary transition-colors" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-800">2</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Coverage</h3>
              <p className="text-sm text-gray-400 px-4">Select the specific zip codes around your business where you want to build local fame.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-brand-primary border-4 border-brand-primary/30 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(0,196,180,0.3)]">
                 <MapPin className="w-10 h-10 text-brand-dark" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-brand-primary">3</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Verify Qualification</h3>
              <p className="text-sm text-gray-200 font-bold px-4">Start your 1-zip free trial or pro pack via Stripe. We verify your Maps listing to ensure you're local.</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-800 border-4 border-gray-700 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                 <Rocket className="w-10 h-10 text-gray-300 group-hover:text-brand-primary transition-colors" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center font-bold text-sm border-2 border-gray-800">4</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Dominate the Screen</h3>
              <p className="text-sm text-gray-400 px-4">We launch your daily airings. 1,000 guaranteed spots per zip within 30 days or money back.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
             <div className="inline-flex items-center bg-white/5 px-8 py-4 rounded-full font-bold border border-white/10 shadow-sm text-gray-200">
                <CheckCircle2 className="w-6 h-6 mr-3 text-brand-primary" />
                <span>1,000 Spots Per Zip Guaranteed or Money Back</span>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Process;