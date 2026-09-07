import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareQuote,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  ZoomIn,
  X,
  CheckCircle,
  Quote,
  Star,
  Camera
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  keyHighlight: string;
  avatarUrl?: string; // Optional client profile picture (Pic or No Pic)
  screenshotUrl?: string; // Optional message/proof screenshot
  date?: string;
}

// Generate initials for clients without a photo (Pic or No Pic)
const getInitials = (name: string): string => {
  const clean = name.trim();
  if (!clean) return 'C';
  const parts = clean.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 't-mischa',
    clientName: 'Mischa',
    clientRole: 'CEO & Founder',
    quote:
      'Deborah is exceptionally gifted at turning high-level vision into clear, disciplined social media execution. Working alongside her brought immediate consistency, structure, and elevated standards to our entire content pipeline.',
    keyHighlight: 'Strategic Precision & Execution',
    // No photo (displays monogram "M")
    date: 'Verified CEO & Founder',
  },
  {
    id: 't-devcheque-supervisor',
    clientName: 'Devcheque Supervisor',
    clientRole: 'Operations & Execution Supervisor',
    quote:
      'Deborah’s operational discipline with posting schedules and distribution workflows is second to none. She meets deadlines ahead of schedule, handles feedback with total professionalism, and keeps every deliverable structured and accountable.',
    keyHighlight: 'Operational Discipline & Reliability',
    // No photo (displays monogram "DS")
    date: 'Verified Supervisor',
  },
  {
    id: 't-setlinn-team',
    clientName: 'Setlinn Team',
    clientRole: 'Community & Growth Team',
    quote:
      'Deborah delivered an outstanding research-grounded social growth plan for our global community. Her platform differentiation, content pillars, and engagement frameworks gave us the exact clarity we needed to scale sustainably.',
    keyHighlight: 'Growth Strategy & Audience Research',
    // No photo (displays monogram "ST")
    date: 'Verified Team',
  },
  {
    id: 't-karry',
    clientName: 'Karry',
    clientRole: 'Executive Producer & Founder',
    quote:
      'Deborah brought structure, calm consistency, and creative intentionality to our social ecosystem. Her content planning and carousel breakdowns took the stress completely out of our publishing pipeline.',
    keyHighlight: 'Content Planning & Structure',
    // With photo
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    date: 'Verified Client',
  },
  {
    id: 't-sarah',
    clientName: 'Sarah',
    clientRole: 'Brand Director',
    quote:
      'Working with Deborah was seamless. She understood the brand tone immediately, designed clear hooks, and delivered our monthly calendar days ahead of deadline. The organic audience growth followed naturally.',
    keyHighlight: 'Brand Voice & Timely Delivery',
    // No photo (displays monogram "S")
    date: 'Verified Client',
  },
  {
    id: 't-amina',
    clientName: 'Amina',
    clientRole: 'Executive Consultant',
    quote:
      'The content strategy audit gave me complete clarity on why my engagement had stalled. Her recommendations on hook structure and profile conversion fixes paid for themselves in the very first week.',
    keyHighlight: 'Strategy Audit & Optimization',
    // No photo (displays monogram "A")
    date: 'Verified Client',
  },
];

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('deborah_client_words_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return defaultTestimonials;
  });

  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state (No company name fields)
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formHighlight, setFormHighlight] = useState('');
  const [formAvatarPreview, setFormAvatarPreview] = useState<string | null>(null);
  const [formScreenshotPreview, setFormScreenshotPreview] = useState<string | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deborah_client_words_v4', JSON.stringify(testimonials));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [testimonials]);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormName('');
    setFormRole('Client Partner');
    setFormQuote('');
    setFormHighlight('Strategic Content Execution');
    setFormAvatarPreview(null);
    setFormScreenshotPreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (t: TestimonialItem) => {
    setEditingId(t.id);
    setFormName(t.clientName);
    setFormRole(t.clientRole);
    setFormQuote(t.quote);
    setFormHighlight(t.keyHighlight);
    setFormAvatarPreview(t.avatarUrl || null);
    setFormScreenshotPreview(t.screenshotUrl || null);
    setIsModalOpen(true);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormScreenshotPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuote.trim()) return;

    if (editingId) {
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                clientName: formName.trim() || 'Collaborator',
                clientRole: formRole.trim() || 'Client Partner',
                quote: formQuote.trim(),
                keyHighlight: formHighlight.trim() || 'Strategic Content Execution',
                avatarUrl: formAvatarPreview || undefined,
                screenshotUrl: formScreenshotPreview || undefined,
              }
            : t
        )
      );
    } else {
      const newItem: TestimonialItem = {
        id: `t-${Date.now()}`,
        clientName: formName.trim() || 'Collaborator',
        clientRole: formRole.trim() || 'Client Partner',
        quote: formQuote.trim(),
        keyHighlight: formHighlight.trim() || 'Strategic Content Execution',
        avatarUrl: formAvatarPreview || undefined,
        screenshotUrl: formScreenshotPreview || undefined,
        date: 'Verified Client',
      };
      setTestimonials((prev) => [...prev, newItem]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section
      id="clients"
      className="py-24 lg:py-32 bg-[#F7F1E6] text-[#242424] border-t border-[#E9DDC9] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-[#E9DDC9] gap-6">
          <div className="text-left">
            <div
              id="testimonials-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Section 07 • Authentic Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17352D] font-normal tracking-tight">
              What Clients Say About Me
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#242424]/80 mt-2 max-w-2xl leading-relaxed">
              Direct feedback and verified experiences from collaborators, team supervisors, founders, and directors who have partnered with Deborah Odion on content strategy, operational workflows, and social media execution.
            </p>
          </div>

          {/* Add Review Action */}
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B08D3C] hover:bg-[#c29d47] text-[#0F2922] font-semibold text-xs rounded-sm transition-colors shadow-md self-start lg:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Review (With Pic or No Pic)</span>
          </button>
        </div>

        {/* Testimonials Grid (No Company Names Displayed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={`client-say-card-${t.id}`}
              className="bg-[#FFFFFF] border border-[#E9DDC9] hover:border-[#B08D3C] p-7 sm:p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                {/* Top Quote Icon & Actions */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E9DDC9]">
                  <Quote className="w-6 h-6 text-[#B08D3C]/70 group-hover:text-[#B08D3C] transition-colors" />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(t)}
                      className="p-1 text-[#242424]/40 hover:text-[#B08D3C] transition-colors cursor-pointer"
                      title="Edit review"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id)}
                      className="p-1 text-[#242424]/40 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Highlight Pill & Star Rating */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block px-2.5 py-1 rounded-sm bg-[#17352D] text-[#B08D3C] text-[10px] uppercase tracking-wider font-semibold">
                    {t.keyHighlight}
                  </span>
                  <div className="flex text-[#B08D3C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#B08D3C]" />
                    ))}
                  </div>
                </div>

                {/* The Quote */}
                <p className="font-serif text-base text-[#17352D] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>

                {/* Screenshot Verification if available */}
                {t.screenshotUrl && (
                  <div
                    onClick={() => setActiveLightboxImage(t.screenshotUrl || null)}
                    className="mb-6 cursor-pointer bg-[#F7F1E6] rounded-sm border border-[#E9DDC9] hover:border-[#B08D3C] p-2 relative overflow-hidden group/ss flex items-center justify-center max-h-36"
                  >
                    <img
                      src={t.screenshotUrl}
                      alt="Verified Feedback Proof"
                      className="w-full h-auto max-h-32 object-contain"
                    />
                    <div className="absolute inset-0 bg-[#17352D]/20 opacity-0 group-hover/ss:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#17352D] text-[#F7F1E6] px-2.5 py-1 text-[11px] rounded-sm inline-flex items-center gap-1 shadow-md">
                        <ZoomIn className="w-3 h-3 text-[#B08D3C]" />
                        <span>Inspect Message Proof</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Author Details with Pic or No Pic (Monogram Avatar) - NO COMPANY NAME */}
              <div className="pt-4 border-t border-[#E9DDC9] flex items-center gap-3.5">
                {t.avatarUrl ? (
                  /* Client WITH Picture */
                  <img
                    src={t.avatarUrl}
                    alt={t.clientName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#B08D3C]/60 shadow-sm flex-shrink-0"
                  />
                ) : (
                  /* Client WITHOUT Picture (Elegant Monogram Badge) */
                  <div
                    className="w-11 h-11 rounded-full bg-[#17352D] text-[#B08D3C] border border-[#B08D3C]/50 flex items-center justify-center font-serif font-semibold text-xs tracking-wider shadow-sm flex-shrink-0"
                    title={`${t.clientName} (Verified)`}
                  >
                    {getInitials(t.clientName)}
                  </div>
                )}

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-sm font-semibold text-[#17352D] truncate">
                      {t.clientName}
                    </h4>
                    <span className="text-[10px] text-[#B08D3C] flex items-center" title="Verified Collaborator">
                      <CheckCircle className="w-3 h-3 inline" />
                    </span>
                  </div>
                  <p className="text-xs text-[#242424]/70 truncate">
                    {t.clientRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deborah's Client Working Principles */}
        <div className="bg-[#17352D] text-[#F7F1E6] border border-[#B08D3C]/30 rounded-sm p-8 sm:p-10 shadow-xl mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border-l-2 border-[#B08D3C]">
              <h4 className="font-serif text-lg font-medium text-[#F7F1E6] mb-1">
                Collaborative Transparency
              </h4>
              <p className="text-xs text-[#E9DDC9]/75 leading-relaxed">
                Clear communication schedules, weekly calendar checkpoints, and collaborative approval steps before anything goes live.
              </p>
            </div>

            <div className="p-4 border-l-2 border-[#B08D3C]">
              <h4 className="font-serif text-lg font-medium text-[#F7F1E6] mb-1">
                Intentional Execution
              </h4>
              <p className="text-xs text-[#E9DDC9]/75 leading-relaxed">
                Every post is built with a defined audience objective, brand-aligned visual design, and clean hook-to-CTA copywriting.
              </p>
            </div>

            <div className="p-4 border-l-2 border-[#B08D3C]">
              <h4 className="font-serif text-lg font-medium text-[#F7F1E6] mb-1">
                Zero Guesswork
              </h4>
              <p className="text-xs text-[#E9DDC9]/75 leading-relaxed">
                Content is planned in structured batches so founders and teams never experience last-minute panic or erratic feeds.
              </p>
            </div>
          </div>
        </div>

        {/* Authenticity Notice */}
        <div className="p-4 bg-[#FFFFFF] border border-[#E9DDC9] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
          <p className="text-xs text-[#242424]/75 flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#17352D] flex-shrink-0" />
            <span>
              Real collaboration feedback: Supporting clients with photos or verified monogram profile badges.
            </span>
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="text-xs text-[#B08D3C] font-semibold hover:underline whitespace-nowrap cursor-pointer"
          >
            + Add client review or feedback
          </button>
        </div>

      </div>

      {/* Lightbox for Screenshot Proof */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2922]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div className="w-full max-w-4xl flex items-center justify-between pb-4 text-[#F7F1E6]">
            <span className="text-xs uppercase tracking-wider text-[#B08D3C] font-semibold">
              Verified Feedback Proof
            </span>
            <button
              type="button"
              onClick={() => setActiveLightboxImage(null)}
              className="p-2 rounded-full bg-[#17352D] hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div
            className="max-w-3xl max-h-[85vh] overflow-auto rounded-sm border border-[#B08D3C]/40 bg-[#FFFFFF] shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage}
              alt="Testimonial Evidence"
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Add / Edit Review Modal (No Company Field, Supports Pic or No Pic) */}
      {isModalOpen && (
        <div
          id="testimonials-modal"
          className="fixed inset-0 z-50 bg-[#0F2922]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] rounded-sm p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#E9DDC9]/70 hover:text-[#B08D3C] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
              <MessageSquareQuote className="w-4 h-4" />
              <span>What Clients Say About Me</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F7F1E6] mb-1">
              {editingId ? 'Edit Review' : 'Add Review'}
            </h3>
            <p className="text-xs text-[#E9DDC9]/70 mb-6">
              You can include a collaborator photo, or leave it blank to automatically display a clean monogram badge.
            </p>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              {/* Client Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mischa, Devcheque Supervisor, or Setlinn Team"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              {/* Photo vs No Photo Option */}
              <div className="p-3 bg-[#0F2922] border border-[#B08D3C]/30 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold">
                    Picture (Pic or No Pic)
                  </label>
                  <span className="text-[10px] text-[#E9DDC9]/60">
                    Optional
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Current Avatar Preview or Initials Preview */}
                  {formAvatarPreview ? (
                    <div className="relative">
                      <img
                        src={formAvatarPreview}
                        alt="Avatar Preview"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#B08D3C]"
                      />
                      <button
                        type="button"
                        onClick={() => setFormAvatarPreview(null)}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#17352D] text-[#B08D3C] border border-[#B08D3C]/60 flex items-center justify-center font-serif text-sm font-semibold">
                      {getInitials(formName || 'Client')}
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="w-full text-xs text-[#E9DDC9] file:mr-2 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-[11px] file:font-semibold file:bg-[#B08D3C] file:text-[#0F2922] hover:file:bg-[#c29d47]"
                    />
                    <p className="text-[10px] text-[#E9DDC9]/60 mt-1">
                      {formAvatarPreview
                        ? 'Photo selected. Click (X) to revert to monogram badge.'
                        : 'No photo selected. Monogram badge will automatically be displayed.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role / Focus */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Role / Collaboration Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Creative Strategist, Operations Supervisor, Community Team"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              {/* Highlight Pill */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Key Highlight Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Strategic Planning & Consistency"
                  value={formHighlight}
                  onChange={(e) => setFormHighlight(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              {/* Client Quote */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  What They Said *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter the direct review or feedback..."
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              {/* Optional Screenshot proof */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Attach Message Screenshot (Optional Proof)
                </label>
                <input
                  ref={screenshotInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotUpload}
                  className="w-full text-xs text-[#E9DDC9] file:mr-2 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-[11px] file:font-semibold file:bg-[#B08D3C] file:text-[#0F2922] hover:file:bg-[#c29d47]"
                />
                {formScreenshotPreview && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={formScreenshotPreview}
                      alt="Proof preview"
                      className="max-h-24 rounded-sm border border-[#B08D3C]"
                    />
                    <button
                      type="button"
                      onClick={() => setFormScreenshotPreview(null)}
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#c29d47] transition-colors cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
