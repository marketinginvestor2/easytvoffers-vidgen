import React from 'react';
import { Tv, MapPin, ShieldCheck, ArrowRight, Phone, Award } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-gray-400 py-24 border-t border-gray-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
             <div className="flex items-center text-white">
              <Tv className="h-10 w-10 text-brand-primary mr-4" />
              <span className="font-black text-3xl tracking-tighter uppercase">
                EASY TV OFFERS
              </span>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md font-light">
              We provide the only neighborhood visibility accelerator built exclusively for local, verified businesses. Stop competing for tiny phone screens—establish your authority on the biggest screen in the house.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center space-x-2 text-[10px] font-black text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span>Verified Maps Listings Only</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-black text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
                <Award className="w-4 h-4 text-brand-primary" />
                <span>Fail-Safe Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Contact & Action Column */}
          <div className="lg:col-span-7 bg-white/5 rounded-[3rem] p-10 md:p-14 border border-white/10 hover:border-brand-primary/30 transition-all shadow-2xl">
            <h4 className="text-white font-black text-3xl mb-8 uppercase tracking-tighter leading-none">Claim Your Neighborhood Credit</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="flex items-center p-5 bg-brand-dark rounded-2xl border border-gray-700/50 shadow-inner group cursor-pointer hover:border-brand-primary/50 transition-colors">
                        <div className="bg-brand-primary/10 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                            <Phone className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Qualify By Phone</span>
                            <span className="text-xl font-black text-white tracking-widest">1-248-453-7060</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 px-2">
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-gray-600"></div>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Saturating 140+ Neighborhoods</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <button 
                        onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full group bg-brand-primary text-brand-dark font-black text-xl py-6 px-8 rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center shadow-xl shadow-brand-primary/20"
                    >
                        Claim My Credit
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 font-bold uppercase tracking-widest">
                        We pay for your first 1,000 spots.
                    </p>
                </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-600">
          <p>&copy; {new Date().getFullYear()} EASY TV OFFERS. Established Authority.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
             <span className="hover:text-brand-primary transition-colors cursor-pointer">Privacy Protocol</span>
             <span className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Dominance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;