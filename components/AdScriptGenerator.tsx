import React, { useState, useRef, useEffect } from 'react';
import { generateTvCommercial } from '../services/geminiService';
import { Wand2, Loader2, Play, Square, Volume2, Radio, Music, ArrowRight } from 'lucide-react';

// Reliable source for royalty-free upbeat background music
const BACKGROUND_MUSIC_URL = 'https://cdn.pixabay.com/audio/2024/01/16/audio_e2b992254f.mp3'; // Energetic Upbeat Corporate

const AdScriptGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [offer, setOffer] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  
  const [view, setView] = useState<'form' | 'simulator'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  
  const [script, setScript] = useState('');
  const [visualHeadline, setVisualHeadline] = useState('');
  const [audioData, setAudioData] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const musicNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const musicGainNodeRef = useRef<GainNode | null>(null);
  const musicBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    // Pre-load background music
    const loadMusic = async () => {
      try {
        const response = await fetch(BACKGROUND_MUSIC_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const arrayBuffer = await response.arrayBuffer();
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const decoded = await ctx.decodeAudioData(arrayBuffer);
        musicBufferRef.current = decoded;
        ctx.close();
      } catch (err) {
        console.warn("Could not preload background music", err);
      }
    };
    loadMusic();

    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !businessType || !offer) return;

    setIsLoading(true);
    setLoadingStep('Analyzing market data...');
    
    try {
      // Simulate steps for UX
      setTimeout(() => setLoadingStep('Rewriting offer for TV...'), 1000);
      setTimeout(() => setLoadingStep('Generating broadcast visuals...'), 2500);
      
      const result = await generateTvCommercial(businessName, businessType, offer, extraInfo);
      
      setLoadingStep('Recording professional voiceover...');
      setScript(result.script);
      setVisualHeadline(result.visualHeadline);
      setAudioData(result.audioBase64);
      setImageData(result.imageBase64);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      setView('simulator');
      // Auto-play
      setTimeout(() => playAudio(result.audioBase64), 1000);
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong generating your commercial. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const decodeAudioData = async (base64String: string, ctx: AudioContext) => {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert 16-bit PCM (Gemini output) to Float32
    const int16View = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(int16View.length);
    for (let i = 0; i < int16View.length; i++) {
        float32Data[i] = int16View[i] / 32768.0;
    }

    // Gemini TTS is typically 24kHz mono
    const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
    audioBuffer.getChannelData(0).set(float32Data);
    
    return audioBuffer;
  };

  const playAudio = async (b64: string | null) => {
    if (!b64) return;
    
    try {
      stopAudio();

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;
      const voiceBuffer = await decodeAudioData(b64, ctx);
      
      // 1. Setup Voice
      const voiceSource = ctx.createBufferSource();
      voiceSource.buffer = voiceBuffer;
      // Boost voice slightly
      const voiceGain = ctx.createGain();
      voiceGain.gain.value = 1.2;
      voiceSource.connect(voiceGain);
      voiceGain.connect(ctx.destination);
      
      voiceNodeRef.current = voiceSource;

      // 2. Setup Background Music
      if (musicBufferRef.current) {
        const musicSource = ctx.createBufferSource();
        musicSource.buffer = musicBufferRef.current;
        musicSource.loop = true;
        
        const musicGain = ctx.createGain();
        musicGain.gain.value = 0.1; // Background level
        
        musicSource.connect(musicGain);
        musicGain.connect(ctx.destination);
        
        musicNodeRef.current = musicSource;
        musicGainNodeRef.current = musicGain;
        musicSource.start(0);
      }

      // 3. Handle End
      voiceSource.onended = () => {
        setIsPlaying(false);
        // Fade out music
        if (musicGainNodeRef.current) {
          musicGainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
          setTimeout(() => {
             if (musicNodeRef.current) musicNodeRef.current.stop();
          }, 1500);
        }
      };
      
      voiceSource.start(0);
      setIsPlaying(true);
    } catch (e) {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (voiceNodeRef.current) {
      try { voiceNodeRef.current.stop(); } catch (e) {}
      voiceNodeRef.current = null;
    }
    if (musicNodeRef.current) {
      try { musicNodeRef.current.stop(); } catch (e) {}
      musicNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(audioData);
    }
  };

  return (
    <section id="generator" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* CSS for Ken Burns Effect */}
      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.0) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, -1%); }
          100% { transform: scale(1.0) translate(0, 0); }
        }
        .animate-ken-burns {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <span className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                AI Commercial Simulator
              </span>
           </div>
           <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
             Experience Your Brand on TV <br/>
             <span className="text-brand-primary">In Real Time.</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             Enter your details below to generate a live TV spot preview, complete with voiceover, background music, and actionable QR branding.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Form Side */}
          <div className={`lg:col-span-5 transition-all duration-500 ${view === 'simulator' ? 'lg:opacity-50 blur-[1px] hover:blur-0 hover:opacity-100' : 'opacity-100'}`}>
            <form onSubmit={handleGenerate} className="space-y-5 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
               {isLoading && (
                 <div className="absolute inset-0 bg-brand-dark/90 z-20 flex flex-col items-center justify-center text-center p-6">
                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
                    <p className="text-xl font-bold text-white animate-pulse">{loadingStep}</p>
                 </div>
               )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Business Name</label>
                <input 
                  type="text" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Joe's Pizza"
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Business Type</label>
                <input 
                  type="text" 
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. Italian Restaurant"
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Core Offer</label>
                <input 
                  type="text" 
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="e.g. Free appetizer with large pizza"
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Additional Info (Optional)</label>
                <textarea 
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  placeholder="e.g. Family owned since 1985, located downtown..."
                  rows={2}
                  className="w-full px-5 py-4 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 mt-2 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,196,180,0.3)] hover:shadow-[0_0_30px_rgba(0,196,180,0.5)] transform hover:-translate-y-0.5"
              >
                <Wand2 className="w-5 h-5 mr-3" />
                Preview Commercial
              </button>
            </form>
          </div>

          {/* Simulator Side */}
          <div className="lg:col-span-7 relative flex justify-center perspective-1000">
             {view === 'form' ? (
                // Placeholder State
                <div className="w-full aspect-video bg-gray-800/50 rounded-3xl border border-gray-700 flex flex-col items-center justify-center text-gray-600 p-8 text-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   <Radio className="w-24 h-24 mb-6 opacity-20" />
                   <h3 className="text-2xl font-bold mb-2">Ready to Broadcast</h3>
                   <p className="max-w-xs">Fill out the brief to generate your custom TV spot instantly.</p>
                </div>
             ) : (
                // Active Simulator State
                <div className="w-full flex flex-col items-center gap-8 animate-fade-in-up">
                    <div className="relative w-full shadow-2xl">
                        {/* TV Bezel */}
                        <div className="relative bg-gray-900 rounded-[2rem] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-800 ring-1 ring-white/10">
                            
                            {/* Screen Content */}
                            <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex flex-col items-center justify-center border border-white/5 group">
                                
                                {/* Generated Background Image with Motion (Ken Burns) */}
                                {imageData ? (
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img 
                                            src={`data:image/jpeg;base64,${imageData}`} 
                                            alt="Commercial Background"
                                            className="w-full h-full object-cover opacity-60 filter blur-sm animate-ken-burns"
                                        />
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80" />
                                )}
                                
                                {/* Dark Overlay for readability */}
                                <div className="absolute inset-0 bg-black/30"></div>

                                {/* Main Content Layout */}
                                <div className="relative z-10 flex flex-row items-center justify-between w-full px-8 md:px-12 h-full gap-8">
                                    
                                    {/* Left Side: Text Offer */}
                                    <div className="flex-1 text-left space-y-4">
                                        <div className="inline-block bg-brand-primary text-brand-dark font-black px-3 py-1 text-xs uppercase tracking-widest rounded mb-2 shadow-lg">
                                            Limited Time Offer
                                        </div>
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                            {visualHeadline || offer}
                                        </h1>
                                        <p className="text-xl text-white font-bold tracking-wide drop-shadow-md">
                                            at {businessName}
                                        </p>
                                    </div>

                                    {/* Right Side: QR Code */}
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center">
                                        <div className="relative bg-white p-3 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 group-hover:scale-105">
                                            {/* Simulated QR Code (SVG) */}
                                            <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 text-black">
                                                <path fill="currentColor" d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M50,10 h10 v10 h-10 z M70,10 h20 v20 h-20 z M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M50,50 h10 v10 h-10 z M70,70 h10 v10 h-10 z M30,50 h10 v10 h-10 z M80,80 h10 v10 h-10 z M60,60 h10 v10 h-10 z" />
                                                <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                                                <rect x="65" y="45" width="10" height="10" fill="currentColor" />
                                                <rect x="45" y="65" width="10" height="10" fill="currentColor" />
                                                <rect x="80" y="50" width="10" height="10" fill="currentColor" />
                                            </svg>
                                            <div className="absolute -bottom-3 -right-3 bg-brand-primary text-brand-dark text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-white">
                                                SCAN ME
                                            </div>
                                        </div>
                                        <p className="mt-4 text-brand-primary font-black uppercase tracking-[0.2em] text-sm animate-pulse drop-shadow-md">
                                            Scan Now
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Bar / Playback Controls */}
                                <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md border-t border-white/10 p-4 flex items-center justify-between z-20">
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={togglePlayback}
                                            className="w-10 h-10 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                                        >
                                            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                                        </button>
                                        
                                        {/* Simulated Audio Visualizer */}
                                        <div className="flex space-x-1 h-6 items-end">
                                            {[...Array(10)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-1 bg-brand-primary rounded-t-sm transition-all duration-150 ${isPlaying ? 'animate-music-bar' : 'h-1 opacity-30'}`}
                                                    style={{ 
                                                        height: isPlaying ? `${Math.random() * 100}%` : '4px',
                                                        animationDelay: `${i * 0.05}s`
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
                                        <div className="flex items-center">
                                          <Music className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">MUSIC</span>
                                        </div>
                                        <div className="w-px h-3 bg-gray-600"></div>
                                        <div className="flex items-center">
                                          <Volume2 className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">AI VOICEOVER</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TV Brand Logo */}
                            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                               <div className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">Sony</div>
                            </div>
                        </div>

                        {/* Reflection/Shadow */}
                        <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/50 blur-xl rounded-[50%]"></div>
                    </div>

                    {/* NEW CTA BUTTON */}
                    <a 
                      href="https://tidycal.com/tv/amkhan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-10 py-5 bg-brand-primary text-brand-dark text-xl font-black rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(0,196,180,0.4)] hover:shadow-[0_0_50px_rgba(0,196,180,0.6)] transform hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center justify-center uppercase tracking-widest">
                        Book Your Call
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
                    </a>
                </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdScriptGenerator;