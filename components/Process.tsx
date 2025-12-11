import React from 'react';
import { CheckCircle2, ClipboardList, Clapperboard, Rocket, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight">
            The <span className="text-brand-primary underline decoration-4 decoration-brand-primary/30 underline-offset-4">Rapid Deployment</span> Protocol
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
            We have systematized the production and media buying process. From concept to broadcast in 72 hours.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-brand-primary/30 to-gray-200 -z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                <ClipboardList className="w-10 h-10 text-brand-dark group-hover:text-brand-primary transition-colors" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">1</div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">Strategic Intake</h3>
              <p className="text-gray-600 leading-relaxed px-4">
                Complete our secure production brief. We analyze your core offer and target demographics to build a custom campaign profile.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-brand-primary border-4 border-brand-primary/30 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-xl shadow-brand-primary/30">
                 <Clapperboard className="w-10 h-10 text-brand-dark" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">Creative Production</h3>
              <p className="text-gray-600 leading-relaxed px-4">
                Our creative team executes the "Get Off The Couch" script, professional voiceover, and motion graphics. QR integration included.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-primary transition-colors duration-300 shadow-xl">
                 <Rocket className="w-10 h-10 text-brand-dark group-hover:text-brand-primary transition-colors" />
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">Launch & Optimization</h3>
              <p className="text-gray-600 leading-relaxed px-4">
                Campaigns go live across our premium inventory network. You gain instant access to your Dashboard to track impressions and scans.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
             <div className="inline-flex items-center bg-brand-surface px-8 py-4 rounded-full font-bold border border-gray-200 shadow-sm text-brand-dark">
                <CheckCircle2 className="w-6 h-6 mr-3 text-brand-primary" />
                <span>All-Inclusive Service: Video Editing, Voiceover, Media Buying & Hosting</span>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Process;