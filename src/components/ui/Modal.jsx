import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = '',
  maxWidth = 'max-w-3xl',
}) {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 180);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (typeof document === 'undefined' || (!isOpen && !isClosing)) return null;

  const modalElement = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Backdrop with clean fade in / ease out */}
      <div
        className={cn(
          'fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md transition-opacity',
          isClosing ? 'animate-backdrop-exit' : 'animate-modal-backdrop'
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card with smooth spring pop entrance & ease-out exit */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl dark:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.3)] z-10 my-auto overflow-hidden transform text-zinc-900 dark:text-zinc-100 overscroll-contain',
          isClosing ? 'animate-modal-ease-out' : 'animate-modal-pop',
          maxWidth,
          className
        )}
      >
        {/* Top Aesthetic Accent Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-zinc-200/80 dark:border-zinc-800/80 gap-3">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight break-words">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono truncate">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="rounded-xl p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 hover:rotate-90 active:scale-90 outline-none focus:outline-none flex-shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
}
