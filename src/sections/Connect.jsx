import React from 'react';
import { ExternalLink } from 'lucide-react';
import { connectData } from '../data/portfolioData';
import { BehanceIcon, InstagramIcon, FacebookIcon } from '../components/icons/BrandIcons';
import { Card } from '../components/ui/Card';

const iconMap = {
  behance: BehanceIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

const badgeMap = {
  behance: 'Full Case Studies & Project Renders',
  instagram: 'Visual Experiments & Creative Work',
  facebook: 'Social Updates & Direct Connect',
};

export function Connect() {
  return (
    <section id="connect" className="scroll-mt-20 py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT COLUMN — SECTION TITLE & INTRO */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-4 select-none">
              <span className="text-zinc-400 dark:text-zinc-600 font-semibold">{connectData.sectionNumber}</span>
              <span>/</span>
              <span>{connectData.sectionTitle}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
              Social & Portfolio Channels
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
              {connectData.description}
            </p>
          </div>

          {/* RIGHT COLUMN — 3 INTERACTIVE SPOTLIGHT PLATFORM CARDS WITH SUBTLE SHIMMER */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {connectData.cards.map((card, idx) => {
              const BrandIcon = iconMap[card.type] || BehanceIcon;
              return (
                <a
                  key={idx}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group outline-none select-none touch-manipulation cursor-pointer"
                >
                  <Card
                    spotlight={true}
                    tilt={true}
                    shimmer={true}
                    className="p-5 flex items-center justify-between transition-all duration-300 hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:shadow-xl dark:hover:shadow-[0_12px_32px_-10px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-white group-hover:border-blue-300 dark:group-hover:border-zinc-600 group-hover:scale-105 transition-all duration-300">
                        <BrandIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {card.platform}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                            {badgeMap[card.type]}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {card.action}
                        </div>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
