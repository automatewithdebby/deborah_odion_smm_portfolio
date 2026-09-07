import React, { useState, useRef, useEffect } from 'react';
import karryLisleImg from '../assets/images/karry_lisle_strategy_1788734823398.jpg';
import setlinnImg from '../assets/images/setlinn_strategy_deck_1788734834735.jpg';
import iamwhoisayiamImg from '../assets/images/iamwhoisayiam_real_deck_1788736481767.jpg';
import {
  FileText,
  Target,
  Layers,
  Sparkles,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  Upload,
  ZoomIn,
  X,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export interface CaseStudy {
  id: string;
  clientType: string;
  projectTitle: string;
  timeline?: string;
  channel: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  qualitativeImpact: string[];
  proofImageUrl?: string;
  testimonialSnippet?: string;
}

const DEFAULT_AUTHENTIC_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-karry-lisle',
    clientType: 'Tally K Services • The Karry Lisle Ecosystem',
    projectTitle: 'Executive Content Strategy & Authority Framework',
    timeline: 'Strategic Framework & Positioning',
    channel: 'LinkedIn & Ecosystem Channels',
    challenge:
      'Position the Karry Lisle ecosystem as a trusted authority in AI transformation, systems thinking, and purpose-driven leadership while establishing an inbound content framework that generates qualified leads for consulting, digital products, and coaching programs.',
    solution:
      'Designed a strategic B2B content framework ("Innovate • Automate • Elevate"). Established executive thought leadership structures, high-conviction messaging pillars, and targeted content hooks to transition casual readers into high-ticket consulting and coaching clients.',
    deliverables: [
      'Strategic Content Framework Deck ("Innovate, Automate, Elevate")',
      'AI Transformation & Systems Thinking Thought Leadership Model',
      'Inbound Lead Generation & Conversion Funnel Architecture',
      'Multi-Tier Audience Positioning for Consulting & Coaching Programs',
    ],
    qualitativeImpact: [
      'Established high-authority brand positioning separating the ecosystem from generic consulting noise',
      'Unified narrative across AI systems, organizational leadership, and digital advisory offerings',
      'Systematic lead generation structure replacing uncoordinated publishing',
    ],
    proofImageUrl: karryLisleImg,
  },
  {
    id: 'cs-setlinn',
    clientType: 'Setlinn (Global Platform)',
    projectTitle: 'Social Media Strategy Research & Audience Growth Plan',
    timeline: 'Comprehensive Research & Strategy Plan',
    channel: 'Multi-Platform (Instagram, LinkedIn & Global Community)',
    challenge:
      'Formulate a distinct brand presence across fragmented social platforms, identifying platform-specific nuances, content fatigue traps, and engagement bottlenecks for an international tech and community audience.',
    solution:
      'Researched and authored a 10-slide comprehensive research-backed Social Media Strategy deck ("Platforms, Content, Engagement & Growth Plan" By Deborah Odion). Built audience personas, engagement mechanisms, and a multi-platform content distribution matrix tailored to Setlinn\'s brand mission.',
    deliverables: [
      '10-Slide Research-Backed Social Strategy Presentation Deck',
      'Core Content Pillars & Platform-Specific Publishing Matrix',
      'Audience Engagement & Global Community Onboarding Blueprint',
      'Visual Asset Hierarchy & Slide Deck Architecture',
    ],
    qualitativeImpact: [
      'Data-grounded roadmap eliminating posting ambiguity for international growth',
      'Clear strategic platform alignment matching content formats to user migration patterns',
      'High-retention presentation deck used for stakeholder alignment and team onboarding',
    ],
    proofImageUrl: setlinnImg,
  },
  {
    id: 'cs-iamwhoisayiam',
    clientType: '<I AM WHO I SAY I AM.GLOBAL>™',
    projectTitle: 'Operational Posting Strategy & Weekly Playbook',
    timeline: 'Operational Strategy & Execution Framework',
    channel: 'LinkedIn Company Page, Instagram & Targeted Groups',
    challenge:
      'Inconsistent publishing cadence, absence of structured distribution channels, and lack of operational workflows resulting in disjointed messaging and stagnant community reach.',
    solution:
      'Engineered a 9-slide operational posting strategy featuring a strict 5-day posting schedule (8:00 AM - 11:00 AM EST/UTC), 6 defined content pillars (Thought Leadership, Founder Story, Company News, Educational Value Frameworks, Vision & Promotion, Community Engagement), a 2-tier group distribution strategy, weekly follower targets, and operational production workflows.',
    deliverables: [
      '9-Slide Operational Strategy & Distribution Presentation Deck',
      '5-Day Weekly Logistics Framework (8:00 AM - 11:00 AM Cadence)',
      '6-Pillar Content Architecture & Weekly Content Mix Formula',
      'Two-Tier Distribution System (Company Page + Group Amplification)',
      'Weekly Targets (+30 LinkedIn, +20 IG, +15 X, +10 FB) & Operations',
    ],
    qualitativeImpact: [
      '100% posting schedule dependability across every business day',
      'High-engagement morning posting cadence maximizing organic reach',
      'Transparent operational division between asset creation, caption copy, and performance tracking',
    ],
    proofImageUrl: iamwhoisayiamImg,
  },
  {
    id: 'cs-1',
    clientType: 'Brand & Founder Social Strategy',
    projectTitle: 'Content Pillar Architecture & Weekly Consistency System',
    timeline: 'Monthly Management & Strategy',
    channel: 'Instagram & LinkedIn',
    challenge:
      'Inconsistent posting cadence, absence of structured content pillars, and lack of visual clarity, resulting in unpredictable audience engagement and stressful last-minute ideation.',
    solution:
      'Engineered a 5-pillar editorial framework (Educational, Business Storytelling, Quotes/Inspiration, Direct Offers, and Promotions). Established a weekly planning rhythm with structured carousels and brand-aligned visual assets.',
    deliverables: [
      'Weekly Content Planner with pillar distribution',
      'Educational carousel decks & graphic templates',
      'Hook-driven captions & call-to-action strategy',
      'Monthly performance review & posting consistency',
    ],
    qualitativeImpact: [
      'Established dependable, stress-free posting consistency with zero guesswork',
      'Clear visual hierarchy and unified brand voice across every feed asset',
      'Higher save and share rates driven by upfront educational carousels',
    ],
  },
];

