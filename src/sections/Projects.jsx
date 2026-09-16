import React, { useState, useMemo } from 'react';
import { ExternalLink, ArrowRight, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { projects, projectCategories } from '../data/portfolioData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { GithubIcon } from '../components/icons/BrandIcons';

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Compute category counts
  const categoriesWithCounts = useMemo(() => {
    return projectCategories.map((cat) => ({
      ...cat,
      count: cat.id === 'all'
        ? projects.length
        : projects.filter((p) => p.category === cat.id).length,
    }));
  }, []);

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-zinc-200 dark:border-zinc-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-2">
              02 // Portfolio & Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Selected Work & Open Source
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
              Production systems, developer tools, and user experiences built with performance, accessibility, and scalability in mind.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="overflow-x-auto pb-2 md:pb-0">
            <Tabs
              tabs={categoriesWithCounts}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No projects in this category"
            description="There are currently no items under this filter. Try selecting 'All Projects'."
            actionLabel="Show All Projects"
            onAction={() => setSelectedCategory('all')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                hover={true}
                className="flex flex-col h-full bg-white dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm dark:shadow-none"
              >
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category & Metric badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" size="sm">
                      {project.category.toUpperCase()}
                    </Badge>
                    {project.metrics && (
                      <Badge variant="emerald" size="sm">
                        {project.metrics}
                      </Badge>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline & Short summary */}
                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-500">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/70 bg-zinc-50/75 dark:bg-zinc-950/40 flex items-center justify-between mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors focus:outline-none"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub repo`}
                        className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live demo`}
                        className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed Project Modal */}
        <Modal
          isOpen={Boolean(activeModalProject)}
          onClose={() => setActiveModalProject(null)}
          title={activeModalProject?.title}
          subtitle={activeModalProject?.tagline}
          maxWidth="max-w-2xl"
        >
          {activeModalProject && (
            <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Project Overview
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Key Technical Achievements
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Key Challenge</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {activeModalProject.challenges}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Technical Solution</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="sm" leftIcon={GithubIcon}>
                      Source Code
                    </Button>
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="sm" rightIcon={ExternalLink}>
                      Visit Project
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
