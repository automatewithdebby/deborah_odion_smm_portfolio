import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: '#home' },
  { id: 'nav-about', label: 'About', href: '#about' },
  { id: 'nav-services', label: 'Services', href: '#services' },
  { id: 'nav-strategy', label: 'Strategy', href: '#strategy' },
  { id: 'nav-work', label: 'Work', href: '#work' },
  { id: 'nav-case-studies', label: 'Case Studies', href: '#case-studies' },
  { id: 'nav-clients', label: 'What Clients Say', href: '#clients' },
  { id: 'nav-contact', label: 'Let’s Work Together', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id.replace('nav-', ''));
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href.replace('#', ''));
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F2922]/95 backdrop-blur-md shadow-md border-b border-[#B08D3C]/20 py-3.5'
          : 'bg-[#17352D] border-b border-[#B08D3C]/15 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a
          id="brand-logo-link"
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home', 'nav-home')}
          className="group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-sm border border-[#B08D3C]/40 bg-[#0F2922] flex items-center justify-center transition-colors group-hover:border-[#B08D3C]">
            <span className="font-serif text-[#B08D3C] text-sm tracking-wider font-semibold">
              DO
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#F7F1E6] text-xs font-semibold uppercase tracking-[0.16em] font-sans">
              Deborah Odion
            </span>
            <span className="text-[#E9DDC9]/75 text-[11px] tracking-wider font-light">
              Social Media &amp; Content Strategist
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const itemKey = item.id.replace('nav-', '');
            const isActive = activeSection === itemKey;
            return (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href, item.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 relative whitespace-nowrap ${
                  isActive
                    ? 'text-[#B08D3C]'
                    : 'text-[#E9DDC9]/80 hover:text-[#F7F1E6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#B08D3C]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="nav-cta-calendly"
            href="https://calendly.com/odiondebby95"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F2922] bg-[#B08D3C] hover:bg-[#c29d47] transition-colors rounded-sm shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0F2922]" />
            <span>Book Call</span>
            <ArrowUpRight className="w-3 h-3 text-[#0F2922]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-button"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 text-[#F7F1E6] hover:text-[#B08D3C] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-[#F7F1E6]" />
          ) : (
            <Menu className="w-6 h-6 text-[#F7F1E6]" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0F2922] border-b border-[#B08D3C]/25 px-6 py-6 transition-all"
        >
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const itemKey = item.id.replace('nav-', '');
              const isActive = activeSection === itemKey;
              return (
                <a
                  key={`mobile-${item.id}`}
                  id={`mobile-${item.id}`}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href, item.id)}
                  className={`py-2 text-sm font-medium tracking-wide flex items-center justify-between border-b border-[#17352D] ${
                    isActive ? 'text-[#B08D3C]' : 'text-[#E9DDC9]/90 hover:text-[#F7F1E6]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C]" />}
                </a>
              );
            })}
            <div className="pt-3 space-y-2">
              <a
                id="mobile-nav-cta-calendly"
                href="https://calendly.com/odiondebby95"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#0F2922] bg-[#B08D3C] hover:bg-[#c29d47] transition-colors rounded-sm shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#0F2922]" />
                <span>Book Call on Calendly</span>
                <ArrowUpRight className="w-4 h-4 text-[#0F2922]" />
              </a>
              <a
                id="mobile-nav-cta-contact"
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact', 'nav-contact')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-medium uppercase tracking-wider text-[#E9DDC9] hover:text-[#F7F1E6] bg-[#17352D] hover:bg-[#1f4239] border border-[#B08D3C]/30 transition-colors rounded-sm"
              >
                <span>Direct Inquiry Form</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