export const CaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem('deborah_case_studies');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If saved items exist, ensure the new authentic case studies are included
          const hasKarry = parsed.some((p: CaseStudy) => p.id === 'cs-karry-lisle');
          if (hasKarry) {
            return parsed;
          }
          return [...DEFAULT_AUTHENTIC_CASE_STUDIES];
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_AUTHENTIC_CASE_STUDIES;
  });

  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudyId, setEditingStudyId] = useState<string | null>(null);

  // Form state
  const [formClientType, setFormClientType] = useState('');
  const [formProjectTitle, setFormProjectTitle] = useState('');
  const [formTimeline, setFormTimeline] = useState('');
  const [formChannel, setFormChannel] = useState('Instagram');
  const [formChallenge, setFormChallenge] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formDeliverables, setFormDeliverables] = useState('');
  const [formImpact, setFormImpact] = useState('');
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deborah_case_studies', JSON.stringify(caseStudies));
    } catch (e) {
      console.warn('LocalStorage limit reached', e);
    }
  }, [caseStudies]);

  const handleOpenAddModal = () => {
    setEditingStudyId(null);
    setFormClientType('Brand & Social Strategy');
    setFormProjectTitle('');
    setFormTimeline('Ongoing Management');
    setFormChannel('Instagram');
    setFormChallenge('');
    setFormSolution('');
    setFormDeliverables('');
    setFormImpact('');
    setFormImagePreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cs: CaseStudy) => {
    setEditingStudyId(cs.id);
    setFormClientType(cs.clientType);
    setFormProjectTitle(cs.projectTitle);
    setFormTimeline(cs.timeline || '');
    setFormChannel(cs.channel);
    setFormChallenge(cs.challenge);
    setFormSolution(cs.solution);
    setFormDeliverables(cs.deliverables.join('\n'));
    setFormImpact(cs.qualitativeImpact.join('\n'));
    setFormImagePreview(cs.proofImageUrl || null);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCaseStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProjectTitle.trim()) return;

    const delivArray = formDeliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const impactArray = formImpact
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    if (editingStudyId) {
      setCaseStudies((prev) =>
        prev.map((cs) =>
          cs.id === editingStudyId
            ? {
                ...cs,
                clientType: formClientType.trim() || 'Social Media Project',
                projectTitle: formProjectTitle.trim(),
                timeline: formTimeline.trim() || undefined,
                channel: formChannel.trim() || 'Instagram',
                challenge: formChallenge.trim(),
                solution: formSolution.trim(),
                deliverables: delivArray.length > 0 ? delivArray : ['Content Strategy', 'Design Execution'],
                qualitativeImpact: impactArray.length > 0 ? impactArray : ['Established brand consistency and scheduled delivery.'],
                proofImageUrl: formImagePreview || undefined,
              }
            : cs
        )
      );
    } else {
      const newStudy: CaseStudy = {
        id: `cs-${Date.now()}`,
        clientType: formClientType.trim() || 'Social Media Project',
        projectTitle: formProjectTitle.trim(),
        timeline: formTimeline.trim() || undefined,
        channel: formChannel.trim() || 'Instagram',
        challenge: formChallenge.trim(),
        solution: formSolution.trim(),
        deliverables: delivArray.length > 0 ? delivArray : ['Content Strategy', 'Design Execution'],
        qualitativeImpact: impactArray.length > 0 ? impactArray : ['Established brand consistency and scheduled delivery.'],
        proofImageUrl: formImagePreview || undefined,
      };
      setCaseStudies((prev) => [...prev, newStudy]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteCaseStudy = (id: string) => {
    setCaseStudies((prev) => prev.filter((cs) => cs.id !== id));
  };

  return (
    <section
      id="case-studies"
      className="py-24 lg:py-32 bg-[#0F2922] text-[#F7F1E6] border-t border-[#B08D3C]/20 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-[#B08D3C]/25 gap-6">
          <div className="text-left">
            <div
              id="case-studies-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] border border-[#B08D3C]/40 text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Section 06 • Strategic Case Studies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7F1E6] font-normal tracking-tight">
              Case Studies &amp; Problem-Solving
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#E9DDC9]/80 mt-2 max-w-2xl leading-relaxed">
              How strategic social media systems turn content fatigue into predictable brand visibility, community trust, and verified posting workflows.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B08D3C] hover:bg-[#c29d47] text-[#0F2922] font-semibold text-xs rounded-sm transition-colors shadow-md self-start lg:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add / Edit Case Study</span>
          </button>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12 mb-16">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              id={`case-study-card-${study.id}`}
              className="bg-[#17352D] border border-[#B08D3C]/35 rounded-sm p-6 sm:p-10 shadow-2xl transition-all duration-300 hover:border-[#B08D3C] text-left relative group"
            >
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 mb-6 border-b border-[#B08D3C]/20 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#0F2922] text-[#B08D3C] border border-[#B08D3C]/40 text-[10px] uppercase tracking-wider font-semibold">
                      {study.clientType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#17352D] text-[#E9DDC9] border border-[#E9DDC9]/20 text-[10px] uppercase tracking-wider">
                      {study.channel}
                    </span>
                    {study.timeline && (
                      <span className="text-[11px] text-[#E9DDC9]/60">
                        • {study.timeline}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F1E6]">
                    {study.projectTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(study)}
                    className="p-1.5 text-[#E9DDC9]/50 hover:text-[#B08D3C] rounded-sm transition-colors"
                    title="Edit case study"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCaseStudy(study.id)}
                    className="p-1.5 text-[#E9DDC9]/40 hover:text-red-400 rounded-sm transition-colors"
                    title="Delete case study"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Layout: 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Problem & Strategic Approach */}
                <div className="lg:col-span-7 space-y-6">
                  {/* The Challenge */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C]" />
                      The Strategic Challenge
                    </h4>
                    <p className="font-sans text-sm text-[#E9DDC9]/85 leading-relaxed bg-[#0F2922] p-4 rounded-sm border border-[#B08D3C]/20">
                      {study.challenge}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C]" />
                      The Strategic Framework &amp; Execution
                    </h4>
                    <p className="font-sans text-sm text-[#E9DDC9]/85 leading-relaxed bg-[#0F2922] p-4 rounded-sm border border-[#B08D3C]/20">
                      {study.solution}
                    </p>
                  </div>

                  {/* Deliverables Produced */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-2.5">
                      Key Deliverables &amp; Systems Implemented
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {study.deliverables.map((deliv, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-[#E9DDC9]/90 bg-[#17352D] border border-[#B08D3C]/25 p-2.5 rounded-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-[#B08D3C] flex-shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Qualitative Outcomes & Optional Screenshot */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Proof Screenshot if exists */}
                  {study.proofImageUrl ? (
                    <div
                      onClick={() => setActiveLightboxImage(study.proofImageUrl || null)}
                      className="cursor-pointer bg-[#0F2922] rounded-sm border border-[#B08D3C]/40 overflow-hidden relative group/img aspect-[16/10] flex items-center justify-center shadow-lg"
                    >
                      <img
                        src={study.proofImageUrl}
                        alt={study.projectTitle}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#0F2922]/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-[#17352D] text-[#F7F1E6] px-3 py-1.5 text-xs font-medium rounded-sm border border-[#B08D3C] inline-flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-[#B08D3C]" />
                          <span>Inspect Evidence</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleOpenEditModal(study)}
                      className="border border-dashed border-[#B08D3C]/40 bg-[#0F2922]/60 hover:bg-[#0F2922] p-6 rounded-sm text-center cursor-pointer transition-colors"
                    >
                      <ImageIcon className="w-8 h-8 text-[#B08D3C]/60 mx-auto mb-2" />
                      <p className="text-xs text-[#E9DDC9]/70 mb-2">
                        Attach proof screenshot or creative asset
                      </p>
                      <span className="text-[11px] text-[#B08D3C] underline">
                        + Upload case study image
                      </span>
                    </div>
                  )}

                  {/* Qualitative Impact & Results */}
                  <div className="bg-[#0F2922] border border-[#B08D3C]/30 p-5 rounded-sm">
                    <h4 className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Verified Strategic Outcomes</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {study.qualitativeImpact.map((impact, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-start gap-2.5 text-xs text-[#E9DDC9]/90 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C] flex-shrink-0 mt-1.5" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Authenticity Notice */}
        <div className="p-4 bg-[#17352D] border border-[#B08D3C]/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-md">
          <p className="text-xs text-[#E9DDC9]/80 flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B08D3C] flex-shrink-0" />
            <span>
              Real strategic outcomes only: Zero fabricated statistics, follower metrics, or synthetic logos.
            </span>
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="text-xs text-[#B08D3C] hover:underline whitespace-nowrap"
          >
            + Add client case study
          </button>
        </div>

      </div>

      {/* Lightbox for Proof Screenshot */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2922]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between pb-4 text-[#F7F1E6]">
            <span className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold">
              Case Study Verification Asset
            </span>
            <button
              type="button"
              onClick={() => setActiveLightboxImage(null)}
              className="p-2 rounded-full bg-[#17352D] hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div
            className="max-w-4xl max-h-[85vh] overflow-auto rounded-sm border border-[#B08D3C]/40 bg-[#FFFFFF] shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage}
              alt="Case Study Evidence"
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Add / Edit Case Study Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2922]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] rounded-sm p-6 sm:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#E9DDC9]/70 hover:text-[#B08D3C]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#F7F1E6] mb-1">
              {editingStudyId ? 'Edit Case Study' : 'Add Strategic Case Study'}
            </h3>
            <p className="text-xs text-[#E9DDC9]/70 mb-6">
              Detail your client problem, strategic approach, deliverables, and qualitative impact.
            </p>

            <form onSubmit={handleSaveCaseStudy} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Content Pillar Architecture & Consistency System"
                  value={formProjectTitle}
                  onChange={(e) => setFormProjectTitle(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                    Client / Niche Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & Brand Social Strategy"
                    value={formClientType}
                    onChange={(e) => setFormClientType(e.target.value)}
                    className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                    Channel / Platforms
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Instagram & LinkedIn"
                    value={formChannel}
                    onChange={(e) => setFormChannel(e.target.value)}
                    className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  The Challenge
                </label>
                <textarea
                  rows={3}
                  placeholder="What was the client struggling with? (e.g. Inconsistent posting, lack of clear pillars...)"
                  value={formChallenge}
                  onChange={(e) => setFormChallenge(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Deborah's Strategic Solution
                </label>
                <textarea
                  rows={3}
                  placeholder="How did you solve it? (e.g. Designed 5 pillars, built weekly planner, designed carousels...)"
                  value={formSolution}
                  onChange={(e) => setFormSolution(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Deliverables (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Weekly Content Planner with pillar distribution&#10;Educational carousel decks&#10;Hook-driven captions"
                  value={formDeliverables}
                  onChange={(e) => setFormDeliverables(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Qualitative Outcomes (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Stress-free scheduled delivery with zero guesswork&#10;Unified visual aesthetic across feeds&#10;Higher save and share rates from educational assets"
                  value={formImpact}
                  onChange={(e) => setFormImpact(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              {/* Screenshot upload */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Case Study Proof Screenshot (Optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-[#E9DDC9] file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#B08D3C] file:text-[#0F2922] hover:file:bg-[#c29d47]"
                />
                {formImagePreview && (
                  <div className="mt-2 p-2 bg-[#0F2922] rounded-sm border border-[#B08D3C]/30 text-center">
                    <img
                      src={formImagePreview}
                      alt="Preview"
                      className="max-h-32 object-contain mx-auto rounded-sm"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#c29d47] transition-colors"
                >
                  {editingStudyId ? 'Update Case Study' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
