import React, { useState, useRef, useEffect } from 'react';
import {
  Target,
  Calendar,
  Layers,
  ZoomIn,
  X,
  Upload,
  Check,
  Edit3,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';

interface StrategyPillar {
  title: string;
  category: string;
  focus: string;
  description: string;
}

export interface CalendarScreenshot {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  dateAdded: string;
}

const formatCalendarTitle = (rawTitle: string, index: number): string => {
  const lower = rawTitle.toLowerCase().trim();
  if (
    lower.includes('screenshot') ||
    lower.includes('screen shot') ||
    lower.includes('img') ||
    lower.includes('image') ||
    lower.startsWith('cal-') ||
    lower === 'content calendar' ||
    lower === 'portfolio piece' ||
    lower === ''
  ) {
    if (index === 0) {
      return 'Monthly Social Media Editorial Calendar';
    } else if (index === 1) {
      return 'Weekly Content Batching & Publishing Schedule';
    } else {
      return `Content Strategy & Scheduling System (Part ${index + 1})`;
    }
  }
  return rawTitle;
};

const formatCalendarSubtitle = (rawSubtitle: string | undefined, index: number): string => {
  if (
    !rawSubtitle ||
    rawSubtitle === 'Verified Content Planning Sheet' ||
    rawSubtitle.toLowerCase().includes('screenshot')
  ) {
    if (index === 0) {
      return 'Content Pillar Framework • Multi-Platform Cadence • Publishing Plan';
    } else if (index === 1) {
      return 'Content Batching Grid • Visual Assets • Copywriting & Delivery';
    } else {
      return 'Verified Editorial Planning & Operations System';
    }
  }
  return rawSubtitle;
};

export const StrategyCalendar: React.FC = () => {
  // Calendar screenshots with local storage persistence and appropriate editorial wording
  const [screenshots, setScreenshots] = useState<CalendarScreenshot[]>(() => {
    try {
      const saved =
        localStorage.getItem('deborah_calendar_screenshots_list_v3') ||
        localStorage.getItem('deborah_calendar_screenshots_list_v2') ||
        localStorage.getItem('deborah_calendar_screenshots_list_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter(
              (p: CalendarScreenshot) =>
                p.id !== 'calendar-workflow-proof' &&
                p.title !== 'Daily Content Plan & Time-Blocked Operations Schedule'
            )
            .map((p: CalendarScreenshot, idx: number) => ({
              ...p,
              title: formatCalendarTitle(p.title, idx),
              subtitle: formatCalendarSubtitle(p.subtitle, idx),
            }));
        }
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('deborah_calendar_screenshots_list_v3', JSON.stringify(screenshots));
      localStorage.setItem('deborah_calendar_screenshots_list_v2', JSON.stringify(screenshots));
    } catch (e) {
      console.warn('LocalStorage limit reached or failed', e);
    }
  }, [screenshots]);

  // Strategy Pillars reflected directly from Deborah's planner
  const verifiedPillars: StrategyPillar[] = [
    {
      title: 'Educational Content',
      category: 'Authority & Value',
      focus: 'Monday • Wednesday • Saturday',
      description: 'Actionable tips, industry breakdowns, and problem-solving carousels that provide upfront value to the target audience.',
    },
    {
      title: 'About the Business',
      category: 'Brand Identity',
      focus: 'Tuesday',
      description: 'Behind-the-scenes insights, brand story, founder vision, and process transparency to build authentic credibility.',
    },
    {
      title: 'Quotes & Inspiration',
      category: 'Community Connection',
      focus: 'Thursday',
      description: 'Relatable industry perspectives, thought leadership quotes, and save-worthy reminders that drive shares and saves.',
    },
    {
      title: 'Direct Offers & Solutions',
      category: 'Conversion',
      focus: 'Friday',
      description: 'Clear value propositions, service spotlights, and structured calls-to-action that guide warm followers into inquiries.',
    },
    {
      title: 'Promotional Content',
      category: 'Growth & Campaigns',
      focus: 'Sunday',
      description: 'Special announcements, weekly recaps, client spotlights, and direct invitations to work together.',
    },
  ];

  // Strategy Framework methodology areas
  const strategyFramework = [
    {
      step: '01',
      title: 'Audience Understanding',
      detail: 'Analyzing follower demographics, peak activity periods, pain points, and content preferences before ideation begins.',
    },
    {
      step: '02',
      title: 'Content Pillar Architecture',
      detail: 'Establishing a balanced mix (Educational, Storytelling, Inspiration, and Conversion) so the feed never feels repetitive.',
    },
    {
      step: '03',
      title: 'Platform Strategy',
      detail: 'Aligning each creative asset with the unique native behavior of Instagram, LinkedIn, TikTok, and Meta feeds.',
    },
    {
      step: '04',
      title: 'Brand Voice & Consistency',
      detail: 'Developing a cohesive visual palette, typography standards, and signature copywriting tone across all posts.',
    },
    {
      step: '05',
      title: 'Content Calendar Planning',
      detail: 'Mapping out weekly and monthly schedules in advance to ensure continuous posting consistency with zero stress.',
    },
    {
      step: '06',
      title: 'Performance Review',
      detail: 'Reviewing qualitative feedback, comments, and analytics to refine subsequent content batches based on real data.',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const currentIndex = screenshots.length + index;
          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Content Calendar';
          const newScreenshot: CalendarScreenshot = {
            id: `cal-${Date.now()}-${index}`,
            title: formatCalendarTitle(rawName, currentIndex),
            subtitle: formatCalendarSubtitle('Verified Content Planning Sheet', currentIndex),
            url: reader.result,
            dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          };

          setScreenshots((prev) => [...prev, newScreenshot]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteScreenshot = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenshots((prev) => prev.filter((s) => s.id !== id));
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(null);
    }
  };

  const handleStartRename = (screenshot: CalendarScreenshot, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTitleId(screenshot.id);
    setTempTitle(screenshot.title);
  };

  const handleSaveRename = (id: string) => {
    if (tempTitle.trim()) {
      setScreenshots((prev) =>
        prev.map((s) => (s.id === id ? { ...s, title: tempTitle.trim() } : s))
      );
    }
    setEditingTitleId(null);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && activeLightboxIndex > 0) {
      setActiveLightboxIndex(activeLightboxIndex - 1);
    } else if (activeLightboxIndex === 0) {
      setActiveLightboxIndex(screenshots.length - 1);
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null && activeLightboxIndex < screenshots.length - 1) {
      setActiveLightboxIndex(activeLightboxIndex + 1);
    } else if (activeLightboxIndex === screenshots.length - 1) {
      setActiveLightboxIndex(0);
    }
  };

  return (
    <>
      {/* ============================================================
          SECTION: SOCIAL MEDIA STRATEGY
      ============================================================ */}
      <section
        id="strategy"
        className="py-24 lg:py-32 bg-[#F7F1E6] text-[#242424] border-t border-[#E9DDC9] relative"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 text-left">
            <div
              id="strategy-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Section 04 • Strategic Architecture</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17352D] font-normal tracking-tight leading-[1.15]">
              How I Approach Social Media Strategically
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#242424]/80 mt-3 max-w-2xl leading-relaxed">
              Sustainable social media growth requires a predictable system. Every post is guided by clear pillars, audience-focused intent, and structured calendar workflows.
            </p>
          </div>

          {/* Strategy Framework Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {strategyFramework.map((item, idx) => (
              <div
                key={idx}
                id={`strategy-step-${idx}`}
                className="bg-[#FFFFFF] border border-[#E9DDC9] hover:border-[#B08D3C] p-6 sm:p-7 rounded-sm transition-all duration-200 hover:shadow-md text-left group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-light text-[#B08D3C]">
                    {item.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#17352D] group-hover:bg-[#B08D3C] transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#17352D] mb-2 group-hover:text-[#B08D3C] transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#242424]/75 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Real Content Pillars Breakdown (Verified from Deborah's Planner) */}
          <div className="bg-[#17352D] text-[#F7F1E6] rounded-sm p-8 sm:p-12 border border-[#B08D3C]/30 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-8 border-b border-[#B08D3C]/20 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B08D3C] font-semibold">
                  Verified Content Pillars
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F1E6] font-normal mt-1">
                  Intentional Content Distribution
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#E9DDC9]/75 max-w-md">
                Reflected directly from Deborah Odion's weekly content planning model to ensure audience balance between education, brand connection, and direct inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {verifiedPillars.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-[#0F2922] border border-[#B08D3C]/30 p-5 rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B08D3C] font-semibold block mb-1">
                      {pillar.category}
                    </span>
                    <h4 className="font-serif text-base font-medium text-[#F7F1E6] mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#E9DDC9]/75 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#17352D] text-[11px] text-[#B08D3C] font-medium">
                    {pillar.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION: CONTENT CALENDAR SHOWCASE
          (Displays actual screenshot evidence with high-res zoom)
      ============================================================ */}
      <section
        id="calendar"
        className="py-24 lg:py-32 bg-[#0F2922] text-[#F7F1E6] border-t border-[#B08D3C]/20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-[#B08D3C]/25 gap-6">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] border border-[#B08D3C]/40 text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Verified Work Evidence</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F1E6] font-normal tracking-tight">
                Content Calendar &amp; Planning System
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#E9DDC9]/80 mt-2 max-w-2xl leading-relaxed">
                Authentic editorial calendars and planning workflows created by Deborah Odion. Click any screenshot to inspect the full uncropped high-resolution view.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="calendar-screenshot-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B08D3C] hover:bg-[#c29d47] text-[#0F2922] font-semibold text-xs rounded-sm transition-all shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Upload Calendar Screenshot</span>
              </button>

              {screenshots.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(0)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17352D] hover:bg-[#20473d] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/40 text-xs font-medium rounded-sm transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#B08D3C]" />
                  <span>View Full Screen</span>
                </button>
              )}
            </div>
          </div>

          {/* SCREENSHOT SHOWCASE */}
          {screenshots.length > 0 ? (
            <div className="space-y-8 mb-12">
              {screenshots.map((ss, idx) => (
                <div
                  key={ss.id}
                  id={`calendar-display-card-${idx}`}
                  className="bg-[#17352D] border border-[#B08D3C]/40 rounded-sm overflow-hidden shadow-2xl transition-all duration-200 group"
                >
                  {/* Top Bar for Card */}
                  <div className="p-4 sm:p-5 bg-[#0F2922] border-b border-[#B08D3C]/30 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {editingTitleId === ss.id ? (
                        <div className="flex items-center gap-2 max-w-md">
                          <input
                            type="text"
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] px-2 py-1 text-xs rounded-sm w-full focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(ss.id)}
                            className="p-1 text-[#B08D3C] hover:text-[#F7F1E6]"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#F7F1E6] truncate">
                            {ss.title}
                          </h3>
                          <button
                            type="button"
                            onClick={(e) => handleStartRename(ss, e)}
                            className="text-[#E9DDC9]/50 hover:text-[#B08D3C] p-0.5"
                            title="Rename title"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-[#E9DDC9]/60 mt-0.5">
                        {ss.subtitle || 'Verified Content Planning Sheet'} • Added {ss.dateAdded}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveLightboxIndex(idx)}
                        className="px-3 py-1.5 text-xs bg-[#17352D] hover:bg-[#20473d] text-[#B08D3C] hover:text-[#F7F1E6] border border-[#B08D3C]/40 rounded-sm inline-flex items-center gap-1.5 transition-colors"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Expand Full Size</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteScreenshot(ss.id, e)}
                        className="p-1.5 text-[#E9DDC9]/40 hover:text-red-400 rounded-sm hover:bg-[#17352D] transition-colors"
                        title="Remove screenshot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Screenshot Image Container */}
                  <div
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="cursor-pointer bg-[#F7F1E6] p-3 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-[300px] max-h-[620px]"
                  >
                    <img
                      src={ss.url}
                      alt={ss.title}
                      className="w-full h-auto object-contain max-h-[580px] rounded-sm shadow-md group-hover:scale-[1.01] transition-transform duration-300"
                    />

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-[#0F2922]/0 group-hover:bg-[#0F2922]/20 transition-colors flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#0F2922]/90 text-[#B08D3C] px-4 py-2 rounded-sm text-xs font-medium border border-[#B08D3C]/40 shadow-xl inline-flex items-center gap-2 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                        <span>Click to Expand in Full Resolution</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State: Prompt to Upload */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#B08D3C]/40 hover:border-[#B08D3C] bg-[#17352D]/40 hover:bg-[#17352D]/60 rounded-sm p-12 sm:p-16 text-center cursor-pointer transition-all duration-200 mb-12 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#17352D] border border-[#B08D3C]/40 flex items-center justify-center text-[#B08D3C] mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F7F1E6] mb-2">
                Upload Deborah Odion's Content Calendar Screenshot
              </h3>
              <p className="text-sm text-[#E9DDC9]/75 max-w-md mx-auto mb-6">
                Click here or use the button above to upload your content calendar screenshot. It will be showcased in full high-resolution with zero blur or distortion.
              </p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm shadow-md">
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Select Screenshot File</span>
              </span>
            </div>
          )}

          {/* Verification Badge & Note */}
          <div className="p-4 bg-[#17352D]/60 border border-[#B08D3C]/20 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs text-[#E9DDC9]/75 flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B08D3C] flex-shrink-0" />
              <span>
                Real content planning evidence strictly preserved. Original resolution, dates, and pillar distributions shown exactly as structured.
              </span>
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-[#B08D3C] hover:underline whitespace-nowrap"
            >
              {screenshots.length > 0 ? '+ Upload another screenshot' : 'Upload screenshot →'}
            </button>
          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal for Pristine High-Resolution Inspection */}
      {activeLightboxIndex !== null && screenshots[activeLightboxIndex] && (
        <div
          id="calendar-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#0F2922]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div className="w-full max-w-6xl flex items-center justify-between pb-4 text-[#F7F1E6]">
            <div>
              <h4 className="font-serif text-lg text-[#F7F1E6]">
                {screenshots[activeLightboxIndex].title}
              </h4>
              <p className="text-xs text-[#B08D3C]">
                Image {activeLightboxIndex + 1} of {screenshots.length} • Exact resolution &amp; 100% uncropped aspect ratio
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-[#17352D] hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative max-w-6xl w-full flex items-center justify-center">
            {/* Previous Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handlePrevLightbox}
                className="absolute left-2 z-10 p-2.5 rounded-full bg-[#17352D]/90 hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors border border-[#B08D3C]/30"
                title="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image display */}
            <div
              className="max-w-6xl max-h-[85vh] overflow-auto rounded-sm border border-[#B08D3C]/40 bg-[#FFFFFF] shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[activeLightboxIndex].url}
                alt={screenshots[activeLightboxIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>

            {/* Next Button */}
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-2 z-10 p-2.5 rounded-full bg-[#17352D]/90 hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors border border-[#B08D3C]/30"
                title="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
