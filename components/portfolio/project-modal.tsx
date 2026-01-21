"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ExternalLink, Target, Lightbulb, TrendingUp, Layers, Code, GitBranch } from "lucide-react"
import type { Project, Technology } from "@/lib/data"
import { getProjectTechnologies } from "@/lib/data"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleEscape)
    }
  }, [project, handleEscape])

  if (!project) return null

  const projectTechs = getProjectTechnologies(project)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-start gap-4 border-b border-border p-6">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-foreground"
            >
              {project.title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {projectTechs.slice(0, 4).map((tech: Technology) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  {tech.name}
                </span>
              ))}
              {projectTechs.length > 4 && (
                <span className="text-xs text-[#94A3B8]">+{projectTechs.length - 4} more</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="space-y-5">
            {/* GitHub Button */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </a>

            {/* Business Vision */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Business Vision
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <Lightbulb className="h-4 w-4" />
                    Problem
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.businessVision.problem}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <Target className="h-4 w-4" />
                    Decision
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.businessVision.decision}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <TrendingUp className="h-4 w-4" />
                    Impact
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.businessVision.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Detail */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Code className="h-5 w-5 text-primary" />
                Technical Detail
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <Layers className="h-4 w-4" />
                    Architecture
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.technicalDetail.architecture}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <Code className="h-4 w-4" />
                    Stack
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.technicalDetail.stack}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#475569]">
                    <GitBranch className="h-4 w-4" />
                    Data Flow
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.technicalDetail.dataFlow}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
