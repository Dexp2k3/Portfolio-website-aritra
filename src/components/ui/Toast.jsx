import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Sparkles,
};

const iconColors = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  info: 'text-blue-400',
};

export function Toast({ toast, onClose }) {
  const [visible, setVisible] = useState(false);
  const [currentToast, setCurrentToast] = useState(null);

  useEffect(() => {
    if (toast) {
      setCurrentToast(toast);
      const frame = requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setCurrentToast(null);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (typeof document === 'undefined' || !currentToast) return null;

  const Icon = icons[currentToast.type] || icons.info;
  const iconColor = iconColors[currentToast.type] || iconColors.info;

  const toastElement = (
    <div className="fixed top-5 left-0 right-0 flex justify-center z-[110] px-4 pointer-events-none select-none">
      <div
        role="status"
        aria-live="polite"
        onClick={onClose}
        className={`pointer-events-auto cursor-pointer inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out transform ${
          visible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-3 scale-95'
        } bg-zinc-950/90 dark:bg-zinc-900/95 border-zinc-800/80 dark:border-zinc-700/60 shadow-black/30 hover:border-zinc-600 dark:hover:border-zinc-500 active:scale-98`}
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
        <span className="text-xs sm:text-sm font-medium tracking-tight text-zinc-100 whitespace-nowrap">
          {currentToast.message}
        </span>
      </div>
    </div>
  );

  return createPortal(toastElement, document.body);
}

