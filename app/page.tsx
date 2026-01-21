"use client";

import { useState, useMemo } from "react";
import { ArrowDownUpIcon, Plus } from "lucide-react";
import { Header } from "@/components/portfolio/header";
import { TechFilter } from "@/components/portfolio/tech-filter";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectModal } from "@/components/portfolio/project-modal";
import { CreateProjectModal } from "@/components/portfolio/create-project-modal";
import {
  technologies,
  projects as initialProjects,
  type Project,
} from "@/lib/data";
import { Arrow } from "@radix-ui/react-dropdown-menu";

export default function HomePage() {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const projects = initialProjects; // Declare the projects variable

  // Get unique technologies from projects for filter display
  const usedTechnologies = useMemo(() => {
    const usedIds = new Set(projectsList.flatMap((p) => p.technologies));
    return technologies.filter((t) => usedIds.has(t.id));
  }, [projectsList]);

  // Filter projects based on selected technologies
  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return projectsList;
    return projectsList.filter((project) =>
      selectedTechs.some((tech) => project.technologies.includes(tech)),
    );
  }, [selectedTechs, projectsList]);

  const handleCreateProject = (newProject: Project) => {
    setProjectsList((prev) => [newProject, ...prev]);
  };

  const handleToggleTech = (techId: string) => {
    setSelectedTechs((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    );
  };

  const handleClearFilters = () => {
    setSelectedTechs([]);
  };

  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default",
  );

  const cycleSort = () => {
    setSortOrder((s) =>
      s === "default" ? "asc" : s === "asc" ? "desc" : "default",
    );
  };

  const displayedProjects = useMemo(() => {
    if (sortOrder === "default") return filteredProjects;
    return [...filteredProjects].sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );
  }, [filteredProjects, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Filters Section */}
        <section className="mb-8">
          <TechFilter
            technologies={usedTechnologies}
            selectedTechs={selectedTechs}
            onToggle={handleToggleTech}
            onClear={handleClearFilters}
          />
        </section>

        {/* Projects Grid */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#475569]">
              {filteredProjects.length === projectsList.length
                ? `${projectsList.length} Projects`
                : `${filteredProjects.length} of ${projectsList.length} Projects`}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={cycleSort}
                title="Cycle sort: default → asc → desc"
                className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm"
              >
                <ArrowDownUpIcon className="h-4 w-4" />
                {sortOrder === "default" && <span>Sort: Default</span>}
                {sortOrder === "asc" && <span>Sort: Title ↑</span>}
                {sortOrder === "desc" && <span>Sort: Title ↓</span>}
              </button>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                New Project
              </button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 py-16 text-center">
              <p className="text-lg font-medium text-[#475569]">
                No projects match your filters
              </p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Try selecting different technologies or clear all filters
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-sm text-[#94A3B8]">
            Data Insights Hub — Designed to communicate impact, built for
            scalability
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProject}
      />
    </div>
  );
}
