import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/ui/Toast';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Resume } from './sections/Resume';
import { Connect } from './sections/Connect';
import { Contact } from './sections/Contact';

import { InteractiveBackground } from './components/ui/InteractiveBackground';

export default function App() {
  const { toggleTheme, isDark } = useTheme();
  const { toast, showToast, hideToast } = useToast(1000);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Drop active focus on touch and click so mobile Chrome never renders a focused object black box
  useEffect(() => {
    const handleClearFocus = (e) => {
      const interactive = e.target?.closest?.('a, button, [role="button"]');
      if (interactive && interactive.tagName !== 'INPUT' && interactive.tagName !== 'TEXTAREA') {
        interactive.blur?.();
      }
      if (
        document.activeElement &&
        document.activeElement !== document.body &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        document.activeElement.blur?.();
      }
    };

    window.addEventListener('touchend', handleClearFocus, { passive: true });
    window.addEventListener('click', handleClearFocus, { passive: true });

    return () => {
      window.removeEventListener('touchend', handleClearFocus);
      window.removeEventListener('click', handleClearFocus);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#080b11] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Initial Load Cyber Glow Horizon Beam */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-50 pointer-events-none animate-load-beam shadow-[0_0_10px_#22d3ee]"
      />

      {/* Interactive Micro Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Interactive Ambient & Fun Design Canvas Background */}
      <InteractiveBackground />

      {/* Top Navigation with Theme Toggle */}
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1 animate-page-enter">
        <Hero onShowToast={showToast} />
        <About onShowToast={showToast} />
        <Resume onShowToast={showToast} />
        <Connect />
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
