import React, { useState } from 'react';
import {
  Share2,
  Compass,
  Target,
  Calendar,
  Sparkles,
  PenTool,
  Video,
  Repeat,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  SlidersHorizontal,
  Check,
  Wrench
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
  enabledByDefault: boolean;
}

interface ToolItem {
  id: string;
  name: string;
  category: 'Design & Video' | 'Publishing & Workflow' | 'Analytics & Insights';
  purpose: string;
  enabledByDefault: boolean;
}

const ALL_SERVICES: ServiceItem[] = [
  {
    id: 'smm',
    title: 'Social Media Management',
    category: 'End-to-End Execution',
    description:
      'Day-to-day oversight and deliberate management of brand social channels to maintain active, professional, and consistent digital touchpoints.',
    deliverables: ['Channel Management', 'Feed Curation', 'Publishing Schedule', 'Profile Optimization'],
    icon: Share2,
    enabledByDefault: true,
  },
  {
    id: 'strategy',
    title: 'Social Media Strategy',
    category: 'High-Level Direction',
    description:
      'Developing data-informed social roadmaps tailored to your audience habits, competitive landscape, and brand positioning objectives.',
    deliverables: ['Audience Analysis', 'Channel Strategy', 'Growth Roadmaps', 'Platform Best Practices'],
    icon: Compass,
    enabledByDefault: true,
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    category: 'Brand Positioning',
    description:
      'Defining core content pillars, narrative themes, and messaging frameworks that align brand values with customer interests.',
    deliverables: ['Content Pillar Definition', 'Tone of Voice Guide', 'Messaging Architecture', 'Value Framing'],
    icon: Target,
    enabledByDefault: true,
  },
  {
    id: 'calendar',
    title: 'Content Planning & Calendar Development',
    category: 'Workflow & Organization',
    description:
      'Organizing structured monthly and weekly editorial calendars that ensure smooth workflows, early approvals, and zero posting gaps.',
    deliverables: ['Monthly Editorial Grid', 'Weekly Content Batches', 'Approval Workflows', 'Asset Management'],
    icon: Calendar,
    enabledByDefault: true,
  },
  {
    id: 'creation',
    title: 'Social Media Content Creation',
    category: 'Creative Production',
    description:
      'Designing visually compelling feed graphics, carousel decks, and branded social assets tailored specifically to each platform.',
    deliverables: ['Visual Social Assets', 'Multi-slide Carousels', 'Branded Feed Templates', 'Story Graphics'],
    icon: Sparkles,
    enabledByDefault: true,
  },
  {
    id: 'copywriting',
    title: 'Caption & Copywriting',
    category: 'Written Communication',
    description:
      'Writing intentional hooks, engaging captions, and clear calls-to-action that prompt audience conversation and save-worthy engagement.',
    deliverables: ['Attention-Grabbing Hooks', 'Brand Story Captions', 'Actionable CTAs', 'Strategic Hashtag Lists'],
    icon: PenTool,
    enabledByDefault: true,
  },
  {
    id: 'video',
    title: 'Reels & Short-Form Video Content',
    category: 'Video Storytelling',
    description:
      'Structuring dynamic short-form video concepts, sequencing, and pacing tailored for Instagram Reels, TikTok, and YouTube Shorts.',
    deliverables: ['Video Ideation & Outlines', 'On-Screen Copy & Captions', 'Pacing & Transition Notes', 'Audio Selection Guidance'],
    icon: Video,
    enabledByDefault: true,
  },
  {
    id: 'repurposing',
    title: 'Content Repurposing',
    category: 'Content Efficiency',
    description:
      'Extracting maximum value from single core ideas by translating one long-form topic into carousels, text graphics, reels, and stories.',
    deliverables: ['Multi-format Adaptation', 'Visual Summaries', 'Micro-content Extraction', 'Cross-channel Distribution'],
    icon: Repeat,
    enabledByDefault: true,
  },
  {
    id: 'community',
    title: 'Community Management',
    category: 'Audience Relations',
    description:
      'Cultivating authentic brand affinity through timely comment engagement, direct message communication, and proactive audience outreach.',
    deliverables: ['Comment Engagement', 'Direct Message Monitoring', 'Brand Voice Alignment', 'Audience Relationship Nurturing'],
    icon: MessageCircle,
    enabledByDefault: true,
  },
  {
    id: 'analytics',
    title: 'Social Media Analytics & Reporting',
    category: 'Performance Insights',
    description:
      'Tracking real qualitative and quantitative metrics to review what resonates, evaluate performance trends, and refine upcoming content.',
    deliverables: ['Monthly Performance Audits', 'Content Pillar Breakdown', 'Audience Behavior Trends', 'Iterative Strategy Adjustments'],
    icon: BarChart3,
    enabledByDefault: true,
  },
];

