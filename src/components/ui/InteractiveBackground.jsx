import React, { useState, useEffect, useRef } from 'react';

const DESIGN_ELEMENTS = [
  { id: 1, type: 'sparkle', x: '10%', y: '16%', size: 20, delay: '0s', duration: '7s' },
  { id: 2, type: 'crosshair', x: '88%', y: '14%', size: 16, delay: '1.2s', duration: '9s' },
  { id: 3, type: 'bezier', x: '7%', y: '46%', size: 28, delay: '2.5s', duration: '8s' },
  { id: 4, type: 'diamond', x: '92%', y: '50%', size: 18, delay: '0.8s', duration: '10s' },
  { id: 5, type: 'frame', x: '12%', y: '78%', size: 22, delay: '1.5s', duration: '8.5s' },
  { id: 6, type: 'sparkle', x: '86%', y: '82%', size: 24, delay: '3s', duration: '7.5s' },
  { id: 7, type: 'polygon', x: '48%', y: '95%', size: 20, delay: '2s', duration: '9.5s' },
  { id: 8, type: 'crosshair', x: '5%', y: '92%', size: 14, delay: '1s', duration: '8s' },
];

export function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [hasPointer, setHasPointer] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  });
  const [sparks, setSparks] = useState([]);
  const targetPosRef = useRef({ x: -1000, y: -1000 });
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const isRunningRef = useRef(false);
  const animFrameRef = useRef(null);

  // Check if device supports true hover cursor (desktops/laptops vs mobile touch)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');

    const handleMediaChange = (e) => setHasPointer(e.matches);
    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  // Event-driven mouse tracking with automatic idle-pause (0% CPU at rest)
  useEffect(() => {
    if (!hasPointer) return;

    const tick = () => {
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;

      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
        currentPosRef.current.x += dx * 0.12;
        currentPosRef.current.y += dy * 0.12;
        setMousePos({ x: currentPosRef.current.x, y: currentPosRef.current.y });
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        isRunningRef.current = false;
      }
    };

    const handleMouseMove = (e) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasPointer]);

  // Click on background creates playful designer particle burst (desktop & mobile)
  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger on interactive clicks (buttons, links, inputs, cards)
      if (e.target.closest('button, a, input, textarea, [role="dialog"], iframe')) {
        return;
      }

      const count = 6;
      const newSparks = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5);
        const velocity = 25 + Math.random() * 35;
        return {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity,
          symbol: ['✦', '❖', '▲', '●', '■', '◇'][Math.floor(Math.random() * 6)],
          color: ['text-blue-500', 'text-cyan-400', 'text-purple-500', 'text-emerald-400', 'text-indigo-400'][
            Math.floor(Math.random() * 5)
          ],
        };
      });

      setSparks((prev) => [...prev.slice(-18), ...newSparks]);

      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
      }, 700);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Subtle Architectural Dot Matrix Grid with Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.025)_1px,transparent_0)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_50%,transparent_100%)]" />

      {/* Interactive Cursor Spotlight Glow (Desktop Pointer Only) - Refined and Softer */}
      {hasPointer && (
        <div
          className="absolute rounded-full w-[450px] h-[450px] blur-[120px] opacity-35 dark:opacity-45 transition-opacity duration-300 will-change-transform pointer-events-none"
          style={{
            transform: `translate3d(${mousePos.x - 225}px, ${mousePos.y - 225}px, 0)`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 70%)',
          }}
        />
      )}

      {/* Primary Ambient Aurora (Deep Electric Blue - slow drift 26s, calm opacity) */}
      <div className="absolute top-[-10%] left-[-5%] w-[420px] sm:w-[680px] h-[420px] sm:h-[680px] rounded-full bg-gradient-to-br from-blue-500/[0.06] via-indigo-600/[0.03] to-transparent dark:from-blue-600/[0.08] dark:via-indigo-500/[0.04] dark:to-transparent blur-[130px] sm:blur-[150px] animate-aurora-1 will-change-transform" />

      {/* Secondary Ambient Aurora (Cyan / Sky Glow - slow drift 30s, calm opacity) */}
      <div className="absolute top-[42%] right-[-10%] w-[380px] sm:w-[620px] h-[380px] sm:h-[620px] rounded-full bg-gradient-to-bl from-cyan-500/[0.05] via-blue-600/[0.03] to-transparent dark:from-cyan-500/[0.07] dark:via-blue-600/[0.04] dark:to-transparent blur-[130px] sm:blur-[160px] animate-aurora-2 will-change-transform" />

      {/* Tertiary Ambient Aurora (Subtle Violet Depth - slow drift 22s, calm opacity) */}
      <div className="absolute bottom-[-10%] left-[20%] w-[360px] sm:w-[580px] h-[360px] sm:h-[580px] rounded-full bg-gradient-to-tr from-purple-600/[0.04] via-blue-500/[0.02] to-transparent dark:from-purple-600/[0.05] dark:via-blue-500/[0.03] dark:to-transparent blur-[130px] sm:blur-[150px] animate-aurora-3 will-change-transform" />

      {/* Cosmic Orbital Halo Rings (Subtle, non-intrusive) */}
      <div className="absolute -top-[60px] -right-[60px] sm:top-[-80px] sm:right-[5%] pointer-events-none flex items-center justify-center opacity-70">
        {/* Outer Orbit (Dashed) */}
        <div className="w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] md:w-[720px] md:h-[720px] rounded-full border border-dashed border-blue-500/10 dark:border-blue-400/12 animate-spin-slow flex items-center justify-center">
          {/* Outer Orbit Satellite Accent Node */}
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 shadow-[0_0_6px_#60a5fa] absolute top-4 left-1/4" />
        </div>

        {/* Inner Counter-Rotating Orbit with Glowing Cyan Satellite */}
        <div className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-blue-500/12 dark:border-cyan-400/15 animate-spin-reverse flex items-center justify-center">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400/60 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute -bottom-1 left-1/3 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/50 shadow-[0_0_6px_#818cf8]" />
        </div>

        {/* Core Pulsing Cosmic Glow */}
        <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full bg-gradient-to-tr from-cyan-500/[0.05] via-blue-600/[0.05] to-transparent dark:from-cyan-400/[0.08] dark:via-blue-600/[0.06] blur-xl sm:blur-2xl animate-pulse" />
      </div>

      {/* Cyber Shooting Light Streaks (Softened) */}
      <div className="absolute top-[8%] left-[10%] w-48 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent blur-[0.5px] -rotate-[35deg] animate-streak-1" />
      <div className="absolute top-[35%] left-[25%] w-56 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-[0.5px] -rotate-[35deg] animate-streak-2" />

      {/* Subtle Radar Matrix Scan Wave (Softened) */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/15 dark:via-cyan-400/20 to-transparent blur-[1px] animate-grid-wave" />

      {/* Rising Cosmic Stardust Embers (Softened, gentle twinkle) */}
      {[
        { id: 'sd-1', left: '15%', bottom: '20%', size: 'w-1 h-1', dur: '9s', del: '0s', color: 'bg-cyan-400/35' },
        { id: 'sd-2', left: '28%', bottom: '15%', size: 'w-1.5 h-1.5', dur: '12s', del: '2.5s', color: 'bg-blue-400/25' },
        { id: 'sd-3', left: '42%', bottom: '25%', size: 'w-1 h-1', dur: '8.5s', del: '4s', color: 'bg-indigo-300/35' },
        { id: 'sd-4', left: '60%', bottom: '18%', size: 'w-1.5 h-1.5', dur: '11s', del: '1.2s', color: 'bg-cyan-300/35' },
        { id: 'sd-5', left: '75%', bottom: '22%', size: 'w-1 h-1', dur: '10s', del: '3.8s', color: 'bg-sky-400/25' },
        { id: 'sd-6', left: '88%', bottom: '12%', size: 'w-1 h-1', dur: '7.5s', del: '5.5s', color: 'bg-blue-400/35' },
      ].map((ember) => (
        <div
          key={ember.id}
          className={`absolute rounded-full pointer-events-none animate-stardust shadow-[0_0_4px_currentColor] ${ember.size} ${ember.color}`}
          style={{
            left: ember.left,
            bottom: ember.bottom,
            '--stardust-dur': ember.dur,
            '--stardust-del': ember.del,
          }}
        />
      ))}

      {/* Floating Designer Glyphs with Parallax (Softened) */}
      {DESIGN_ELEMENTS.map((el) => {
        const offsetX = hasPointer ? (mousePos.x / 1200 - 0.5) * 16 : 0;
        const offsetY = hasPointer ? (mousePos.y / 900 - 0.5) * 16 : 0;
        // Keep only select clean glyphs on small phone screens
        const isMobileHidden = [3, 5, 7].includes(el.id);

        return (
          <div
            key={el.id}
            className={`absolute transition-transform duration-500 ease-out text-zinc-400/[0.12] dark:text-zinc-500/[0.14] ${
              isMobileHidden ? 'hidden sm:block' : ''
            }`}
            style={{
              left: el.x,
              top: el.y,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            }}
          >
            <div
              className="animate-float"
              style={{
                animationDuration: el.duration,
                animationDelay: el.delay,
              }}
            >
              <DesignerGlyph type={el.type} size={el.size} />
            </div>
          </div>
        );
      })}

      {/* Dynamic Click Sparkles */}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className={`absolute text-xs font-mono font-bold select-none animate-sparkle-burst ${spark.color}`}
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            '--tx': `${spark.dx}px`,
            '--ty': `${spark.dy}px`,
          }}
        >
          {spark.symbol}
        </span>
      ))}
    </div>
  );
}

function DesignerGlyph({ type, size = 20 }) {
  switch (type) {
    case 'sparkle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
        </svg>
      );
    case 'crosshair':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M12 4V20M4 12H20" strokeLinecap="round" />
        </svg>
      );
    case 'bezier':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
          <circle cx="4" cy="4" r="2.5" />
          <circle cx="20" cy="20" r="2.5" />
          <path d="M6.5 6.5L9 9M15 15L17.5 17.5" strokeDasharray="1 1" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M12 3L21 12L12 21L3 12Z" />
        </svg>
      );
    case 'frame':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <path d="M4 8V4H8M16 4H20V8M20 16V20H16M8 20H4V16" strokeLinecap="round" />
        </svg>
      );
    case 'polygon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
          <polygon points="12,3 21,8.5 21,17.5 12,23 3,17.5 3,8.5" />
        </svg>
      );
    default:
      return null;
  }
}
