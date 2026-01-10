import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import AdScriptGenerator from './components/AdScriptGenerator';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import { fetchSessionDetails, SessionDetails } from './services/stripeService';
import { CheckCircle2, Tv, ArrowRight, MapPin, Calendar, CreditCard, Loader2 } from 'lucide-react';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get('session_id');
    if (sid) {
      setIsSuccess(true);
      setLoading(true);
      fetchSessionDetails(sid)
        .then(details => {
          setSessionDetails(details);
        })
        .catch(err => {
          console.error("Success Page Error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
      // Clean up the URL without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border-4 border-brand-primary animate-fade-in-up">
          {loading ? (
            <div className="py-20 flex flex-col items-center">
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Synchronizing Broadcast Nodes...</p>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-brand-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-4 leading-none">
                Welcome To The Neighborhood
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-8">
                Your neighborhood inventory has been reserved. Our AI production team is finalizing your broadcast master for deployment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center gap-2">
                  <Tv className="w-8 h-8 text-brand-primary" />
                  <span className="font-black text-brand-dark uppercase tracking-widest text-[10px]">Coverage Area</span>
                  <span className="font-bold text-gray-600 text-xs">
                    {sessionDetails?.zipCount || 1} ZIP{sessionDetails?.zipCount && sessionDetails.zipCount > 1 ? 'S' : ''} PROTECTED
                  </span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center gap-2">
                  <MapPin className="w-8 h-8 text-brand-primary" />
                  <span className="font-black text-brand-dark uppercase tracking-widest text-[10px]">Target ZIPs</span>
                  <span className="font-bold text-gray-600 text-[10px] truncate w-full">
                    {sessionDetails?.zipCodes.join(', ') || 'Processing...'}
                  </span>
                </div>
              </div>

              {sessionDetails && (
                <div className="bg-brand-primary/5 rounded-2xl p-6 mb-10 border border-brand-primary/10 text-left space-y-4">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-brand-primary shrink-0" />
                    <div>
                      <p className="font-black text-brand-dark uppercase text-xs tracking-widest mb-1">
                        {sessionDetails.flowType === 'trial_1zip' ? 'Trial Expiration' : 'Next Broadcast Cycle'}
                      </p>
                      <p className="text-sm font-bold text-brand-dark">
                        {sessionDetails.flowType === 'trial_1zip' 
                          ? sessionDetails.trialEnd 
                          : sessionDetails.nextBillingDate}
                      </p>
                    </div>
                  </div>
                  
                  {sessionDetails.flowType === 'paid_multizip' && (
                    <div className="flex items-start gap-4 border-t border-brand-primary/10 pt-4">
                      <CreditCard className="w-6 h-6 text-brand-primary shrink-0" />
                      <div>
                        <p className="font-black text-brand-dark uppercase text-xs tracking-widest mb-1">Subscription Rate</p>
                        <p className="text-sm font-bold text-brand-dark">
                          ${sessionDetails.amount}/month
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setSessionDetails(null);
                }}
                className="w-full py-5 bg-brand-primary text-brand-dark font-black rounded-xl text-xl uppercase tracking-tight flex items-center justify-center group shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all"
              >
                Go Back To Main Site
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-brand-dark overflow-x-hidden bg-white selection:bg-brand-primary selection:text-brand-dark">
      <Navigation />
      <main>
        <Hero />
        <AdScriptGenerator />
        <ProblemSolution />
        <Features />
        <Process />
        <Testimonials />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

export default App;
