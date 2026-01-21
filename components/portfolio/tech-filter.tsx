"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Technology } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Search, Filter } from "lucide-react";

interface TechFilterProps {
  technologies: Technology[];
  selectedTechs: string[];
  onToggle: (techId: string) => void;
  onClear: () => void;
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export function TechFilter({
  technologies,
  selectedTechs,
  onToggle,
  onClear,
  searchTerm,
  onSearch,
}: TechFilterProps) {
  const [internalSearch, setInternalSearch] = useState(searchTerm ?? "");

  useEffect(() => {
    if (typeof searchTerm === "string") setInternalSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (onSearch) onSearch(v);
    else setInternalSearch(v);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        {selectedTechs.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex w-full items-center gap-3">
          <Search className="size-4 opacity-60" />
          <Input
            className="bg-white"
            placeholder="Search projects..."
            value={internalSearch}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm">
                <Filter className="size-4" />
                <span className="text-sm">
                  {selectedTechs.length > 0
                    ? `${selectedTechs.length} selected`
                    : "Filter"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Technologies</DropdownMenuLabel>
              {technologies.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech.id}
                  checked={selectedTechs.includes(tech.id)}
                  onCheckedChange={() => onToggle(tech.id)}
                >
                  {tech.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
