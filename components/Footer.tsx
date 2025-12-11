import React from 'react';
import { Tv, Phone, ShieldCheck, ArrowRight, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-gray-400 py-20 border-t border-gray-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
             <div className="flex items-center text-white">
              <Tv className="h-10 w-10 text-brand-primary mr-3" />
              <span className="font-bold text-2xl tracking-tighter">
                EASY TV OFFERS
              </span>
            </div>
            <p className="text-base text-gray-400 leading-relaxed max-w-md">
              The premier Done-For-You Connected TV advertising agency. We empower local businesses to reclaim their market share from social media giants with broadcast-quality campaigns and programmatic precision.
            </p>
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Google Partner Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>Youtube Ads Certified</span>
              </div>
            </div>
          </div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Contact & Action Column */}
          <div className="lg:col-span-5 bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-brand-primary/30 transition-colors">
            <h4 className="text-white font-bold text-xl mb-6">Ready to dominate your local market?</h4>
            
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center p-4 bg-brand-dark rounded-xl border border-gray-700/50">
                  <div className="bg-brand-primary/10 p-3 rounded-full mr-4">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider">Call Us Directly</span>
                    <span className="text-lg font-bold text-white tracking-wide">1-248-453-7060</span>
                  </div>
                </div>
              </div>

              <a 
                href="https://tidycal.com/tv/amkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group bg-brand-primary text-brand-dark font-bold text-lg py-4 px-6 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-brand-primary/20"
              >
                Book Your Strategy Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <p className="text-center text-sm text-gray-500">
                No commitment required. 15-minute discovery chat.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} EASY TV OFFERS. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="hover:text-brand-primary transition-colors cursor-pointer">Privacy Policy</span>
             <span className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;