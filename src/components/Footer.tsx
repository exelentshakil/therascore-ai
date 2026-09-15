"use client";

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Code2, 
  Server, 
  Cpu, 
  ExternalLink,
  Activity,
  Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 pb-16 text-xs text-[var(--color-text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Grid: Capabilities, Certifications & Stack */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-[var(--color-border-subtle)]">
          
          {/* Col 1: Platform Overview */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                TS
              </div>
              <span className="font-bold text-sm text-[var(--color-text-primary)]">
                TheraScore AI
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Automated psychotherapy session adherence & clinical quality platform. Specialized in Linehan DBT-ARS and Beck CTRS scoring with zero-hallucination verbatim quote anchoring.
            </p>
          </div>

          {/* Col 2: Healthcare Security & HIPAA */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>HIPAA AI Governance</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[var(--color-text-muted)]">
              <li>• Safe Harbor 18-Identifier Masking</li>
              <li>• Azure OpenAI Zero Data Retention (ZDR)</li>
              <li>• OWASP LLM01 Injection Interception</li>
              <li>• Immutable SHA-256 Audit Hashes</li>
            </ul>
          </div>

          {/* Col 3: Stack Alignment (Jeremy Stack) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
              <Code2 className="h-4 w-4 text-teal-600" />
              <span>Full-Stack Architecture</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[var(--color-text-muted)]">
              <li>• Svelte 5 Runes & SvelteKit Endpoints</li>
              <li>• Azure DevOps CI/CD & Container Apps</li>
              <li>• Python FastAPI & PyAnnote Diarization</li>
              <li>• PostgreSQL & Inngest Durable Events</li>
            </ul>
          </div>

          {/* Col 4: Verified Engineering Credentials */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
              <Cpu className="h-4 w-4 text-indigo-600" />
              <span>Verified Credentials</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Securiti Certified AI Security & Governance Architect (Cert ID: <span className="font-mono text-[10px] text-teal-700 dark:text-teal-400 font-bold">14B411BCE-14B411A3D</span>). 12+ years systems engineering. Available in PST.
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span>© 2026 TheraScore AI Systems. Clinical Adherence Platform.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Systems Operational (API: 200 OK)
            </span>
            <span className="font-mono text-[10px]">PST Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