const ALL_TOOLS: ToolItem[] = [
  { id: 'canva', name: 'Canva', category: 'Design & Video', purpose: 'Visual assets & carousel layouts', enabledByDefault: true },
  { id: 'capcut', name: 'CapCut', category: 'Design & Video', purpose: 'Short-form reel & video editing', enabledByDefault: true },
  { id: 'adobe-express', name: 'Adobe Express', category: 'Design & Video', purpose: 'Branded creative design & templates', enabledByDefault: true },
  { id: 'meta-suite', name: 'Meta Business Suite', category: 'Publishing & Workflow', purpose: 'Scheduling & Instagram/Facebook management', enabledByDefault: true },
  { id: 'buffer', name: 'Buffer', category: 'Publishing & Workflow', purpose: 'Multi-platform queue & scheduling', enabledByDefault: true },
  { id: 'notion', name: 'Notion', category: 'Publishing & Workflow', purpose: 'Content calendar planning & idea repository', enabledByDefault: true },
  { id: 'trello', name: 'Trello', category: 'Publishing & Workflow', purpose: 'Production stage & pipeline tracking', enabledByDefault: true },
  { id: 'google-sheets', name: 'Google Sheets', category: 'Publishing & Workflow', purpose: 'Editorial grids & asset planning', enabledByDefault: true },
  { id: 'google-trends', name: 'Google Trends', category: 'Analytics & Insights', purpose: 'Search trend analysis & content topic demand research', enabledByDefault: true },
  { id: 'ig-insights', name: 'Instagram Insights', category: 'Analytics & Insights', purpose: 'Reach, engagement & follower behavior', enabledByDefault: true },
  { id: 'fb-insights', name: 'Facebook Insights', category: 'Analytics & Insights', purpose: 'Page audience demographic analysis', enabledByDefault: true },
  { id: 'linkedin-analytics', name: 'LinkedIn Analytics', category: 'Analytics & Insights', purpose: 'Professional audience reach & impressions', enabledByDefault: true },
  { id: 'tiktok-analytics', name: 'TikTok Analytics', category: 'Analytics & Insights', purpose: 'Video watch time & completion trends', enabledByDefault: true },
];

