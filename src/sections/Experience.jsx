import { Calendar, MapPin, Quote } from 'lucide-react';
import { experience, testimonials } from '../data/portfolioData';
import { Card } from '../components/ui/Card';

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-2">
            04 // Track Record & Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Professional Career Timeline
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A history of technical leadership, architectural decisions, and product shipping across diverse engineering teams.
          </p>
        </div>

        {/* Timeline items */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6 space-y-12 pb-6">
          {experience.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-emerald-500 dark:border-emerald-400 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors shadow-sm dark:shadow-none" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {item.role} <span className="text-emerald-600 dark:text-emerald-400">@ {item.company}</span>
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Achievements list */}
              <ul className="space-y-2 mb-4">
                {item.achievements.map((achieve, i) => (
                  <li key={i} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1.5 block w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 flex-shrink-0" />
                    <span>{achieve}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials block */}
        <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800/80">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Recommendations & Feedback
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none">
                <Quote className="w-6 h-6 text-emerald-600/60 dark:text-emerald-400/60 mb-3" />
                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed mb-4">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {test.author}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-mono">
                    {test.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
