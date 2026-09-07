import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Sparkles,
  Layers,
  Users,
  LayoutGrid,
  CheckCircle,
  Linkedin,
  Mail,
  Edit3,
  Check,
  RotateCcw
} from 'lucide-react';

interface AboutProps {
  onContactClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const defaultBio =
    "I am Deborah Odion, a Social Media Manager and Content Strategist dedicated to helping brands build a strong, consistent, and intentional online presence. My approach combines strategic content planning with creative storytelling to transform social channels into active, engaged communities. Rather than relying on guesswork, I focus on audience-centered content structures, cohesive visual direction, and disciplined calendar organization that elevates brand presence across social platforms.";

  const [customBio, setCustomBio] = useState<string>(() => {
    return localStorage.getItem('deborah_portfolio_bio') || defaultBio;
  });
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [draftBio, setDraftBio] = useState(customBio);

  const handleSaveBio = () => {
    setCustomBio(draftBio);
    try {
      localStorage.setItem('deborah_portfolio_bio', draftBio);
    } catch {
      // Quota fallback
    }
    setIsEditingBio(false);
  };

  const handleResetBio = () => {
    setDraftBio(defaultBio);
    setCustomBio(defaultBio);
    localStorage.removeItem('deborah_portfolio_bio');
    setIsEditingBio(false);
  };

