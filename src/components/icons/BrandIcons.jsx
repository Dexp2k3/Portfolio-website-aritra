import React from 'react';

export function AMLogo({ className = "text-xl", glow = true, ...props }) {
  return (
    <span
      className={`relative inline-flex items-center font-black tracking-tighter select-none ${className}`}
      {...props}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="absolute -inset-1 bg-gradient-to-r from-cyan-400/25 via-blue-500/30 to-indigo-500/25 rounded-lg blur-md opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300 pointer-events-none"
        />
      )}
      <span className="relative z-10 font-extrabold tracking-tighter animate-logo-glow transition-all duration-300 flex items-center">
        <span className="text-zinc-950 dark:text-white drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]">A</span>
        <span className="text-zinc-800 dark:text-zinc-100 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">M</span>
      </span>
    </span>
  );
}

export function GithubIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function TwitterIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function BehanceIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.971 3-3.401 0-4.755-2.609-4.755-5.077 0-2.827 1.764-5.187 4.908-5.187 3.398 0 4.81 2.385 4.81 4.981 0 .524-.047.962-.078 1.275h-7.399c.074 1.777 1.488 2.668 2.871 2.668 1.157 0 2.112-.58 2.502-1.66h2.112zm-4.939-5.188c-.021-.869-.472-1.921-2.022-1.921-1.378 0-2.072.936-2.203 1.921h4.225zM6.914 9.873c.691-.497 1.086-1.229 1.086-2.096 0-1.874-1.464-2.777-3.69-2.777H0v14h4.636c2.443 0 4.164-1.077 4.164-3.23 0-1.238-.69-2.128-1.886-2.587v-.081c.942-.375 1.589-1.266 1.589-2.229zm-4.314-2.8h1.704c1.17 0 1.794.498 1.794 1.47 0 .973-.624 1.472-1.794 1.472H2.6V7.073zm2.012 9.854H2.6v-3.578h2.012c1.332 0 2.052.57 2.052 1.789 0 1.218-.72 1.789-2.052 1.789z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function FigmaIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} {...props}>
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

export function PhotoshopIcon({ className = "w-7 h-7", ...props }) {
  return (
    <div className={`rounded-xl bg-[#001d34] border border-[#00c8ff]/30 text-[#00c8ff] font-bold font-sans flex items-center justify-center text-xs tracking-tight select-none shadow-sm ${className}`} {...props}>
      Ps
    </div>
  );
}

export function IllustratorIcon({ className = "w-7 h-7", ...props }) {
  return (
    <div className={`rounded-xl bg-[#330000] border border-[#ff9a00]/30 text-[#ff9a00] font-bold font-sans flex items-center justify-center text-xs tracking-tight select-none shadow-sm ${className}`} {...props}>
      Ai
    </div>
  );
}

export function InDesignIcon({ className = "w-7 h-7", ...props }) {
  return (
    <div className={`rounded-xl bg-[#2a001a] border border-[#ff3366]/30 text-[#ff3366] font-bold font-sans flex items-center justify-center text-xs tracking-tight select-none shadow-sm ${className}`} {...props}>
      Id
    </div>
  );
}

export function CanvaIcon({ className = "w-7 h-7", ...props }) {
  return (
    <div className={`rounded-xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-bold font-sans flex items-center justify-center text-xs select-none shadow-sm ${className}`} {...props}>
      C
    </div>
  );
}

export function ChatGPTIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-[#10a37f] ${className}`} {...props}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.487a4.47 4.47 0 0 1 2.338-1.97v5.679a.763.763 0 0 0 .387.674l5.843 3.374-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.487zm16.597 3.855l-5.843-3.373 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.677zm2.01-4.707l-.142-.086-4.783-2.759a.771.771 0 0 0-.78 0L9.4 8.16V5.827a.08.08 0 0 1 .033-.062L14.26 2.97a4.5 4.5 0 0 1 6.69 4.665zM8.347 12.87l2.427-1.399 2.427 1.4v2.797l-2.427 1.4-2.427-1.4z"/>
    </svg>
  );
}

export function GeminiIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="gemini-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z"
        fill="url(#gemini-icon-grad)"
      />
    </svg>
  );
}

export function FireflyIcon({ className = "w-5 h-5", ...props }) {
  return (
    <div className={`rounded-lg bg-gradient-to-br from-[#2b0000] via-[#5c1100] to-[#200000] border border-[#ff5500]/40 text-[#ff7700] font-extrabold font-sans flex items-center justify-center text-[10px] tracking-tight select-none shadow-sm ${className}`} {...props}>
      Ff
    </div>
  );
}

export function ClaudeIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-[#D97757] ${className}`} {...props}>
      <path d="M13.8 2.2c-.4 0-.8.3-.9.7l-1.3 4.8c-.1.3-.3.5-.6.6L6.2 9.6c-.4.1-.7.5-.7.9 0 .4.3.8.7.9l4.8 1.3c.3.1.5.3.6.6l1.3 4.8c.1.4.5.7.9.7.4 0 .8-.3.9-.7l1.3-4.8c.1-.3.3-.5.6-.6l4.8-1.3c.4-.1.7-.5.7-.9 0-.4-.3-.8-.7-.9l-4.8-1.3c-.3-.1-.5-.3-.6-.6l-1.3-4.8c-.1-.4-.5-.7-.9-.7zm-8 12c-.3 0-.6.2-.7.5l-.6 2.4c0 .2-.2.3-.4.4l-2.4.6c-.3.1-.5.4-.5.7 0 .3.2.6.5.7l2.4.6c.2 0 .3.2.4.4l.6 2.4c.1.3.4.5.7.5.3 0 .6-.2.7-.5l.6-2.4c0-.2.2-.3.4-.4l2.4-.6c.3-.1.5-.4.5-.7 0-.3-.2-.6-.5-.7l-2.4-.6c-.2 0-.3-.2-.4-.4l-.6-2.4c-.1-.3-.4-.5-.7-.5z"/>
    </svg>
  );
}

export function MidjourneyIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-indigo-400 ${className}`} {...props}>
      <path d="M12 2L4 14.5h8V2zm1.2 3.8v8.7h6.8L13.2 5.8zM4.8 16.5l2.2 4.5h10l2.2-4.5H4.8z" />
    </svg>
  );
}

export function LeonardoIcon({ className = "w-5 h-5", ...props }) {
  return (
    <div className={`rounded-lg bg-gradient-to-tr from-[#6b21a8] to-[#db2777] text-white font-black font-sans flex items-center justify-center text-[10px] tracking-tight select-none shadow-sm ${className}`} {...props}>
      Le
    </div>
  );
}

export function CanvaAiIcon({ className = "w-5 h-5", ...props }) {
  return (
    <div className={`relative rounded-lg bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-bold font-sans flex items-center justify-center text-[10px] select-none shadow-sm ${className}`} {...props}>
      <span>C</span>
      <span className="text-[8px] font-black text-amber-300 ml-0.5">✦</span>
    </div>
  );
}

