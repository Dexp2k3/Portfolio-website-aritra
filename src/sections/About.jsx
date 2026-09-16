import React, { useState } from 'react';
import { PenTool, Layers, Monitor, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { aboutData } from '../data/portfolioData';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import {
  FigmaIcon,
  PhotoshopIcon,
  IllustratorIcon,
  CanvaIcon,
  BehanceIcon,
  ChatGPTIcon,
  GeminiIcon,
  FireflyIcon,
  ClaudeIcon,
  MidjourneyIcon,
  LeonardoIcon,
  CanvaAiIcon,
} from '../components/icons/BrandIcons';

const disciplineIcons = {
  pen: PenTool,
  layers: Layers,
  monitor: Monitor,
  shapes: Sparkles,
};

const toolInsights = {
  Figma: 'Interactive Prototypes, Atomic Design Systems & UI User Flows',
  Photoshop: 'Key Visual Compositing, Advanced Photo Retouching & Color Grading',
  Illustrator: 'Vector Precision, Custom Logotypes, Brand Geometry & Iconography',
  Canva: 'Rapid Social Visuals, Velocity Campaign Content & Presentation Decks',
};

const aiToolInsights = {
  ChatGPT: 'UX Copywriting, Creative Ideation, User Persona Building & Design Briefs',
  Gemini: 'Multimodal Design Research, Strategy Synthesis, Visual Analysis & Ideation',
  'Adobe Firefly': 'Generative Fill, Generative Recolor, Asset Expansion & In-Context Mockups',
  Claude: 'Design System Architecture, Heuristic UX Audits, Logic & Microcopy Strategy',
  Midjourney: 'High-Fidelity Visual Concepts, Creative Moodboards, Lighting & Texture Art',
  'Leonardo AI': 'Consistent Stylized Assets, Game Art Exploration & Production Visuals',
  'Canva AI': 'Magic Studio Expansion, Fast Background Manipulation & Social Variants',
};

const aiToolConfig = {
  ChatGPT: {
    icon: ChatGPTIcon,
    activeClass: 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500/60 text-emerald-700 dark:text-emerald-300 scale-105 shadow-sm',
  },
  Gemini: {
    icon: GeminiIcon,
    activeClass: 'bg-blue-50 dark:bg-blue-500/20 border-blue-500/60 text-blue-700 dark:text-blue-300 scale-105 shadow-sm',
  },
  'Adobe Firefly': {
    icon: FireflyIcon,
    activeClass: 'bg-orange-50 dark:bg-orange-500/20 border-orange-500/60 text-orange-700 dark:text-orange-300 scale-105 shadow-sm',
  },
  Claude: {
    icon: ClaudeIcon,
    activeClass: 'bg-amber-50 dark:bg-amber-500/20 border-amber-500/60 text-amber-700 dark:text-amber-300 scale-105 shadow-sm',
  },
  Midjourney: {
    icon: MidjourneyIcon,
    activeClass: 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-500/60 text-indigo-700 dark:text-indigo-300 scale-105 shadow-sm',
  },
  'Leonardo AI': {
    icon: LeonardoIcon,
    activeClass: 'bg-purple-50 dark:bg-purple-500/20 border-purple-500/60 text-purple-700 dark:text-purple-300 scale-105 shadow-sm',
  },
  'Canva AI': {
    icon: CanvaAiIcon,
    activeClass: 'bg-teal-50 dark:bg-teal-500/20 border-teal-500/60 text-teal-700 dark:text-teal-300 scale-105 shadow-sm',
  },
};

function BehanceEmbedFrame({ project }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-inner flex items-center justify-center min-h-[320px] sm:min-h-[460px] md:min-h-[500px]">
      {/* Instant Skeleton Loader (Appears immediately at frame 0 with zero blank flicker) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-900/95 via-zinc-950/98 to-zinc-950 text-center select-none animate-fadeIn">
          {/* Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Icon Badge with Spinner Ring */}
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
              <BehanceIcon className="w-7 h-7" />
            </div>
            <div className="absolute -inset-1.5 rounded-[22px] border-2 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" />
          </div>

          {/* Title & Live Status */}
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {project.title} <span className="text-zinc-400 font-normal">{project.sub}</span>
          </h4>
          <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping inline-block" />
            <span>Loading Behance Interactive Showcase...</span>
          </div>
        </div>
      )}

      {/* Embedded Responsive Iframe with eager loading and zero-delay opacity reveal */}
      <iframe
        key={project.embedUrl}
        src={project.embedUrl}
        height="316"
        width="404"
        allowFullScreen
        loading="eager"
        frameBorder="0"
        allow="clipboard-write; fullscreen; web-share"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-forms"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-[320px] sm:h-[460px] md:h-[500px] border-0 rounded-xl transition-opacity duration-300 relative z-10 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        title={`${project.title} ${project.sub} Project`}
      />
    </div>
  );
}