export const ServicesTools: React.FC = () => {
  // Service selection persistence
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('deborah_active_services');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ALL_SERVICES.map((s) => s.id);
  });

  // Tools selection persistence
  const [selectedTools, setSelectedTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('deborah_active_tools_v2') || localStorage.getItem('deborah_active_tools');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const knownIds = new Set(ALL_TOOLS.map((t) => t.id));
          const valid = parsed.filter((id) => knownIds.has(id));
          if (!valid.includes('google-trends')) {
            valid.push('google-trends');
          }
          return valid;
        }
      }
    } catch {
      // fallback
    }
    return ALL_TOOLS.map((t) => t.id);
  });

  const [isConfiguring, setIsConfiguring] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleService = (id: string) => {
    setSelectedServices((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('deborah_active_services', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleTool = (id: string) => {
    setSelectedTools((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('deborah_active_tools_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSelectAllServices = () => {
    const allIds = ALL_SERVICES.map((s) => s.id);
    setSelectedServices(allIds);
    localStorage.setItem('deborah_active_services', JSON.stringify(allIds));
  };

  const handleResetServices = () => {
    const defaults = ALL_SERVICES.filter((s) => s.enabledByDefault).map((s) => s.id);
    setSelectedServices(defaults);
    localStorage.setItem('deborah_active_services', JSON.stringify(defaults));
  };

  const displayedServices = ALL_SERVICES.filter((s) => selectedServices.includes(s.id));
  const displayedTools = ALL_TOOLS.filter((t) => selectedTools.includes(t.id));

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[#17352D] text-[#F7F1E6] relative overflow-hidden border-t border-[#B08D3C]/20"
    >
      {/* Editorial Decorative Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute left-12 right-12 top-0 bottom-0 border-x border-[#B08D3C]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-[#B08D3C]/25 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0F2922] border border-[#B08D3C]/40 text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <span>Section 03 • Offerings &amp; Expertise</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F1E6] font-normal tracking-tight">
              Services &amp; Content Solutions
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#E9DDC9]/80 mt-2 max-w-2xl">
              Strategic, platform-tailored social media services designed to establish consistency, engage audiences, and build lasting authority.
            </p>
          </div>

          {/* Verification / Customize Control */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsConfiguring(!isConfiguring)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#0F2922] hover:bg-[#0b1f1a] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/40 hover:border-[#B08D3C] text-xs font-medium tracking-wide transition-colors shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B08D3C]" />
              <span>{isConfiguring ? 'Close Customizer' : 'Filter / Verify Offerings'}</span>
            </button>
          </div>
        </div>

        {/* Live Configuration Drawer (Ensures strict verification) */}
        {isConfiguring && (
          <div className="mb-14 p-6 sm:p-8 bg-[#0F2922] border border-[#B08D3C]/60 rounded-sm shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#17352D] gap-4">
              <div>
                <h3 className="font-serif text-lg text-[#F7F1E6] font-medium">
                  Verified Services &amp; Tools Selector
                </h3>
                <p className="text-xs text-[#E9DDC9]/75 mt-0.5">
                  Click to check or uncheck items. Only services and tools you confirm will be shown to visitors.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllServices}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#17352D] hover:bg-[#20473d] text-[#F7F1E6] rounded-sm border border-[#B08D3C]/30"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleResetServices}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#17352D] hover:bg-[#20473d] text-[#E9DDC9]/70 rounded-sm border border-[#B08D3C]/30"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Toggle checkboxes for Services */}
            <div className="mt-5">
              <span className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold block mb-3">
                Select Active Services ({selectedServices.length}/{ALL_SERVICES.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {ALL_SERVICES.map((s) => {
                  const isChecked = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-xs rounded-sm border text-left transition-colors ${
                        isChecked
                          ? 'bg-[#17352D] border-[#B08D3C] text-[#F7F1E6]'
                          : 'bg-[#0F2922]/50 border-gray-800 text-gray-500 hover:text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? 'bg-[#B08D3C] border-[#B08D3C] text-[#0F2922]'
                            : 'border-gray-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="truncate">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle checkboxes for Tools */}
            <div className="mt-8 pt-6 border-t border-[#17352D]">
              <span className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold block mb-3">
                Select Active Tools ({selectedTools.length}/{ALL_TOOLS.length}):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {ALL_TOOLS.map((t) => {
                  const isChecked = selectedTools.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTool(t.id)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs rounded-sm border text-left transition-colors ${
                        isChecked
                          ? 'bg-[#17352D] border-[#B08D3C]/80 text-[#F7F1E6]'
                          : 'bg-[#0F2922]/50 border-gray-800 text-gray-500 hover:text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? 'bg-[#B08D3C] border-[#B08D3C] text-[#0F2922]'
                            : 'border-gray-600'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="truncate">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {displayedServices.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="bg-[#0F2922] border border-[#B08D3C]/30 hover:border-[#B08D3C] p-7 rounded-sm transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Category & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                      {service.category}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#17352D] border border-[#B08D3C]/40 flex items-center justify-center text-[#B08D3C] group-hover:bg-[#B08D3C] group-hover:text-[#0F2922] transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-normal text-[#F7F1E6] mb-3 group-hover:text-[#E9DDC9] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#E9DDC9]/80 leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                </div>

                {/* Key Deliverables List */}
                <div className="pt-4 border-t border-[#17352D]">
                  <span className="text-[10px] uppercase tracking-wider text-[#E9DDC9]/50 block mb-2.5">
                    Core Deliverables
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm bg-[#17352D] text-[#E9DDC9]/90 border border-[#B08D3C]/15"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#B08D3C]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Tools Section */}
        <div id="tools" className="pt-12 border-t border-[#B08D3C]/20">
          <div className="max-w-3xl mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#0F2922] border border-[#B08D3C]/40 text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>Verified Tech Stack</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7F1E6] font-normal tracking-tight">
              Tools &amp; Platforms
            </h3>
            <p className="text-xs sm:text-sm text-[#E9DDC9]/80 mt-1.5 leading-relaxed">
              Software platforms utilized for content production, publishing workflows, and audience analytics.
            </p>
          </div>

          {/* Tools Grid organized by Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedTools.map((tool) => (
              <div
                key={tool.id}
                id={`tool-card-${tool.id}`}
                className="bg-[#0F2922] border border-[#B08D3C]/30 hover:border-[#B08D3C] p-5 rounded-sm transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                      {tool.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C]" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#F7F1E6] group-hover:text-[#B08D3C] transition-colors">
                    {tool.name}
                  </h4>
                </div>
                <p className="text-xs text-[#E9DDC9]/75 mt-3 pt-3 border-t border-[#17352D] font-light">
                  {tool.purpose}
                </p>
              </div>
            ))}
          </div>

          {/* Authenticity notice */}
          <div className="mt-8 p-3 bg-[#0F2922]/60 border border-[#B08D3C]/15 rounded-sm text-center">
            <p className="text-[11px] text-[#E9DDC9]/70">
              Only tools and services verified by Deborah Odion are displayed. Use the <strong className="text-[#B08D3C]">Filter / Verify Offerings</strong> button to customize items anytime.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
