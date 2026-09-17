import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { AMLogo } from './icons/BrandIcons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/70 dark:bg-[#080b11] text-zinc-500 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] transition-colors duration-300">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <AMLogo className="text-xl" />
            <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">|</span>
            <span className="text-zinc-600 dark:text-zinc-400 hidden sm:inline">{personalInfo.role}</span>
          </div>

          {/* Center Copyright */}
          <div className="text-center text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          {/* Right Action: Crafted in India + Back to Top */}
          <div className="flex items-center gap-4">
            <span className="text-zinc-600 dark:text-zinc-400">
              Designed with <span className="text-purple-500 dark:text-purple-400">💜</span> in India
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Back to top"
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-xs cursor-pointer outline-none select-none touch-manipulation"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