export function About({ onShowToast }) {
  const [activeTool, setActiveTool] = useState('Figma');
  const [activeAiTool, setActiveAiTool] = useState('ChatGPT');
  const [activeEmbedProject, setActiveEmbedProject] = useState(null);

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);
    if (onShowToast) {
      onShowToast(`🎨 ${toolName}: ${toolInsights[toolName]}`, 'info');
    }
  };

  const handleAiToolClick = (toolName) => {
    setActiveAiTool(toolName);
    if (onShowToast) {
      onShowToast(`✨ ${toolName}: ${aiToolInsights[toolName]}`, 'info');
    }
  };

  const handleDisciplineClick = (item) => {
    if (item.hasEmbed) {
      setActiveEmbedProject(item);
      if (onShowToast) {
        onShowToast(`🚀 Opening ${item.title} ${item.sub} Case Study...`, 'info');
      }
    }
  };

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN — BIO & MOTTO */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              {/* Section Tag */}
              <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase mb-6 select-none">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 font-bold">
                  {aboutData.sectionNumber}
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-700/80 font-bold tracking-wider shadow-sm">
                  {aboutData.sectionTitle}
                </span>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-5 text-zinc-800 dark:text-zinc-200 text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  I’m <span className="text-zinc-950 dark:text-white font-bold">Aritra Mondal</span>, a{' '}
                  <span className="text-zinc-950 dark:text-white font-bold">Graphic & UI/UX designer</span> who enjoys turning ideas into{' '}
                  <span className="text-zinc-950 dark:text-white font-bold">clear, thoughtful, and visually engaging experiences</span>.
                </p>
                <p>
                  I believe good design is more than just how something looks — it’s about{' '}
                  <span className="text-zinc-950 dark:text-white font-bold">understanding the problem</span>, finding the right direction, and creating something that feels{' '}
                  <span className="text-zinc-950 dark:text-white font-bold">simple, purposeful, and easy to connect with</span>.
                </p>
              </div>
            </div>

            {/* Slogan / Motto with subtle hover shine */}
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900 select-none group cursor-default">
              <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm mb-1 transition-transform group-hover:translate-x-1 duration-200">—</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white uppercase leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {aboutData.motto[0]}
                <br />
                <span className="text-zinc-500 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                  {aboutData.motto[1]}
                </span>
              </h3>
            </div>
          </div>

          {/* RIGHT COLUMN — DISCIPLINES & TOOLS */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* 4 Design Disciplines with 3D Tilt & Cursor Spotlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {aboutData.disciplines.map((item, idx) => {
                const IconComponent = disciplineIcons[item.icon] || PenTool;
                return (
                  <Card
                    key={idx}
                    spotlight={true}
                    tilt={true}
                    onClick={() => handleDisciplineClick(item)}
                    className={`p-4.5 sm:p-5 flex flex-col justify-between min-h-[140px] sm:min-h-[150px] transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                      item.hasEmbed
                        ? 'hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:shadow-xl dark:hover:shadow-[0_12px_32px_-10px_rgba(59,130,246,0.2)] hover:-translate-y-1 group/card'
                        : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover/card:text-blue-600 dark:group-hover/card:text-white group-hover/card:border-blue-300 dark:group-hover/card:border-blue-500/40 group-hover/card:scale-105 transition-all duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Featured Project Trigger Tag & Direct External Icon */}
                      {item.hasEmbed && (
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-500/30 group-hover/card:scale-105 transition-all duration-200">
                            <span>Case Study</span>
                          </span>

                          <a
                            href={item.behanceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Open directly on Behance"
                            aria-label={`Open ${item.title} case study on Behance`}
                            className="min-w-[32px] min-h-[32px] flex items-center justify-center p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-snug group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors flex items-center justify-between">
                        <span>{item.title}</span>
                        {item.hasEmbed && (
                          <span className="text-[11px] font-mono font-medium text-blue-600 dark:text-blue-400 opacity-90 sm:opacity-0 sm:group-hover/card:opacity-100 sm:translate-x-[-3px] sm:group-hover/card:translate-x-0 transition-all duration-200">
                            View ↗
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Tools I Use with Live Studio Insight Drawer */}
            <Card spotlight={true} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase select-none">
                  TOOLS I USE
                </span>
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  Tap to preview workflow
                </span>
              </div>

              {/* Tool Pill Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Figma */}
                <button
                  type="button"
                  onClick={() => handleToolClick('Figma')}
                  onMouseEnter={() => setActiveTool('Figma')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeTool === 'Figma'
                      ? 'bg-blue-50 dark:bg-blue-500/20 border-blue-500/60 text-blue-700 dark:text-blue-300 scale-105 shadow-sm'
                      : 'bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <FigmaIcon className="w-3.5 h-3.5" />
                  <span>Figma</span>
                </button>

                {/* Photoshop */}
                <button
                  type="button"
                  onClick={() => handleToolClick('Photoshop')}
                  onMouseEnter={() => setActiveTool('Photoshop')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeTool === 'Photoshop'
                      ? 'bg-cyan-50 dark:bg-cyan-500/20 border-cyan-500/60 text-cyan-700 dark:text-cyan-300 scale-105 shadow-sm'
                      : 'bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <PhotoshopIcon className="w-5 h-5 rounded-md text-[10px]" />
                  <span>Photoshop</span>
                </button>

                {/* Illustrator */}
                <button
                  type="button"
                  onClick={() => handleToolClick('Illustrator')}
                  onMouseEnter={() => setActiveTool('Illustrator')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeTool === 'Illustrator'
                      ? 'bg-amber-50 dark:bg-amber-500/20 border-amber-500/60 text-amber-700 dark:text-amber-300 scale-105 shadow-sm'
                      : 'bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <IllustratorIcon className="w-5 h-5 rounded-md text-[10px]" />
                  <span>Illustrator</span>
                </button>

                {/* Canva */}
                <button
                  type="button"
                  onClick={() => handleToolClick('Canva')}
                  onMouseEnter={() => setActiveTool('Canva')}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeTool === 'Canva'
                      ? 'bg-teal-50 dark:bg-teal-500/20 border-teal-500/60 text-teal-700 dark:text-teal-300 scale-105 shadow-sm'
                      : 'bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <CanvaIcon className="w-5 h-5 rounded-md text-[10px]" />
                  <span>Canva</span>
                </button>
              </div>

              {/* Live Interactive Insight Box */}
              {activeTool && (
                <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 animate-fadeIn transition-all">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white mr-1.5">{activeTool}:</strong>
                    <span>{toolInsights[activeTool]}</span>
                  </div>
                </div>
              )}
            </Card>

            {/* AI Tools I Use with Live Studio Insight Drawer */}
            <Card spotlight={true} className="p-6 border-purple-500/20 dark:border-purple-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase select-none">
                    AI TOOLS I USE
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Workflow</span>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                  Tap to preview workflow
                </span>
              </div>

              {/* AI Tool Pill Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {aboutData.aiTools.map((tool) => {
                  const config = aiToolConfig[tool.name];
                  const IconComponent = config?.icon || Sparkles;
                  const isActive = activeAiTool === tool.name;

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleAiToolClick(tool.name)}
                      onMouseEnter={() => setActiveAiTool(tool.name)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95 ${
                        isActive
                          ? config?.activeClass || 'bg-purple-50 dark:bg-purple-500/20 border-purple-500/60 text-purple-700 dark:text-purple-300 scale-105 shadow-sm'
                          : 'bg-zinc-100/70 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Interactive Insight Box */}
              {activeAiTool && (
                <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 animate-fadeIn transition-all">
                  <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white mr-1.5">{activeAiTool}:</strong>
                    <span>{aiToolInsights[activeAiTool]}</span>
                  </div>
                </div>
              )}
            </Card>

          </div>

        </div>
      </div>

      {/* Behance Embed Project Modal */}
      <Modal
        isOpen={Boolean(activeEmbedProject)}
        onClose={() => setActiveEmbedProject(null)}
        title={activeEmbedProject ? `${activeEmbedProject.title} ${activeEmbedProject.sub} Case Study` : 'Design Case Study'}
        subtitle="Live Behance Project Embed · Aritra Mondal"
        maxWidth="max-w-4xl"
      >
        {activeEmbedProject && (
          <div className="space-y-4">
            {/* Direct Open Link Top Bar */}
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <BehanceIcon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">Direct Behance link enabled</span>
              </div>
              <a
                href={activeEmbedProject.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Open in Behance</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Responsive Iframe with Instant Skeleton & Eager Load */}
            <BehanceEmbedFrame key={activeEmbedProject.embedUrl} project={activeEmbedProject} />

            {/* Modal Footer Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Interactive Behance Embed · Click project or button to view</span>
              </div>

              <a
                href={activeEmbedProject.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 text-center"
              >
                <BehanceIcon className="w-3.5 h-3.5" />
                <span>Open Full Project on Behance</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
