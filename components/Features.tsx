import React from 'react';
import { Target, Zap, QrCode, BarChart3 } from 'lucide-react';
import { Feature } from '../types';

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: '1',
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Audience Engineering",
      description: "We bypass demographic guesswork. By utilizing real-time search data and behavioral signals, we identify customers actively researching your services."
    },
    {
      id: '2',
      icon: <Zap className="w-6 h-6 text-white" />,
      title: 'Neuro-Linguistic Scripting',
      description: "Our 'Get Off The Couch' framework uses direct-response psychology to break the trance of passive viewing and trigger an immediate impulse to act."
    },
    {
      id: '3',
      icon: <QrCode className="w-6 h-6 text-white" />,
      title: "Frictionless Conversion",
      description: "Every creative asset features a dynamic, high-contrast QR code. This bridges the gap between TV and mobile for instant booking."
    },
    {
      id: '4',
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Granular Attribution",
      description: "Eliminate the 'black box'. Our dashboard provides transparent reporting on impressions, view rates, zip-code penetration, and scan counts."
    }
  ];

  return (
    <section id="features" className="py-28 bg-brand-dark text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-brand-primary font-bold tracking-[0.2em] uppercase mb-4 text-sm">Proprietary Technology</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Enterprise Ad Tech. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Local Business Prices.</span>
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            We've democratized access to the same targeting infrastructure used by Fortune 500 brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/[0.06] hover:border-brand-primary/30 transition-all duration-500">
              
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 border border-brand-primary/10 group-hover:scale-110 transition-transform duration-300">
                <div className="text-brand-primary">
                    {feature.icon}
                </div>
              </div>
              
              <h4 className="text-xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h4>
              
              <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;