  const strategicFocusAreas = [
    {
      icon: Compass,
      title: 'Strategic Thinking',
      description:
        'Approaching social media with clear purpose, positioning each post to build brand authority and support overarching brand goals.',
    },
    {
      icon: Calendar,
      title: 'Content Planning & Organization',
      description:
        'Developing structured workflows and clear editorial calendars that eliminate last-minute scrambling and guarantee consistency.',
    },
    {
      icon: Sparkles,
      title: 'Creative Storytelling',
      description:
        'Crafting authentic visual and written narratives that capture attention, evoke emotion, and resonate deeply with target audiences.',
    },
    {
      icon: Layers,
      title: 'Brand Consistency',
      description:
        'Protecting brand integrity with unified visual aesthetics, coherent tonal style, and disciplined messaging across all social touchpoints.',
    },
    {
      icon: Users,
      title: 'Audience-Focused Content',
      description:
        'Creating content tailored around the real problems, questions, and aspirations of your community to foster genuine engagement.',
    },
    {
      icon: LayoutGrid,
      title: 'Platform-Specific Content',
      description:
        'Adapting content formats and storytelling nuances uniquely to Instagram, LinkedIn, TikTok, and Meta platforms.',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-[#F7F1E6] text-[#242424] overflow-hidden border-t border-[#E9DDC9]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div
            id="about-eyebrow-badge"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <span>About Deborah Odion</span>
          </div>

          <h2
            id="about-main-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17352D] font-normal tracking-tight leading-[1.15] mb-6"
          >
            Strategic Planning.{' '}
            <span className="italic font-light text-[#B08D3C]">
              Creative Storytelling.
            </span>{' '}
            Intentional Execution.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#242424]/80 leading-relaxed font-normal">
            As a <strong>Social Media Manager &amp; Content Strategist</strong>, I partner with brands to craft intentional content architectures that cultivate lasting digital presence and authentic audience relationships.
          </p>
        </div>

        {/* Two-Column Editorial Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20 items-start">
          
          {/* Main Bio Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E9DDC9] rounded-sm p-8 sm:p-10 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#E9DDC9]/80 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D3C] font-semibold">
                  Professional Bio
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#17352D] font-medium mt-0.5">
                  Deborah Odion
                </h3>
              </div>

              {/* Bio Edit Toggle to ensure 100% genuine control */}
              {!isEditingBio ? (
                <button
                  type="button"
                  onClick={() => {
                    setDraftBio(customBio);
                    setIsEditingBio(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#17352D] hover:text-[#B08D3C] border border-[#E9DDC9] hover:border-[#B08D3C] rounded-sm transition-colors"
                  title="Edit or customize bio text directly"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize Text</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetBio}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-red-700"
                    title="Reset to default"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveBio}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#17352D] text-[#F7F1E6] hover:bg-[#0F2922] text-xs font-medium rounded-sm"
                  >
                    <Check className="w-3.5 h-3.5 text-[#B08D3C]" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {/* Editable or Displayed Bio */}
            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  value={draftBio}
                  onChange={(e) => setDraftBio(e.target.value)}
                  rows={7}
                  className="w-full p-4 text-sm sm:text-base border border-[#B08D3C] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B08D3C] bg-[#F7F1E6]/40 leading-relaxed font-sans"
                  placeholder="Enter your exact personal background or bio narrative here..."
                />
                <p className="text-[11px] text-gray-500 italic">
                  Tip: Everything here is saved locally in your browser so your real words are preserved.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-sans text-base sm:text-lg text-[#242424]/85 leading-relaxed">
                <p>{customBio}</p>
              </div>
            )}

            {/* Clearly Marked Placeholder Box for Additional Milestones / Experience */}
            <div className="mt-8 p-4 bg-[#F7F1E6]/70 border border-dashed border-[#B08D3C]/60 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B08D3C] uppercase tracking-wider mb-1">
                <span>[Verified Experience Placeholder]</span>
              </div>
              <p className="text-xs text-[#242424]/75 leading-relaxed">
                As per strict portfolio verification rules, specific brand names, work milestones, or years of tenure will be introduced only as you provide verified details in subsequent sections.
              </p>
            </div>

            {/* Verified Direct Contact Links */}
            <div className="mt-8 pt-6 border-t border-[#E9DDC9] flex flex-wrap items-center gap-4">
              <a
                id="about-linkedin-link"
                href="https://www.linkedin.com/in/deborah-odion-3821232a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17352D] hover:bg-[#0F2922] text-[#F7F1E6] text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#B08D3C]" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                id="about-email-link"
                href="mailto:odiondebby95@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#17352D] hover:border-[#B08D3C] text-[#17352D] hover:text-[#B08D3C] text-xs font-medium tracking-wide rounded-sm transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>odiondebby95@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Strategic Pillars & Methodologies */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#17352D] text-[#F7F1E6] p-8 rounded-sm border border-[#B08D3C]/30 shadow-md">
              <span className="text-xs uppercase tracking-widest text-[#B08D3C] font-semibold">
                Strategic Philosophy
              </span>
              <h3 className="font-serif text-2xl text-[#F7F1E6] font-normal mt-1 mb-4">
                Strategy Precedes Content
              </h3>
              <p className="text-sm text-[#E9DDC9]/90 leading-relaxed mb-6">
                Social media is rarely about posting more; it is about posting with deliberate clarity. Every caption, carousel, reel, and story must serve a distinct purpose in your brand's digital ecosystem.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#B08D3C]/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#B08D3C] mt-0.5 shrink-0" />
                  <span className="text-xs text-[#E9DDC9]">
                    Audience-first messaging that answers genuine customer needs
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#B08D3C] mt-0.5 shrink-0" />
                  <span className="text-xs text-[#E9DDC9]">
                    Organized content calendars for proactive, stress-free execution
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#B08D3C] mt-0.5 shrink-0" />
                  <span className="text-xs text-[#E9DDC9]">
                    Cohesive visual identity and steady voice across all channels
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Status Tag */}
            <div className="p-6 bg-[#E9DDC9]/50 border border-[#E9DDC9] rounded-sm text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#17352D] block mb-1">
                Open to Opportunities
              </span>
              <p className="text-xs text-[#242424]/75 mb-4">
                Available for Social Media Management, Content Strategy consulting, and full editorial calendar management.
              </p>
              <button
                type="button"
                onClick={onContactClick}
                className="text-xs font-semibold uppercase tracking-wider text-[#17352D] hover:text-[#B08D3C] inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
              >
                <span>Let’s Work Together</span>
              </button>
            </div>
          </div>

        </div>

        {/* 6 Strategic Focus Pillars Grid */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E9DDC9]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B08D3C]">
                Core Competencies
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#17352D] font-normal mt-1">
                Areas of Strategic Focus
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#242424]/70 max-w-md mt-2 sm:mt-0">
              Disciplines that form the backbone of sustainable social media management and high-performing content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicFocusAreas.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  id={`about-focus-card-${idx}`}
                  className="bg-[#FFFFFF] border border-[#E9DDC9] hover:border-[#B08D3C] p-6 sm:p-7 rounded-sm transition-all duration-200 hover:shadow-md group text-left"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#17352D] text-[#B08D3C] flex items-center justify-center mb-4 group-hover:bg-[#0F2922] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#17352D] mb-2 group-hover:text-[#B08D3C] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#242424]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
