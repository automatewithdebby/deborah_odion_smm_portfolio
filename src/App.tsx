import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ServicesTools } from './components/ServicesTools';
import { WorkGallery } from './components/WorkGallery';
import { StrategyCalendar } from './components/StrategyCalendar';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { X, Linkedin, Mail, ArrowUpRight, Calendar, ShieldCheck, Github } from 'lucide-react';

export default function App() {
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    type: 'work' | 'contact' | 'nav';
  } | null>(null);

  const handleViewWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWorkTogether = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:odiondebby95@gmail.com?subject=Brand%20Collaboration';
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'about') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'services') {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'work') {
      const element = document.getElementById('work');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'strategy') {
      const element = document.getElementById('strategy');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'calendar') {
      const element = document.getElementById('calendar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'case-studies') {
      const element = document.getElementById('case-studies');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'clients' || sectionId === 'testimonials') {
      const element = document.getElementById('clients') || document.getElementById('testimonials');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (sectionId === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setModalContent({
        title: `${sectionId.toUpperCase().replace('-', ' ')} Section`,
        message: `Following your section-by-section building process, the ${sectionId.replace('-', ' ')} section will be implemented next with your approved information and verified assets.`,
        type: 'nav',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E6] text-[#242424] flex flex-col font-sans selection:bg-[#17352D] selection:text-[#F7F1E6]">
      {/* Sticky Navigation */}
      <Navbar onNavigate={handleNavClick} />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Section 01: Hero */}
        <Hero
          onViewWorkClick={handleViewWork}
          onWorkTogetherClick={handleWorkTogether}
        />

        {/* Section 02: About Deborah Odion */}
        <About onContactClick={handleWorkTogether} />

        {/* Section 03: Services & Tools */}
        <ServicesTools />

        {/* Section 04: Strategy & Real Content Calendar */}
        <StrategyCalendar />

        {/* Section 05: Work Gallery */}
        <WorkGallery />

        {/* Section 06: Strategic Case Studies */}
        <CaseStudies />

        {/* Section 07: What Clients Say About Me */}
        <Testimonials />

        {/* Section 08: Let’s Work Together (Contact) */}
        <ContactSection />
      </main>

      {/* Editorial Footer with Verified Contact Links */}
      <footer
        id="main-portfolio-footer"
        className="bg-[#0F2922] border-t border-[#B08D3C]/20 py-10 px-6 sm:px-8 text-[#E9DDC9]/80 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-serif font-semibold text-[#F7F1E6] text-base tracking-wide">
              Deborah Odion
            </span>
            <span className="text-[#B08D3C] text-xs">
              Social Media Manager &amp; Content Strategist
            </span>
            <p className="text-[11px] text-[#E9DDC9]/60 max-w-sm mt-1">
              Strategic content planning, creative storytelling, and intentional social media management.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              id="footer-calendly-link"
              href="https://calendly.com/odiondebby95"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#B08D3C] text-[#0F2922] font-semibold hover:bg-[#c29d47] transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0F2922]" />
              <span>Book Strategy Call</span>
              <ArrowUpRight className="w-3 h-3 text-[#0F2922]" />
            </a>

            <a
              id="footer-email-link"
              href="mailto:odiondebby95@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#17352D] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#B08D3C]" />
              <span>odiondebby95@gmail.com</span>
            </a>

            <a
              id="footer-linkedin-link"
              href="https://www.linkedin.com/in/deborah-odion-3821232a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#17352D] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#B08D3C]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#B08D3C]" />
            </a>

            <a
              id="footer-github-link"
              href="https://github.com/mhizdebbyodion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#17352D] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/30 hover:border-[#B08D3C] transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-[#B08D3C]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#B08D3C]" />
            </a>
          </div>

          <div className="text-[11px] text-[#E9DDC9]/50">
            © {new Date().getFullYear()} Deborah Odion. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Interactive Modal for Guidance */}
      {modalContent && (
        <div
          id="status-modal-overlay"
          className="fixed inset-0 z-50 bg-[#0F2922]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalContent(null)}
        >
          <div
            id="status-modal-card"
            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] rounded-sm p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="status-modal-close-button"
              type="button"
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-[#E9DDC9]/80 hover:text-[#B08D3C]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#0F2922] border border-[#B08D3C]/60 flex items-center justify-center mb-4 text-[#B08D3C]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl font-medium mb-2 text-[#F7F1E6]">
              {modalContent.title}
            </h4>
            <p className="text-sm text-[#E9DDC9]/90 leading-relaxed mb-6">
              {modalContent.message}
            </p>
            <button
              id="status-modal-acknowledge-button"
              type="button"
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 px-4 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#c29d47] transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
