import React from 'react';
import { Target, Zap, QrCode, Check, ShieldCheck, Star, Award, SearchCheck, ArrowRight, HelpCircle, ChevronRight } from 'lucide-react';
import { Feature } from '../types';

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: '1',
      icon: <Target className="w-7 h-7" />,
      title: "Daily Neighborhood Saturation",
      description: "Own the attention of your local market. We ensure your brand appears daily in your specific zip codes to build inevitable trust."
    },
    {
      id: '2',
      icon: <Zap className="w-7 h-7" />,
      title: '1,000 Guaranteed Airings',
      description: "Our performance fail-safe: You receive 1,000 broadcast spots per zip every 30 days. If we miss the count, we deliver the rest free."
    },
    {
      id: '3',
      icon: <QrCode className="w-7 h-7" />,
      title: "Google Maps Bridge",
      description: "We don't just generate 'awareness'. Our TV-to-Map flow drives high-intent viewers directly to your physical door via your verified pin."
    },
    {
      id: '4',
      icon: <Award className="w-7 h-7" />,
      title: "Zero Setup Production",
      description: "Forget expensive agencies. Our AI creates your 60-second broadcast masterclass automatically using your verified business profile."
    }
  ];

  const faqs = [
    {
      q: "Why is a credit card required if it’s $0?",
      a: "Because we allocate real TV inventory and production resources during the trial. Requiring a card prevents abuse and ensures fairness to verified local businesses."
    },
    {
      q: "When will I be charged?",
      a: "Only after day 30 if you choose to continue. You can cancel anytime before the trial ends and you will not be charged."
    },
    {
      q: "How are the 1,000 spots delivered?",
      a: "We distribute your commercial across top-tier Connected TV apps, specifically targeting devices within your selected zip code boundaries."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-28 bg-white text-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-primary/5 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
            <SearchCheck className="w-3 h-3" />
            <span>The Value Stack</span>
          </div>
          <h3 className="text-4xl md:text-7xl font-black text-brand-dark tracking-tighter mb-6 md:mb-8 uppercase leading-tight md:leading-none">
            Establish Authority.<br />
            <span className="text-gray-400">Dominate The Living Room.</span>
          </h3>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg md:text-xl font-light leading-relaxed px-2">
            Everything you need to turn local traffic into a predictable engine. 100% Done-For-You.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28">
          {features.map((feature) => (
            <div key={feature.id} className="group relative bg-white border border-gray-100 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center">
              <div className="mb-6 md:mb-8 inline-flex p-4 md:p-5 rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-brand-dark uppercase tracking-tight leading-none">{feature.title}</h4>
              <p className="text-gray-500 leading-relaxed font-medium text-xs md:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Not For Everyone Section */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-28 bg-gray-50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border border-gray-200 shadow-inner">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center">
                <div className="shrink-0">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-dark rounded-2xl md:rounded-3xl flex items-center justify-center shadow-xl border-2 md:border-4 border-brand-primary/20">
                        <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-brand-primary" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl md:text-3xl font-black text-brand-dark uppercase tracking-tighter mb-3 md:mb-4 leading-none">This Is NOT For Everyone</h4>
                    <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                        To maintain broadcast standards, we only partner with <strong className="text-brand-dark">verified businesses</strong> with physical presence. No online-only brands or unverified listings.
                    </p>
                </div>
            </div>
        </div>

        {/* PRICING BLOCK */}
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-center text-white border-4 md:border-8 border-brand-primary/10 shadow-2xl relative overflow-hidden mb-20 md:mb-28">
             <div className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
             
             <div className="relative z-10">
                 <div className="mb-8 md:mb-10">
                    <span className="bg-brand-primary text-brand-dark px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest inline-block mb-4">Saturation Pricing</span>
                    <h3 className="text-3xl md:text-6xl font-black mb-3 md:mb-4 tracking-tighter uppercase leading-tight md:leading-none px-2">Scalable Local Dominance</h3>
                    <p className="text-gray-400 text-sm md:text-lg font-light">Daily placement, and guaranteed results.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-14">
                     {/* TRIAL */}
                     <div className="bg-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border-2 border-white/10 text-left hover:border-brand-primary/30 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-black text-brand-primary uppercase tracking-[0.2em] text-[9px] md:text-[10px]">Trial Program</span>
                            <Zap className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight leading-none">First 1,000 Spots</h4>
                        <div className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tighter leading-none">$0.00 <span className="text-[9px] font-bold text-gray-500 block mt-2 uppercase tracking-[0.2em]">We Pay The Cost</span></div>
                        <ul className="space-y-3 md:space-y-4 mb-2">
                            <li className="flex items-center text-xs md:text-sm font-bold"><Check className="w-4 h-4 mr-3 text-brand-primary" /> 1,000 Guaranteed Airings</li>
                            <li className="flex items-center text-xs md:text-sm font-bold"><Check className="w-4 h-4 mr-3 text-brand-primary" /> Done-For-You Commercial</li>
                            <li className="flex items-center text-xs md:text-sm text-gray-400 font-bold"><Check className="w-4 h-4 mr-3 text-gray-600" /> Cancel Anytime</li>
                        </ul>
                     </div>

                     {/* FULL PACK */}
                     <div className="bg-brand-primary/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border-4 border-brand-primary/20 text-left relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-black text-brand-primary uppercase tracking-[0.2em] text-[9px] md:text-[10px]">Dominator</span>
                            <Award className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight leading-none">Saturation Plan</h4>
                        <div className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tighter leading-none">$99 <span className="text-[9px] font-bold text-gray-500 block mt-2 uppercase tracking-[0.2em]">Per Zip / Month</span></div>
                        <ul className="space-y-3 md:space-y-4">
                            <li className="flex items-center text-xs md:text-sm font-black"><Check className="w-4 h-4 mr-3 text-brand-primary" /> 1,000 Spots PER Zip</li>
                            <li className="flex items-center text-xs md:text-sm font-black"><Check className="w-4 h-4 mr-3 text-brand-primary" /> Priority Placement</li>
                            <li className="flex items-center text-xs md:text-sm text-brand-primary font-black"><Check className="w-4 h-4 mr-3" /> Performance Fail-Safe</li>
                        </ul>
                     </div>
                 </div>

                 {/* PERFORMANCE GUARANTEE */}
                 <div className="max-w-2xl mx-auto mb-10 md:mb-14 text-center px-4">
                    <div className="inline-block bg-brand-primary/10 border border-brand-primary/20 p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm">
                        <h5 className="text-lg md:text-xl font-black text-brand-primary uppercase tracking-widest mb-3 leading-tight">Performance Fail-Safe Guarantee</h5>
                        <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed italic">
                            "If we fail to deliver 1,000 verified airings, you don’t just cancel—we refund your payment in full. We take 100% of the risk so you can dominate the local big screen."
                        </p>
                    </div>
                 </div>

                 <button 
                    onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-brand-primary text-brand-dark font-black px-10 md:px-16 py-5 md:py-7 rounded-full hover:bg-white transition-all text-xl md:text-2xl shadow-[0_0_40px_rgba(0,196,180,0.4)] transform hover:scale-105"
                 >
                    Claim My TV Credit
                    <ArrowRight className="inline-block ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                 </button>
                 <p className="mt-8 text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">Limited to verified businesses</p>
             </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-4xl mx-auto px-2">
          <div className="text-center mb-8 md:mb-12">
            <h4 className="text-2xl md:text-3xl font-black text-brand-dark uppercase tracking-tighter flex items-center justify-center">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 mr-3 text-brand-primary" />
              Frequently Asked Questions
            </h4>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-brand-primary/30 transition-all">
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-primary p-1.5 rounded-lg shrink-0 mt-1">
                    <ChevronRight className="w-3 h-3 text-brand-dark" />
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-black text-brand-dark uppercase tracking-tight mb-2 leading-snug">{faq.q}</p>
                    <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;