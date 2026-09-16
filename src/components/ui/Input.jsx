import React from 'react';
import { cn } from '../../utils/helpers';

export function Input({
  id,
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 tracking-wide"
        >
          {label} {required && <span className="text-emerald-600 dark:text-emerald-400">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-zinc-900 border transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-sm dark:shadow-none',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60',
          error
            ? 'border-red-500/60 focus:ring-red-500/20 focus:border-red-500'
            : 'border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700',
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
