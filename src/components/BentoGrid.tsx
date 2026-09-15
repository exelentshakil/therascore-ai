"use client";

import React from "react";
import { 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  TrendingUp,
  Stethoscope,
  Lock,
  Zap,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BentoGridProps {
  dbtScore?: number;
  cbtScore?: number;
  phiRedactedCount?: number;
  latencyMs?: number;
}

export function BentoGrid({
  dbtScore = 88.5,
  cbtScore = 76.0,
  phiRedactedCount = 48,
  latencyMs = 1180
}: BentoGridProps) {
  return (
    <section className="w-full py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Card 1: DBT Adherence Rating */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  DBT Adherence
                </span>
                <Badge variant="outline" className="text-[10px] font-bold text-teal-700 dark:text-teal-300 border-teal-500/30 bg-teal-50 dark:bg-teal-950/40 whitespace-nowrap shrink-0">
                  Linehan Validated
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-teal-600 dark:text-teal-400">
                  {dbtScore.toFixed(1)}%
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  +12.4%
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Pass Threshold: 75.0% (Level 5 Validation &amp; Chain Verified)
              </p>
            </div>
            {/* Inline Micro Sparkline */}
            <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
              <div className="h-4 flex items-end gap-1">
                {[65, 70, 74, 82, 85, 88, 88.5].map((val, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 bg-teal-500/30 dark:bg-teal-500/40 hover:bg-teal-500 rounded-xs transition-colors"
                    style={{ height: `${(val / 100) * 100}%` }}
                    title={`Session ${idx + 1}: ${val}%`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: CBT CTRS Competence */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  CBT Competence
                </span>
                <Badge variant="outline" className="text-[10px] font-bold text-blue-700 dark:text-blue-300 border-blue-500/30 bg-blue-50 dark:bg-blue-950/40 whitespace-nowrap shrink-0">
                  CTRS Scale
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-blue-600 dark:text-blue-400">
                  {cbtScore.toFixed(1)}%
                </span>
                <span className="text-xs font-medium text-[var(--color-text-muted)] font-mono">
                  (44/66 CTRS)
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Guided discovery &amp; Socratic dialogue evaluated
              </p>
            </div>
            {/* Comparative Visual Bar */}
            <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
              <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mb-1">
                <span>Baseline: 36</span>
                <span className="font-bold text-blue-600">Current: 44</span>
                <span>Max: 66</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(44 / 66) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Card 3: PHI De-Identification Rate */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  HIPAA PHI Shield
                </span>
                <Badge variant="outline" className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 whitespace-nowrap shrink-0">
                  Zero Leakage
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
                  100%
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Safe Harbor
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {phiRedactedCount} identifiers scrubbed before LLM ingestion
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="font-mono text-[11px]">18 Safe Harbor Rules</span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="h-3 w-3" /> Active
              </span>
            </div>
          </div>

          {/* Card 4: Inference Latency */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Pipeline SLA
                </span>
                <Badge variant="outline" className="text-[10px] font-bold text-purple-700 dark:text-purple-300 border-purple-500/30 bg-purple-50 dark:bg-purple-950/40 whitespace-nowrap shrink-0">
                  Sub-2s Engine
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                  {(latencyMs / 1000).toFixed(2)}s
                </span>
                <span className="text-xs font-medium text-[var(--color-text-muted)] font-mono">
                  ({latencyMs}ms)
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Diarization, scoring &amp; note drafting in parallel
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="font-mono text-[11px]">Azure Speech + LLM</span>
              <span className="text-purple-600 font-semibold flex items-center gap-1">
                <Zap className="h-3 w-3" /> Real-time
              </span>
            </div>
          </div>

          {/* Card 5: Supervisor Time Saved */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Supervisor ROI
                </span>
                <Badge variant="outline" className="text-[10px] font-bold text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 whitespace-nowrap shrink-0">
                  78% Efficiency
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-amber-600 dark:text-amber-400">
                  4.2 hrs
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  / therapist / wk
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Automated transcript audit replaces manual tape review
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="font-mono text-[11px]">Annual Labor Saved</span>
              <span className="font-bold text-amber-600 font-mono">$18,480/yr</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
