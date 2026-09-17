import React from 'react';
import { cn } from '../../utils/helpers';

export function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter selection"
      className={cn(
        'inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 select-none whitespace-nowrap outline-none focus:outline-none',
              isActive
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-700/50 font-semibold'
                : 'hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono',
                isActive ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300' : 'bg-zinc-200/80 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-500'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
