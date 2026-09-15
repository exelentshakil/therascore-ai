"use client";

import React from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Sliders, 
  Layers,
  ArrowRight,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewerTourProps {
  onSelectPath: (path: string) => void;
}

export function ReviewerTour({ onSelectPath }: ReviewerTourProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <section className="w-full py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Value Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/30 whitespace-nowrap shrink-0">
                Executive Briefing
              </Badge>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                Ref: BS-2026-THERASCORE-0915 • Verified Azure & Svelte Blueprint
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
              How to Evaluate This Psychotherapy Quality &amp; Clinical Supervision Platform
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5 max-w-4xl">
              This production control plane processes recorded therapy sessions, strips 18 HIPAA identifiers pre-inference, and generates objective DBT Adherence Rating Scale (DBT-ARS) &amp; CBT CTRS competence scorecards with verbatim timestamped anchors and automated SOAP clinical documentation.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 px-3 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] self-start sm:self-center shrink-0 gap-1.5"
          >
            {collapsed ? (
              <>
                <span>Expand Briefing</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>Collapse Briefing</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        {/* 4 Distinct 1-Click Interactive Evaluation Paths */}
        {!collapsed && (
          <div className="pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Path 1: Item-Level Scorecard */}
              <div 
                onClick={() => onSelectPath("scorecard")}
                className="group p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface)] hover:border-teal-500/50 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 font-mono">
                      <Stethoscope className="h-3.5 w-3.5 text-teal-600" />
                      PATH 01
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    DBT &amp; CBT Scorecards
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    Inspect item-level scoring (1–5 scale) anchored to verbatim dialogue, historical validation, and chain analysis.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <span>Open Scorecard</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Path 2: Diarized Audio Player */}
              <div 
                onClick={() => onSelectPath("transcript")}
                className="group p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface)] hover:border-blue-500/50 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 font-mono">
                      <Headphones className="h-3.5 w-3.5 text-blue-600" />
                      PATH 02
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Diarized Audio Scrubbing
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    Scrub audio waveform and sync with therapist/patient utterances and real-time clinical tags.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Scrub Audio</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Path 3: Automated SOAP Notes */}
              <div 
                onClick={() => onSelectPath("soap")}
                className="group p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface)] hover:border-purple-500/50 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-300 font-mono">
                      <FileText className="h-3.5 w-3.5 text-purple-600" />
                      PATH 03
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    SOAP Clinical Notes
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    Review automated Subjective, Objective, Assessment, and Plan notes with ICD-10 diagnostic codes and risk levels.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <span>Review SOAP</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Path 4: HIPAA PHI Redactor */}
              <div 
                onClick={() => onSelectPath("deid")}
                className="group p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface)] hover:border-emerald-500/50 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      PATH 04
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    HIPAA PHI Redaction
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                    Test the inline pre-inference redaction engine that masks names, locations, dates, and medical record numbers.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Test Redactor</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>

            {/* 3-Layer Architectural Defense Legend */}
            <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[var(--color-text-secondary)]">3-Layer Clinical Defense:</span>
                <span className="bg-[var(--color-panel-subtle)] px-2 py-0.5 rounded border border-[var(--color-border)] font-mono text-[11px]">
                  1. HIPAA Safe Harbor De-ID (&lt;15ms)
                </span>
                <span>→</span>
                <span className="bg-[var(--color-panel-subtle)] px-2 py-0.5 rounded border border-[var(--color-border)] font-mono text-[11px]">
                  2. Dual AI Reasoner (Azure OpenAI / Gemini)
                </span>
                <span>→</span>
                <span className="bg-[var(--color-panel-subtle)] px-2 py-0.5 rounded border border-[var(--color-border)] font-mono text-[11px]">
                  3. Supervisor Sign-off &amp; Audit Log
                </span>
              </div>
              <button 
                onClick={() => onSelectPath("blueprints")}
                className="text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Export Svelte &amp; Azure Blueprints</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
