import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const FloatingCallButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            // Show after scrolling past Hero (approx 500px)
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <a 
            href="https://tidycal.com/tv/amkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[60] bg-brand-primary text-brand-dark px-5 py-3 rounded-full font-bold shadow-2xl hover:scale-105 hover:bg-white transition-all duration-300 flex items-center gap-2 border border-brand-primary/20 animate-fade-in-up"
            title="Book a Strategy Call"
        >
            <Calendar className="w-5 h-5" />
            <span>Book A Call</span>
        </a>
    );
};

export default FloatingCallButton;