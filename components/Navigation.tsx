import React, { useState, useEffect } from 'react';
import { Tv, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('hero')}>
            <Tv className="h-8 w-8 text-brand-primary mr-2" />
            <span className="font-bold text-xl tracking-tighter text-white">
              EASY TV OFFERS
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {['Features', 'Process', 'Testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`font-medium hover:text-brand-primary transition-colors text-gray-200`}
              >
                {item}
              </button>
            ))}
            <a
              href="https://tidycal.com/tv/amkhan"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary text-brand-dark px-5 py-2 rounded-full font-bold hover:bg-teal-400 transition-colors shadow-lg transform hover:scale-105"
            >
              Book A Call
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark absolute w-full shadow-xl border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Features', 'Process', 'Testimonials'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-brand-primary hover:bg-gray-800"
              >
                {item}
              </button>
            ))}
            <a
              href="https://tidycal.com/tv/amkhan"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 bg-brand-primary text-brand-dark px-5 py-3 rounded-lg font-bold"
            >
              Book A Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;