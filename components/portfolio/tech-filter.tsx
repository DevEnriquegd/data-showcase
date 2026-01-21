"use client"

import { cn } from "@/lib/utils"
import type { Technology } from "@/lib/data"

interface TechFilterProps {
  technologies: Technology[]
  selectedTechs: string[]
  onToggle: (techId: string) => void
  onClear: () => void
}

export function TechFilter({
  technologies,
  selectedTechs,
  onToggle,
  onClear,
}: TechFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-[#475569]">
          Filter by Technology
        </h2>
        {selectedTechs.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const isSelected = selectedTechs.includes(tech.id)
          return (
            <button
              key={tech.id}
              onClick={() => onToggle(tech.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-[#475569] hover:border-primary/50 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  isSelected ? "bg-white/80" : ""
                )}
                style={{
                  backgroundColor: isSelected ? undefined : tech.color,
                }}
              />
              {tech.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
