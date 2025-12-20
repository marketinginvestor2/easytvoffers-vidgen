import React, { useState } from 'react';
import { Star, Quote, PlayCircle, X, Youtube, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      businessName: 'The Gyro Boys',
      type: 'Restaurant',
      quote: "Signed up for one month, but within a week started seeing traffic. Customers said, 'We saw you on TV and your food looked awesome.'",
      result: 'Immediate foot traffic increase',
      videoId: '0R8ex29_noQ'
    },
    {
      id: '2',
      businessName: 'Mathnasium',
      type: 'Tutoring Center',
      quote: "Saw a spike in leads and hundreds of TV spots per day. It's the most consistent lead source we have right now.",
      result: 'Consistent lead flow',
      videoId: 'ou0N4bR-kQs'
    },
    {
      id: '3',
      businessName: 'The Avenue Hotel',
      type: 'Wedding Venue',
      quote: "Ran a TV offer to book a new function room. Resulted in 27 confirmed bookings, each worth thousands of pounds.",
      result: '27 High-Ticket Bookings',
      videoId: 'x7FYaIc30fM'
    },
    {
      id: '4',
      businessName: 'Skin by Kat',
      type: 'Beauty Salon',
      quote: "Gained 65% in customer clientele in the last 30 days. Much better return on investment than Groupon or Facebook Ads.",
      result: '65% Growth in 30 Days',
      videoId: '2DofyIPgHIc'
    },
    {
      id: '5',
      businessName: 'Finjan Cafe',
      type: 'Middle Eastern Cafe',
      quote: "People keep telling us they saw our commercial while watching their favorite shows. The visual quality really represents our food well.",
      result: 'Brand Awareness Spike',
      videoId: 'x7FYaIc30fM'
    },
    {
      id: '6',
      businessName: 'RyanRX',
      type: 'Health & Wellness',
      quote: "The ROI on our TV campaign has outperformed our digital spend by a wide margin. It's built trust with our patients before they even walk in the door.",
      result: 'Outperformed Digital Ads',
      videoId: 'CyoaDJUCz4I'
    }
  ];

  const openVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideoId(null);
    document.body.style.overflow = 'unset';
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              onClick={() => t.videoId && openVideo(t.videoId)}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative group hover:-translate-y-1 cursor-pointer"
            >
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors rounded-3xl z-0"></div>
              <Quote className="absolute top-8 right-8 text-brand-primary/10 w-12 h-12 group-hover:text-brand-primary/20 transition-colors" />
              
              <div className="relative z-10">
                  {/* Play Button Overlay */}
                  <div className="mb-6 flex justify-between items-start">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-brand-accent fill-current" />
                        ))}
                    </div>
                    {t.videoId && (
                        <div className="bg-brand-primary/10 text-brand-primary p-2 rounded-full group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                            <PlayCircle className="w-6 h-6" />
                        </div>
                    )}
                  </div>
                
                <p className="text-gray-700 italic text-lg mb-8 font-serif leading-relaxed min-h-[5rem]">
                    "{t.quote}"
                </p>
                
                <div className="flex flex-col justify-between border-t border-gray-50 pt-6">
                    <div className="mb-3">
                        <h4 className="font-bold text-brand-dark text-lg">{t.businessName}</h4>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{t.type}</span>
                    </div>
                    <div className="inline-block bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 self-start">
                        <span className="font-bold text-emerald-600 text-xs flex items-center">
                             {t.result}
                        </span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="mt-20 text-center">
            <a 
                href="https://www.youtube.com/@EasyTVOffers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#FF0000] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
                <Youtube className="w-6 h-6 fill-white" />
                <span>See More Case Studies on YouTube</span>
                <ArrowRight className="w-5 h-5" />
            </a>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideoId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-md transition-opacity duration-300"
            onClick={closeVideo}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10 animate-fade-in-up">
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-brand-primary text-white hover:text-brand-dark rounded-full transition-all duration-300 backdrop-blur-md group"
            >
              <X className="w-6 h-6" />
            </button>
            
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title="Client Testimonial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
};

export default Testimonials;