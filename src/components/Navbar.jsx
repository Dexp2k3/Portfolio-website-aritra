import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { personalInfo } from '../data/portfolioData';
import { AMLogo, BehanceIcon, InstagramIcon, FacebookIcon } from './icons/BrandIcons';

export function Navbar({ toggleTheme, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isManualNavigating = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const closeMenu = useCallback(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 180);
  }, [isOpen, isClosing]);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If user clicked a navigation option, lock the indicator until smooth scroll finishes
      if (isManualNavigating.current) {
        return;
      }

      // 1. If at or near the bottom of the page, always activate 'contact'
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // 2. If at the very top of the page, activate 'home'
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // 3. Reliable viewport detection via getBoundingClientRect
      const sections = [
        { id: 'contact', navKey: 'contact' },
        { id: 'connect', navKey: 'contact' },
        { id: 'resume', navKey: 'resume' },
        { id: 'about', navKey: 'about' },
        { id: 'home', navKey: 'home' },
      ];

      for (const { id, navKey } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active when occupying the upper-middle viewport zone
          if (rect.top <= 280 && rect.bottom >= 120) {
            setActiveSection(navKey);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (isOpen) {
      closeMenu();
    }
    const targetId = href.replace('#', '');
    
    // Immediately set active section and lock it to prevent glitching during smooth scroll
    setActiveSection(targetId);
    isManualNavigating.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isManualNavigating.current = false;
    }, 900);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close mobile menu on Escape key or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, closeMenu]);

  // Shared sliding indicator for desktop navbar
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current[activeSection];
      const navEl = navRef.current;
      if (activeEl && navEl) {
        const activeRect = activeEl.getBoundingClientRect();
        const navRect = navEl.getBoundingClientRect();
        const left = activeRect.left - navRect.left;
        const width = activeRect.width;
        // Inset padding for the line so it underlines the text cleanly
        setIndicatorStyle({
          left: left + 12,
          width: Math.max(0, width - 24),
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-zinc-50/85 dark:bg-[#080b11]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/60 shadow-sm dark:shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
        {/* Left: AM Monogram Logo & Nav links */}
        <div className="flex items-center gap-8 sm:gap-12">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group focus:outline-none transition-transform duration-300 ease-in-out active:scale-95"
            aria-label="Aritra Mondal Home"
          >
            <AMLogo className="text-2xl font-black transition-transform duration-300 ease-in-out group-hover:scale-105" />
          </a>

          {/* Desktop Navigation Links with Smooth Sliding Ease-In-Out Indicator */}
          <nav ref={navRef} className="relative hidden md:flex items-center gap-1.5 text-sm font-medium py-1">
            {navLinks.map((link) => {
              const linkKey = link.href.replace('#', '');
              const isActive = activeSection === linkKey;
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current[linkKey] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors duration-300 ease-in-out relative px-3.5 py-1.5 rounded-xl ${
                    isActive
                      ? 'text-zinc-950 dark:text-white font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}

            {/* Smooth Ease-In Ease-Out Sliding Underline */}
            <span
              className="absolute bottom-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_10px_#38bdf8] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition:
                  'left 0.38s cubic-bezier(0.25, 1, 0.5, 1), width 0.32s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-in-out',
              }}
            />
          </nav>
        </div>

        {/* Right: Social Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
          <a
            href={personalInfo.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance Profile"
            className="p-2.5 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 outline-none select-none touch-manipulation"
          >
            <BehanceIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="p-2.5 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 outline-none select-none touch-manipulation"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
            className="p-2.5 rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 outline-none select-none touch-manipulation"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 transition-colors duration-300 ease-in-out" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-in-out hover:scale-105 active:scale-90 shadow-sm cursor-pointer overflow-hidden"
          >
            <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
              <Sun
                className={`w-4 h-4 text-amber-400 absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-0 opacity-0'
                }`}
              />
              <Moon
                className={`w-4 h-4 text-zinc-700 dark:text-zinc-300 absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDark
                    ? '-rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile: Hamburger & Mobile Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 active:scale-90 transition-all duration-300 ease-in-out min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
              <Sun
                className={`w-4 h-4 text-amber-400 absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDark
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-0 opacity-0'
                }`}
              />
              <Moon
                className={`w-4 h-4 text-zinc-700 dark:text-zinc-300 absolute inset-0 transition-all duration-500 ease-in-out ${
                  isDark
                    ? '-rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
            </div>
          </button>

          {/* Ease-in Ease-out Animated Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white focus:outline-none active:scale-90 transition-all duration-300 ease-in-out min-w-[42px] min-h-[42px] flex items-center justify-center"
          >
            <AnimatedHamburger isOpen={isOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Ease-In & Ease-Out Animations */}
      {(isOpen || isClosing) && (
        <div
          className={`md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-[#080b11]/95 backdrop-blur-xl px-5 py-4 space-y-4 shadow-2xl ${
            isClosing ? 'animate-nav-drawer-out' : 'animate-nav-drawer-in'
          }`}
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-medium py-3 px-3.5 rounded-xl transition-all duration-200 ease-in-out flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-950 dark:hover:text-white active:scale-[0.98]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  )}
                </a>
              );
            })}
          </nav>
          
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-around text-zinc-600 dark:text-zinc-400 py-1">
            <a
              href={personalInfo.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all duration-200 ease-in-out outline-none select-none touch-manipulation"
              aria-label="Behance"
            >
              <BehanceIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all duration-200 ease-in-out outline-none select-none touch-manipulation"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-all duration-200 ease-in-out outline-none select-none touch-manipulation"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// 3-Bar Ease-In Ease-Out Animated Hamburger Icon Component
function AnimatedHamburger({ isOpen }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between items-center relative" aria-hidden="true">
      {/* Top Bar */}
      <span
        className={`w-5 h-[2px] rounded-full bg-current transform transition-all duration-300 ease-in-out origin-center ${
          isOpen ? 'rotate-45 translate-y-[7px]' : 'rotate-0 translate-y-0'
        }`}
      />
      {/* Middle Bar */}
      <span
        className={`w-5 h-[2px] rounded-full bg-current transition-all duration-200 ease-in-out ${
          isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
        }`}
      />
      {/* Bottom Bar */}
      <span
        className={`w-5 h-[2px] rounded-full bg-current transform transition-all duration-300 ease-in-out origin-center ${
          isOpen ? '-rotate-45 -translate-y-[7px]' : 'rotate-0 translate-y-0'
        }`}
      />
    </div>
  );
}
