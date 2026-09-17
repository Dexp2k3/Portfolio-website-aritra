import React, { useState } from 'react';
import { ArrowDown, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { BehanceIcon, FacebookIcon, InstagramIcon } from '../components/icons/BrandIcons';
import aritraPortrait from '../assets/aritra-portrait.jpg';

const funGreetings = [
  "Welcome to my portfolio",
  "Designing intuitive UX",
  "Crafting visual systems",
  "Available for new roles",
];

export function Hero({ onShowToast }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [waving, setWaving] = useState(false);

  const scrollToResume = (e) => {
    e.preventDefault();
    document.querySelector('#resume')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNameClick = () => {
    setWaving(true);
    const nextIdx = (greetingIndex + 1) % funGreetings.length;
    setGreetingIndex(nextIdx);
    if (onShowToast) {
      onShowToast(funGreetings[greetingIndex], "info");
    }
    setTimeout(() => setWaving(false), 900);
  };

  return (
    <section id="home" className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-20 overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 2xl:gap-10 items-center">
          
          {/* LEFT COLUMN — INTRODUCTION */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status / Availability Badge */}
            <div
              onClick={() => onShowToast && onShowToast('Available for projects', 'success')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-mono mb-5 w-fit select-none shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              title="Click to learn more"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>{personalInfo.status}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-blue-500">✦</span>
            </div>

            {/* Eyebrow with interactive tracking */}
            <div className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase mb-3 select-none flex items-center gap-2">
              <span>{personalInfo.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-[4rem] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15] sm:leading-[1.1] 2xl:leading-[1.08]">
              {personalInfo.headlineGreeting}{' '}
              <span
                onClick={handleNameClick}
                className="cursor-pointer group inline-flex items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                title="Click to interact!"
              >
                <span className="underline decoration-blue-500/30 underline-offset-8 group-hover:decoration-blue-500 transition-all">
                  Aritra Mondal
                </span>
                <span className="text-blue-600 dark:text-blue-500">.</span>
                <span className={`inline-block text-2xl sm:text-4xl transition-transform duration-300 ${waving ? 'animate-wiggle' : 'group-hover:scale-125 group-hover:rotate-12'}`}>
                  👋
                </span>
              </span>
            </h1>

            {/* Sub-headline / Role */}
            <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl 2xl:text-[2rem] font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
              {personalInfo.role}
            </h2>

            {/* Short Supporting Description */}
            <p className="mt-4 text-sm sm:text-base md:text-lg 2xl:text-[1.15rem] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl 2xl:max-w-2xl">
              {personalInfo.supportingText}
            </p>

            {/* CTA Buttons with hover lift and micro-interaction */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href="#resume"
                onClick={scrollToResume}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 sm:active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 overflow-hidden text-center min-h-[46px] outline-none select-none touch-manipulation"
              >
                <span>View Resume</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <a
                href={personalInfo.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:border-blue-500/40 dark:hover:border-zinc-700 sm:active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 text-center min-h-[46px] overflow-hidden outline-none select-none touch-manipulation"
              >
                {/* Subtle Left-to-Right Light Reflection Shimmer */}
                <div aria-hidden="true" className="shimmer-sweep">
                  <div className="shimmer-beam animate-subtle-shimmer" />
                </div>

                <span className="relative z-10">View My Work</span>
                <ExternalLink className="relative z-10 w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2.5 gap-x-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <a
                href={personalInfo.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-white transition-all group hover:-translate-y-0.5 min-h-[38px] py-1 outline-none rounded-lg select-none touch-manipulation"
              >
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-blue-500/40 dark:group-hover:border-zinc-700 group-hover:scale-110 transition-all shadow-xs overflow-hidden">
                  <BehanceIcon className="w-3.5 h-3.5" />
                </div>
                <span>Behance</span>
              </a>

              <span className="text-zinc-300 dark:text-zinc-800 hidden sm:inline">·</span>

              <a
                href={personalInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-white transition-all group hover:-translate-y-0.5 min-h-[38px] py-1 outline-none rounded-lg select-none touch-manipulation"
              >
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-blue-500/40 dark:group-hover:border-zinc-700 group-hover:scale-110 transition-all shadow-xs overflow-hidden">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <span>Instagram</span>
              </a>

              <span className="text-zinc-300 dark:text-zinc-800 hidden sm:inline">·</span>

              <a
                href={personalInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-white transition-all group hover:-translate-y-0.5 min-h-[38px] py-1 outline-none rounded-lg select-none touch-manipulation"
              >
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-blue-500/40 dark:group-hover:border-zinc-700 group-hover:scale-110 transition-all shadow-xs overflow-hidden">
                  <FacebookIcon className="w-3.5 h-3.5" />
                </div>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — PORTRAIT WITH FLOATING BADGES */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
            
            {/* Interactive Floating Badge 1 (Top-Left of Portrait) - Visible on Mobile & Desktop */}
            <div className="flex absolute -top-4 -left-1 sm:-top-5 sm:left-0 z-20 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-lg text-[11px] sm:text-xs font-mono text-zinc-800 dark:text-zinc-200 animate-float select-none pointer-events-auto hover:scale-105 transition-transform cursor-default">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
              <span>Visual Storyteller</span>
            </div>

            {/* Portrait Frame with glowing RGB flowing stroke */}
            <div className="relative group max-w-[310px] sm:max-w-[360px] lg:max-w-[370px] xl:max-w-[390px] 2xl:max-w-[425px] w-full">
              {/* Outer Glowing RGB Border Shell (2.5px stroke width) */}
              <div className="relative p-[2.5px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]">
                {/* Smooth Continuous Flowing RGB Conic Gradient */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-[100%] animate-rgb-flow pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, #00d2ff 0%, #3b82f6 18%, #8b5cf6 36%, #ec4899 54%, #f43f5e 70%, #f59e0b 84%, #10b981 92%, #00d2ff 100%)',
                  }}
                />

                {/* Inner Image Container */}
                <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-zinc-950 dark:bg-zinc-950 transition-all duration-500">
                  <img
                    src={aritraPortrait}
                    alt="Aritra Mondal - Graphic & UI/UX Designer"
                    className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="eager"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Subtle Left-to-Right Light Reflection Shimmer */}
                  <div aria-hidden="true" className="shimmer-sweep pointer-events-none z-10">
                    <div className="shimmer-beam animate-subtle-shimmer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location marker below portrait */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-400 uppercase select-none">
              <span>BASED IN {personalInfo.locationDisplay}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
              <span>—</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
