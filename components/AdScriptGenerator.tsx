import React, { useState, useRef, useEffect } from 'react';
import { generateTvCommercial, searchBusinesses, BusinessCandidate } from '../services/geminiService';
import { generateQrCode } from '../services/qrService';
import { Wand2, Loader2, Play, Square, MapPin, Check, ShieldCheck, Phone, Tv, CreditCard, Minus, Plus, RefreshCw, X, Sparkles } from 'lucide-react';

const BACKGROUND_MUSIC_URL = 'https://cdn.pixabay.com/audio/2024/01/16/audio_e2b992254f.mp3';

const AdScriptGenerator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [businessCandidates, setBusinessCandidates] = useState<BusinessCandidate[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessCandidate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [offer, setOffer] = useState('');
  const [view, setView] = useState<'form' | 'simulator'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setInLoadingStep] = useState('');
  
  const [visualHeadline, setVisualHeadline] = useState('');
  const [audioData, setAudioData] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zipCount, setZipCount] = useState(1);
  const [isTrial, setIsTrial] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const musicNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const musicBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const response = await fetch(BACKGROUND_MUSIC_URL);
        const arrayBuffer = await response.arrayBuffer();
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const decoded = await ctx.decodeAudioData(arrayBuffer);
        musicBufferRef.current = decoded;
        ctx.close();
      } catch (err) { console.warn("Music fail", err); }
    };
    loadMusic();
    return () => stopAudio();
  }, []);

  useEffect(() => {
    if (!searchQuery || selectedBusiness || searchQuery.length < 3) {
      setBusinessCandidates([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const candidates = await searchBusinesses(searchQuery, cityQuery);
        setBusinessCandidates(candidates);
      } catch (e) { console.error(e); } finally { setIsSearching(false); }
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, cityQuery, selectedBusiness]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBusiness) return;
    
    setIsLoading(true);
    setInLoadingStep("Connecting Local Feed...");
    
    try {
      setInLoadingStep("Generating Visual Identity...");
      const result = await generateTvCommercial(selectedBusiness, offer, cityQuery);
      
      setInLoadingStep("Routing QR Navigation...");
      const qrUrl = await generateQrCode(selectedBusiness.mapsUri, '#000000', selectedBusiness.name);
      
      setVisualHeadline(result.visualHeadline);
      setAudioData(result.audioBase64);
      setImageData(result.imageBase64);
      setQrCodeUrl(qrUrl);
      
      setInLoadingStep("Final Broadcast Mastering...");
      setTimeout(() => {
        setView('simulator');
        playAudio(result.audioBase64);
      }, 1000);
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message || "Failed to generate preview. Try again."}`);
    } finally { 
      setIsLoading(false); 
    }
  };

  const decodeAudioData = async (b64: string, ctx: AudioContext) => {
    const bytes = new Uint8Array(atob(b64).split("").map(c => c.charCodeAt(0)));
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768.0;
    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);
    return buffer;
  };

  const playAudio = async (b64: string | null) => {
    if (!b64) return;
    stopAudio();
    try {
      if (!audioContextRef.current) audioContextRef.current = new AudioContext();
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      
      const vBuffer = await decodeAudioData(b64, ctx);
      const vSource = ctx.createBufferSource();
      vSource.buffer = vBuffer;
      vSource.connect(ctx.destination);
      voiceNodeRef.current = vSource;
      
      if (musicBufferRef.current) {
        const mSource = ctx.createBufferSource();
        mSource.buffer = musicBufferRef.current;
        mSource.loop = true;
        const mGain = ctx.createGain();
        mGain.gain.value = 0.05;
        mSource.connect(mGain).connect(ctx.destination);
        musicNodeRef.current = mSource;
        mSource.start(0);
      }
      
      vSource.start(0);
      setIsPlaying(true);
      vSource.onended = () => setIsPlaying(false);
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const stopAudio = () => {
    if (voiceNodeRef.current) {
      try { voiceNodeRef.current.stop(); } catch(e){}
      voiceNodeRef.current = null;
    }
    if (musicNodeRef.current) {
      try { musicNodeRef.current.stop(); } catch(e){}
      musicNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <section id="generator" className="py-12 md:py-24 bg-brand-surface relative overflow-hidden selection:bg-brand-primary">
      <style>{`
        @keyframes kenBurns { 
          0% { transform: scale(1); } 
          100% { transform: scale(1.1); } 
        }
        .animate-ken-burns { animation: kenBurns 45s ease-in-out infinite alternate; }
        .tv-frame-shadow { 
          box-shadow: 0 0 120px rgba(0,0,0,0.85), inset 0 0 100px rgba(0,0,0,0.9); 
        }
        .crt-scanlines {
          pointer-events: none;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
          background-size: 100% 3px, 3px 100%;
          z-index: 10;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-dark text-brand-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3 h-3" />
            <span>AI Local Fame Simulator</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-brand-dark mb-4 tracking-tighter uppercase underline decoration-brand-primary decoration-4 underline-offset-8">Preview Your TV Presence</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-light mt-4 px-4 text-sm md:text-base">We pay for your first 1,000 neighborhood spots. Enter your business details to launch your broadcast simulation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Controls */}
          <div className={`lg:col-span-5 order-2 lg:order-1 space-y-6 transition-all duration-500 ${view === 'simulator' ? 'hidden lg:block lg:opacity-20 pointer-events-none' : ''}`}>
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-gray-100 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Step 1: Link Neighborhood Listing</label>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" value={searchQuery} 
                      onChange={(e) => { setSearchQuery(e.target.value); setSelectedBusiness(null); }} 
                      placeholder="Business Name..."
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-sm"
                    />
                    {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-brand-primary" />}
                  </div>
                  <input 
                    type="text" value={cityQuery} 
                    onChange={(e) => setCityQuery(e.target.value)} 
                    placeholder="City" 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-center text-sm"
                  />
                </div>
                {businessCandidates.length > 0 && !selectedBusiness && (
                  <div className="bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-fade-in ring-4 ring-brand-primary/10 max-h-48 overflow-y-auto">
                    {businessCandidates.map((c, i) => (
                      <button key={i} onClick={() => { setSelectedBusiness(c); setSearchQuery(c.name); setBusinessCandidates([]); }} className="w-full text-left p-4 hover:bg-brand-primary/5 border-b last:border-0 transition-colors">
                        <p className="font-bold text-brand-dark uppercase tracking-tight text-xs">{c.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{c.address}</p>
                      </button>
                    ))}
                  </div>
                )}
                {selectedBusiness && (
                  <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Listing Sync'd</span>
                    </div>
                    <button onClick={() => setSelectedBusiness(null)} className="p-1 hover:bg-white rounded-full transition-colors"><X className="w-4 h-4 text-emerald-300" /></button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Step 2: Neighborhood Offer</label>
                <input 
                  type="text" value={offer} 
                  onChange={(e) => setOffer(e.target.value)} 
                  placeholder="e.g. 50% Off First Visit"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none font-medium text-sm"
                />
              </div>

              <button 
                onClick={handleGenerate} 
                disabled={isLoading || !selectedBusiness}
                className="w-full py-5 bg-brand-primary text-brand-dark font-black rounded-xl shadow-xl hover:shadow-brand-primary/20 transform hover:-translate-y-1 transition-all disabled:opacity-30 flex items-center justify-center text-lg uppercase tracking-tight"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Wand2 className="w-5 h-5 mr-3" />}
                {isLoading ? loadingStep : "Generate My TV Simulation"}
              </button>
            </div>
          </div>

          {/* TV Simulator Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            {isLoading && (
              <div className="absolute inset-0 z-[60] bg-white/95 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 md:p-12">
                <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-6" />
                <h3 className="text-xl md:text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">{loadingStep}</h3>
                <p className="text-gray-400 text-xs md:text-sm max-w-xs">Connecting to local broadcast servers. Generating neighborhood visual assets.</p>
              </div>
            )}

            {view === 'form' ? (
              <div className="w-full aspect-video bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] border-4 border-white shadow-2xl flex flex-col items-center justify-center text-gray-600 p-8 text-center overflow-hidden relative">
                <Tv className="w-12 h-12 md:w-20 md:h-20 mb-6 opacity-5 animate-pulse" />
                <h3 className="text-base md:text-xl font-black text-white opacity-10 uppercase tracking-tighter">Broadcast Stream Offline</h3>
                <p className="text-xs font-light mt-2 max-w-xs opacity-20">Link your verified business profile to activate the Local Fame simulator.</p>
                <div className="absolute inset-0 crt-scanlines opacity-10"></div>
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8 animate-fade-in-up">
                {/* TV SIMULATOR CONTAINER */}
                <div className="relative bg-black rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl tv-frame-shadow overflow-hidden group">
                  <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black">
                    {/* Background Visual */}
                    <div className="absolute inset-0">
                      {imageData ? (
                        <img 
                          src={`data:image/png;base64,${imageData}`} 
                          className="w-full h-full object-cover object-center opacity-85 animate-ken-burns" 
                          alt="TV Background" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                      <div className="absolute inset-0 crt-scanlines opacity-40"></div>
                    </div>

                    {/* OVERLAYS - REFINED FOR TRANSPARENCY & SPACING */}
                    <div className="absolute inset-0 p-[5%] md:p-[6%] flex flex-col justify-between z-[20] pointer-events-none">
                      {/* Top Bar Tags */}
                      <div className="flex justify-between items-start w-full mb-2 md:mb-12">
                        <div className="bg-red-600/20 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-sm text-[7px] md:text-[10px] font-black text-white flex items-center shadow-lg uppercase tracking-widest border border-white/10">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                          Local Feed Live
                        </div>
                        <div className="text-white/20 text-[6px] md:text-[9px] font-mono tracking-widest uppercase">
                          Saturation v4.1
                        </div>
                      </div>

                      {/* Center Content */}
                      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between w-full py-4 relative">
                        {/* Headline Box */}
                        <div className="bg-brand-primary/10 backdrop-blur-md text-white px-4 md:px-8 py-4 md:py-6 rounded-lg md:rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.3)] border md:border-2 border-white/10 max-w-[85%] md:max-w-[70%] text-left">
                          <h1 className="text-sm md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight m-0 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                            {visualHeadline}
                          </h1>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center absolute top-[-5%] sm:top-[0%] right-[0%] md:right-[2%]">
                          <div className="bg-white/40 backdrop-blur-sm p-1 md:p-1.5 rounded-lg md:rounded-2xl shadow-2xl ring-1 md:ring-2 ring-brand-primary/10 transition-transform duration-300 hover:scale-105">
                            {qrCodeUrl && <img src={qrCodeUrl} className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28" alt="Scan Map" />}
                          </div>
                          <p className="mt-1 md:mt-2 text-[5px] md:text-[8px] font-black text-brand-primary uppercase tracking-[0.2em] md:tracking-[0.3em] drop-shadow-md">Maps Scan</p>
                        </div>
                      </div>

                      {/* Bottom Info Bar - ALIGNED HIGHER UP FOR VISIBILITY */}
                      <div className="flex justify-start items-end w-full mt-2 md:mt-4 mb-4 md:mb-12">
                        <div className="bg-brand-dark/15 backdrop-blur-xl px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/5 shadow-2xl flex items-center w-full md:w-auto md:max-w-full">
                          <div className="bg-brand-primary/50 backdrop-blur-sm p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-5 shadow-xl shrink-0">
                            <Phone className="w-4 h-4 md:w-5 md:h-5 text-brand-dark fill-current" />
                          </div>
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-brand-primary text-[5px] md:text-[8px] font-black uppercase tracking-[0.3em] mb-1 leading-none drop-shadow">Response Line</span>
                            <span className="text-white text-base md:text-lg lg:text-xl font-black tracking-normal tabular-nums leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,1)] whitespace-nowrap overflow-hidden">
                              {selectedBusiness?.phoneNumber || '1-800-TV-LOCAL'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Media Controls Layer */}
                    <div className="absolute bottom-0 w-full p-3 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-[30]">
                      <button onClick={isPlaying ? stopAudio : () => playAudio(audioData)} className="p-2 md:p-3 bg-brand-primary rounded-full text-brand-dark shadow-xl hover:scale-110 active:scale-95 transition-all">
                        {isPlaying ? <Square className="w-3 h-3 md:w-4 md:h-4 fill-current" /> : <Play className="w-3 h-3 md:w-4 md:h-4 fill-current ml-0.5" />}
                      </button>
                      <div className="text-[7px] md:text-[10px] font-mono text-white/50 font-black uppercase tracking-[0.2em] px-2 truncate">
                        Neighborhood Simulation // Active Reach
                      </div>
                    </div>
                  </div>
                </div>

                {/* PACKAGE SELECTION BLOCK */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 space-y-8 relative">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-8">
                    <div className="text-center md:text-left">
                      <div className="inline-flex items-center space-x-1 text-emerald-600 font-black text-[9px] uppercase tracking-widest mb-1">
                        <Check className="w-3 h-3" />
                        <span>Optimized For Local Growth</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-brand-dark uppercase tracking-tight leading-none">Choose Your Reach</h3>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 p-2 md:p-3 rounded-2xl border">
                      <button onClick={() => zipCount > 1 && setZipCount(zipCount - 1)} className="p-3 hover:bg-white rounded-xl shadow-sm transition-all"><Minus className="w-4 h-4 text-gray-400" /></button>
                      <div className="px-4 md:px-6 text-center min-w-[70px]">
                        <span className="text-3xl md:text-4xl font-black text-brand-dark leading-none">{zipCount}</span>
                        <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Zips</span>
                      </div>
                      <button onClick={() => { setZipCount(zipCount + 1); setIsTrial(false); }} className="p-3 hover:bg-white rounded-xl shadow-sm transition-all"><Plus className="w-4 h-4 text-brand-primary" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => { setIsTrial(true); setZipCount(1); }}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative ${isTrial ? 'border-brand-primary bg-brand-primary/5 ring-4 md:ring-8 ring-brand-primary/5' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase text-brand-primary tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded">Trial Pack</span>
                        {isTrial && <Check className="w-4 h-4 text-brand-primary" />}
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-brand-dark mb-1">$0 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">30-Day Trial</span></div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">Risk-free trial. Reserve neighborhood inventory today. $0 charge until day 31.</p>
                    </div>
                    
                    <div 
                      onClick={() => setIsTrial(false)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all relative ${!isTrial ? 'border-brand-primary bg-brand-primary/5 ring-4 md:ring-8 ring-brand-primary/5' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Dominator Pack</span>
                        {!isTrial && <Check className="w-4 h-4 text-brand-primary" />}
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-brand-dark mb-1">${99 * zipCount} <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ Mo</span></div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">1,000 spots per zip every 30 days. Priority neighborhood placement & support.</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button onClick={() => setView('form')} className="flex-1 py-4 md:py-5 rounded-xl border-2 border-gray-100 font-black text-gray-400 hover:text-brand-dark transition-all flex items-center justify-center text-sm uppercase">
                      <RefreshCw className="w-4 h-4 mr-3" /> Restart
                    </button>
                    <button className="flex-[2] py-4 md:py-5 bg-brand-primary text-brand-dark font-black text-xl md:text-2xl rounded-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group overflow-hidden relative uppercase">
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <CreditCard className="w-6 h-6 mr-3" />
                      {isTrial ? "Claim Trial Credit" : `Launch ${zipCount} Zips`}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center items-center text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.4em] gap-4 md:gap-10 opacity-70 mt-4">
                    <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-2 text-brand-primary" /> Fail-Safe Policy</span>
                    <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-2 text-brand-primary" /> AI Mastering</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdScriptGenerator;