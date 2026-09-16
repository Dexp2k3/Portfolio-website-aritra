import React from 'react';
import { Layout, Server, Terminal, Wrench, CheckCircle2 } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

const icons = {
  frontend: Layout,
  backend: Server,
  devops: Terminal,
};

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-2">
            03 // Skills & Technologies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Technical Toolkit & Specializations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A comprehensive overview of the core technologies, frameworks, and engineering practices I utilize on a daily basis.
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = icons[category.id] || Wrench;
            return (
              <Card
                key={category.id}
                className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700/80 transition-all flex flex-col shadow-sm dark:shadow-none"
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {category.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
                            {skill.experience}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/40">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Workflow & Methodologies banner */}
        <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none">
          <div className="text-center md:text-left">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
              Core Engineering Practices
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Strict adherence to scalable standards across all project phases.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Clean Code Architecture', 'Automated CI/CD', 'Semantic Versioning', 'WCAG AAA a11y', 'Test-Driven Development', 'Atomic Design'].map((practice) => (
              <span
                key={practice}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/40"
              >
                {practice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
