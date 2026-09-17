import React from 'react';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium shadow-sm hover:shadow active:scale-[0.98]',
  secondary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-700/80 active:scale-[0.98]',
  outline: 'border border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-800/50 active:scale-[0.98]',
  ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50',
  danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150 select-none outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : LeftIcon ? (
        <LeftIcon className="w-4 h-4" />
      ) : null}
      
      <span>{children}</span>

      {!isLoading && RightIcon ? (
        <RightIcon className="w-4 h-4" />
      ) : null}
    </button>
  );
}
