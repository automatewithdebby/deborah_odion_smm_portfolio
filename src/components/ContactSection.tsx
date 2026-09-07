import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Check,
  Copy,
  MessageSquare,
  Send,
  X
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderGoals, setSenderGoals] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const emailAddress = 'odiondebby95@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/deborah-odion-3821232a4/';
  const calendlyUrl = 'https://calendly.com/odiondebby95';
  const githubUrl = 'https://github.com/mhizdebbyodion';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      window.location.href = `mailto:${emailAddress}?subject=Let's Work Together: ${encodeURIComponent(
        senderName || 'Brand Collaboration'
      )}&body=${encodeURIComponent(
        `Hi Deborah,\n\nI'm interested in working together.\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nBrand & Content Goals:\n${senderGoals}`
      )}`;
      setIsMessageModalOpen(false);
      setSentSuccess(false);
      setSenderName('');
      setSenderEmail('');
      setSenderGoals('');
    }, 800);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[#0F2922] text-[#F7F1E6] border-t border-[#B08D3C]/20 relative text-center"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#17352D] border border-[#B08D3C]/40 text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#B08D3C]" />
          <span>Get In Touch</span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F7F1E6] font-normal tracking-tight mb-6">
          Let’s Work Together
        </h2>

        {/* The Exact Copy Requested */}
        <div className="max-w-2xl mx-auto mb-10">
          <p className="font-serif text-2xl sm:text-3xl text-[#E9DDC9] font-light leading-snug mb-3">
            Ready to build a stronger social presence?
          </p>
          <p className="font-sans text-base sm:text-lg text-[#E9DDC9]/80 leading-relaxed">
            Let’s discuss your brand, content goals, and how I can help.
          </p>
        </div>

        {/* Primary CTA Button: [Let’s Work Together] */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${emailAddress}?subject=Let's%20Work%20Together%20-%20Brand%20%26%20Content%20Goals`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#B08D3C] hover:bg-[#c29d47] text-[#0F2922] font-semibold text-sm uppercase tracking-widest rounded-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Let’s Work Together</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>

          <button
            type="button"
            onClick={() => setIsMessageModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#17352D] hover:bg-[#20473d] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/40 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#B08D3C]" />
            <span>Send Direct Note</span>
          </button>
        </div>

        {/* Direct Pathways: Email, LinkedIn, and GitHub */}
        <div className="pt-10 border-t border-[#B08D3C]/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
          
          {/* Email Card */}
          <div className="p-5 rounded-sm bg-[#17352D] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F2922] text-[#B08D3C] flex items-center justify-center border border-[#B08D3C]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                  Email
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-[#E9DDC9]/60 hover:text-[#B08D3C] transition-colors p-1"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div>
              <a
                href={`mailto:${emailAddress}`}
                className="font-serif text-sm sm:text-base text-[#F7F1E6] hover:text-[#B08D3C] transition-colors break-all group-hover:underline"
              >
                {emailAddress}
              </a>
              <p className="text-[11px] text-[#E9DDC9]/60 mt-1">
                {copiedEmail ? 'Email address copied!' : 'Direct inquiries & requests'}
              </p>
            </div>
          </div>

          {/* LinkedIn Card */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-sm bg-[#17352D] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F2922] text-[#B08D3C] flex items-center justify-center border border-[#B08D3C]/40">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                  LinkedIn
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#B08D3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div>
              <span className="font-serif text-sm sm:text-base text-[#F7F1E6] group-hover:text-[#B08D3C] transition-colors block">
                Deborah Odion
              </span>
              <p className="text-[11px] text-[#E9DDC9]/60 mt-1">
                linkedin.com/in/deborah-odion
              </p>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-sm bg-[#17352D] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0F2922] text-[#B08D3C] flex items-center justify-center border border-[#B08D3C]/40">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                  GitHub
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#B08D3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div>
              <span className="font-serif text-sm sm:text-base text-[#F7F1E6] group-hover:text-[#B08D3C] transition-colors block">
                GitHub Profile
              </span>
              <p className="text-[11px] text-[#E9DDC9]/60 mt-1">
                github.com/mhizdebbyodion
              </p>
            </div>
          </a>

        </div>

        {/* Optional Calendly link */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[#E9DDC9]/70">
            Prefer a direct conversation?{' '}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B08D3C] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Schedule a 30-minute strategy call on Calendly</span>
              <ArrowUpRight className="w-3 h-3 inline" />
            </a>
          </p>
        </div>

      </div>

      {/* Quick Direct Note Modal */}
      {isMessageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2922]/80 backdrop-blur-sm flex items-center justify-center p-4 text-left"
          onClick={() => setIsMessageModalOpen(false)}
        >
          <div
            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] rounded-sm p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-4 right-4 text-[#E9DDC9]/70 hover:text-[#B08D3C] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let’s Work Together</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F7F1E6] mb-2">
              Start the Conversation
            </h3>
            <p className="text-xs text-[#E9DDC9]/80 mb-6">
              Share a few details about your brand and social media goals.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Brand &amp; Content Goals *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your platforms, target audience, and what you're looking to achieve..."
                  value={senderGoals}
                  onChange={(e) => setSenderGoals(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sentSuccess}
                  className="w-full py-3 px-4 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#c29d47] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {sentSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Opening Your Email Client...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send via Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
