import React, { useRef, useEffect } from 'react';
import { cn } from '../../utils/helpers';

export function Card({
  children,
  className = '',
  hover = false,
  spotlight = false,
  tilt = false,
  ...props
}) {
  const cardRef = useRef(null);
  const isFinePointer = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isFinePointer.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isFinePointer.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlight) {
      cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
      cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
      cardRef.current.style.setProperty('--spotlight-opacity', '1');
    }

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    if (spotlight) {
      cardRef.current.style.setProperty('--spotlight-opacity', '0');
    }
    if (tilt) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  const handleTouchEnd = () => {
    handleMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.28s ease',
      }}
      className={cn(
        'relative rounded-2xl border bg-white dark:bg-zinc-900/50 border-zinc-200/90 dark:border-zinc-800/80 transition-all duration-300 overflow-hidden shadow-xs dark:shadow-none will-change-transform touch-manipulation active:scale-[0.985]',
        hover &&
          'hover:border-blue-500/40 dark:hover:border-zinc-700 hover:shadow-lg dark:hover:shadow-[0_12px_32px_-8px_rgba(59,130,246,0.15)] group',
        className
      )}
      {...props}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: 'var(--spotlight-opacity, 0)',
            background:
              'radial-gradient(350px circle at var(--spotlight-x, -500px) var(--spotlight-y, -500px), rgba(59, 130, 246, 0.12), transparent 70%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={cn('p-6 border-b border-zinc-100 dark:border-zinc-800/50', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={cn('p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800/40 mt-auto', className)} {...props}>
      {children}
    </div>
  );
}
