import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      businessName: 'The Gyro Boys',
      type: 'Restaurant',
      quote: "Signed up for one month, but within a week started seeing traffic. Customers said, 'We saw you on TV and your food looked awesome.'",
      result: 'Immediate foot traffic increase'
    },
    {
      id: '2',
      businessName: 'Mathnasium of Macomb',
      type: 'Tutoring Center',
      quote: "Saw a spike in leads and hundreds of TV spots per day. It's the most consistent lead source we have right now.",
      result: 'Consistent lead flow'
    },
    {
      id: '3',
      businessName: 'The Avenue Hotel',
      type: 'Wedding Venue',
      quote: "Ran a TV offer to book a new function room. Resulted in 27 confirmed bookings, each worth thousands of pounds.",
      result: '27 High-Ticket Bookings'
    },
    {
      id: '4',
      businessName: 'Skin by Kat',
      type: 'Beauty Salon',
      quote: "Gained 65% in customer clientele in the last 30 days. Much better return on investment than Groupon or Facebook Ads.",
      result: '65% Growth in 30 Days'
    }
  ];

  return (
    <section id="testimonials" className="py-28 bg-brand-surface relative overflow-hidden">
      {/* Decorative Text */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-[0.03]">
          <span className="text-[200px] font-black uppercase text-brand-dark leading-none">Results</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">Real Businesses. <span className="text-brand-primary">Real Results.</span></h2>
          <p className="text-xl text-gray-500 font-light">Don't take our word for it. Here is what our partners are saying.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative group hover:-translate-y-1">
              <Quote className="absolute top-10 right-10 text-brand-primary/10 w-16 h-16 group-hover:text-brand-primary/20 transition-colors" />
              
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-accent fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 italic text-xl mb-8 relative z-10 font-serif leading-relaxed">
                "{t.quote}"
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                <div>
                    <h4 className="font-bold text-brand-dark text-lg">{t.businessName}</h4>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t.type}</span>
                </div>
                <div className="text-right bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                    <span className="block text-[10px] text-emerald-800 uppercase font-bold tracking-wider mb-0.5">Outcome</span>
                    <span className="font-bold text-emerald-600 text-sm">{t.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;