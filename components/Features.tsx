import React from 'react';
import { Target, Zap, QrCode, BarChart3, Check } from 'lucide-react';
import { Feature } from '../types';

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: '1',
      icon: <Target className="w-6 h-6 text-brand-primary" />,
      title: "ZIP-Code Targeting",
      description: "We bypass demographic guesswork. By utilizing real-time search data and behavioral signals, we identify customers actively researching your services."
    },
    {
      id: '2',
      icon: <Zap className="w-6 h-6 text-brand-primary" />,
      title: 'Direct Response Formats',
      description: "Our 'Get Off The Couch' framework uses direct-response psychology to break the trance of passive viewing and trigger an immediate impulse to act."
    },
    {
      id: '3',
      icon: <QrCode className="w-6 h-6 text-brand-primary" />,
      title: "QR Code Integration",
      description: "Every creative asset features a dynamic, high-contrast QR code. This bridges the gap between TV and mobile for instant booking."
    },
    {
      id: '4',
      icon: <BarChart3 className="w-6 h-6 text-brand-primary" />,
      title: "Performance Tracking",
      description: "Eliminate the 'black box'. Our dashboard provides transparent reporting on impressions, view rates, zip-code penetration, and scan counts."
    }
  ];

  return (
    <section id="features" className="py-28 bg-white text-brand-dark relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-brand-primary font-bold tracking-[0.2em] uppercase mb-4 text-sm">Proprietary Technology</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight mb-6">
            Big Screen Impact. <br />
            <span className="text-gray-500">Local Budget.</span>
          </h3>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">
            Access premium TV inventory without the premium price tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white border border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/10 group-hover:scale-110 transition-transform duration-300">
                <div className="text-brand-primary">
                    {feature.icon}
                </div>
              </div>
              
              <h4 className="text-xl font-bold mb-4 text-brand-dark group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-800 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* PRICING BLOCK */}
        <div className="max-w-4xl mx-auto bg-brand-dark rounded-3xl p-8 md:p-12 text-center text-white border border-gray-700 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]"></div>
             <div className="relative z-10">
                 <h3 className="text-2xl md:text-3xl font-bold mb-6">Simple, Transparent Pricing</h3>
                 <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                     <div className="bg-white/10 rounded-2xl p-6 border border-white/10 w-full md:w-auto min-w-[300px]">
                         <span className="block text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Single ZIP Code</span>
                         <div className="text-5xl font-black text-brand-primary mb-2">$99<span className="text-lg text-white font-medium">/mo</span></div>
                         <p className="text-gray-400 text-sm">Perfect for local dominance</p>
                     </div>
                     <div className="text-left space-y-3">
                         <div className="flex items-center"><Check className="text-brand-primary w-5 h-5 mr-3" /> <span className="text-lg">30-Day Free Trial (1 ZIP included)</span></div>
                         <div className="flex items-center"><Check className="text-brand-primary w-5 h-5 mr-3" /> <span className="text-lg">No charge today</span></div>
                         <div className="flex items-center"><Check className="text-brand-primary w-5 h-5 mr-3" /> <span className="text-lg">Auto-bills after 30 days</span></div>
                     </div>
                 </div>
                 <button 
                    onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-brand-primary text-brand-dark font-black px-8 py-4 rounded-full hover:bg-white transition-colors text-lg"
                 >
                    Start Your Preview
                 </button>
             </div>
        </div>

      </div>
    </section>
  );
};

export default Features;