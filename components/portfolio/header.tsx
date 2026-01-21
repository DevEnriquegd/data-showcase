"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-[32px] font-semibold tracking-tight text-foreground">
              Enrique Gonzalez
            </h1>
            <p className="text-lg font-medium text-[#475569]">
              Data Analyst & BI Specialist
            </p>
            <p className="max-w-xl text-[14px] leading-relaxed text-[#94A3B8]">
              Transforming complex data into strategic decisions. I design
              scalable analytics solutions that drive measurable business
              impact.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/DevEnriquegd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-[#475569] transition-all duration-150 hover:border-primary hover:text-primary"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/enrique-gonzalez-diaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-[#475569] transition-all duration-150 hover:border-primary hover:text-primary"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
