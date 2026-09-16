import React from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-white dark:bg-zinc-900 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 shadow-xl',
  error: 'bg-white dark:bg-zinc-900 border-red-500/40 text-red-800 dark:text-red-300 shadow-xl',
  info: 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-xl',
};

export function Toast({ toast, onClose }) {
  if (typeof document === 'undefined' || !toast) return null;

  const Icon = icons[toast.type] || icons.info;

  const toastElement = (
    <div className="fixed top-5 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-md z-[110] animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md w-full pointer-events-auto',
          styles[toast.type] || styles.info
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium pr-2 break-words flex-1">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors ml-auto flex-shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return createPortal(toastElement, document.body);
}
