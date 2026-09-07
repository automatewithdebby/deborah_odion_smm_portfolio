import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Upload, CheckCircle2, ShieldCheck, Image as ImageIcon, Calendar } from 'lucide-react';

interface HeroProps {
  onViewWorkClick?: () => void;
  onWorkTogetherClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onViewWorkClick,
  onWorkTogetherClick,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem('portfolio_hero_photo') || null;
  });
  const [isHoveringUpload, setIsHoveringUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local photo selection so user can immediately view their photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          try {
            localStorage.setItem('portfolio_hero_photo', reader.result);
          } catch {
            // Storage quota warning fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringUpload(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          try {
            localStorage.setItem('portfolio_hero_photo', reader.result);
          } catch {
            // Storage quota fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    localStorage.removeItem('portfolio_hero_photo');
  };

  const specializations = [
    'Social Media Management',
    'Content Strategy',
    'Creative Content',
    'Brand Presence',
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 bg-[#17352D] text-[#F7F1E6] overflow-hidden flex items-center"
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#B08D3C] to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#B08D3C] to-transparent" />
        <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#B08D3C]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Professional Title Eyebrow */}
            <div
              id="hero-professional-title-badge"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#B08D3C]/40 bg-[#0F2922]/90 backdrop-blur-sm mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C] animate-pulse" />
              <span className="text-[#B08D3C] text-xs sm:text-sm uppercase tracking-[0.18em] font-medium font-sans">
                Social Media Manager &amp; Content Strategist
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-headline"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#F7F1E6] tracking-tight mb-7 font-normal"
            >
              Strategic Content.{' '}
              <span className="italic font-light text-[#E9DDC9]">
                Creative Storytelling.
              </span>{' '}
              <span className="text-[#B08D3C] block sm:inline">
                Stronger Social Presence.
              </span>
            </h1>

            {/* Positioning Statement */}
            <p
              id="hero-positioning-statement"
              className="font-sans text-base sm:text-lg text-[#E9DDC9]/90 leading-relaxed font-normal max-w-2xl mb-9 border-l-2 border-[#B08D3C]/40 pl-4 py-1"
            >
              I help brands build a strong and consistent online presence through
              strategic content planning, creative storytelling, and intentional
              social media management.
            </p>

            {/* Specialization Pills */}
            <div id="hero-specializations-list" className="flex flex-wrap gap-2.5 mb-10">
              {specializations.map((spec, index) => (
                <div
                  key={index}
                  id={`hero-spec-pill-${index}`}
                  className="flex items-center gap-1.5 text-xs text-[#E9DDC9] bg-[#0F2922] border border-[#B08D3C]/25 px-3 py-1.5 rounded-sm"
                >
                  <Sparkles className="w-3 h-3 text-[#B08D3C]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Primary CTA */}
              <button
                id="hero-primary-cta-button"
                type="button"
                onClick={onViewWorkClick}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#B08D3C] hover:bg-[#c49e46] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-sm"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0F2922]" />
              </button>

              {/* Calendly Booking CTA */}
              <a
                id="hero-calendly-cta-button"
                href="https://calendly.com/odiondebby95"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F2922] hover:bg-[#122e25] border border-[#B08D3C]/70 hover:border-[#B08D3C] text-[#F7F1E6] font-medium text-xs uppercase tracking-wider rounded-sm transition-all duration-200 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#B08D3C]" />
                <span>Book Call (Calendly)</span>
              </a>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta-button"
                type="button"
                onClick={onWorkTogetherClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#B08D3C]/35 hover:border-[#B08D3C] text-[#E9DDC9] hover:bg-[#0F2922]/60 font-medium text-xs uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer"
              >
                <span>Let’s Work Together</span>
              </button>
            </div>

            {/* Trust / Integrity Note */}
            <div className="mt-8 flex items-center gap-2 text-xs text-[#E9DDC9]/60">
              <ShieldCheck className="w-4 h-4 text-[#B08D3C]" />
              <span>Authentic Portfolio • Verified Strategy &amp; Actual Content Evidence</span>
            </div>

          </div>

          {/* Right Column: Editorial Photograph Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Decorative Luxury Gold Accent Corner Brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#B08D3C] z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#B08D3C] z-20 pointer-events-none" />

              {/* Editorial Frame Container */}
              <div
                id="hero-portrait-frame"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsHoveringUpload(true);
                }}
                onDragLeave={() => setIsHoveringUpload(false)}
                onDrop={handleDrop}
                className={`relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#0F2922] border ${
                  isHoveringUpload
                    ? 'border-[#B08D3C] ring-2 ring-[#B08D3C]/50'
                    : 'border-[#B08D3C]/40'
                } shadow-2xl flex flex-col items-center justify-center p-6 text-center transition-all`}
              >
                {photoUrl ? (
                  <>
                    <img
                      id="hero-professional-photograph"
                      src={photoUrl}
                      alt="Professional Portrait — Social Media Manager & Content Strategist"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2922]/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating photo caption and change button */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 bg-[#0F2922]/90 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[#B08D3C]/30 text-left">
                      <div>
                        <p className="text-xs font-medium text-[#F7F1E6]">Professional Portrait</p>
                        <p className="text-[10px] text-[#B08D3C]">Provided Photograph Active</p>
                      </div>
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="text-[11px] text-[#E9DDC9]/80 hover:text-[#B08D3C] underline transition-colors"
                      >
                        Change
                      </button>
                    </div>
                  </>
                ) : (
                  /* Editorial Upload / Placeholder Frame */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer border border-dashed border-[#B08D3C]/40 hover:border-[#B08D3C] rounded-sm p-8 transition-colors bg-[#17352D]/40 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="hero-photo-file-input"
                    />

                    <div className="w-16 h-16 rounded-full bg-[#0F2922] border border-[#B08D3C]/60 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <ImageIcon className="w-8 h-8 text-[#B08D3C]" />
                    </div>

                    <h3 className="font-serif text-lg text-[#F7F1E6] mb-1 font-medium">
                      Professional Photograph
                    </h3>
                    <p className="text-xs text-[#E9DDC9]/80 max-w-xs mb-4 leading-relaxed">
                      Click to select or drag &amp; drop your professional portrait photo here.
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#B08D3C]/20 border border-[#B08D3C]/50 text-[#B08D3C] text-xs font-medium">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Portrait Asset</span>
                    </div>

                    <p className="text-[11px] text-[#E9DDC9]/50 mt-4">
                      Preserves exact aspect ratio &amp; high resolution
                    </p>
                  </div>
                )}
              </div>

              {/* Sub-card badge: Strategic Focus */}
              <div
                id="hero-portrait-subcard"
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#0F2922] border border-[#B08D3C]/40 p-3.5 rounded-sm shadow-xl hidden sm:flex items-center gap-3 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-[#17352D] border border-[#B08D3C]/50 flex items-center justify-center text-[#B08D3C]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                    Core Specialization
                  </p>
                  <p className="text-xs text-[#F7F1E6] font-medium">
                    Content Strategy &amp; Social Growth
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
