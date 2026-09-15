"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Users,
  CheckCircle2,
  BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RoiCostCalculator() {
  const [therapists, setTherapists] = useState<number>(8);
  const [sessionsPerWeek, setSessionsPerWeek] = useState<number>(24);
  const [supervisorRate, setSupervisorRate] = useState<number>(120);
  const [manualAuditPercent, setManualAuditPercent] = useState<number>(10);

  // Calculations
  const totalSessionsAnnual = therapists * sessionsPerWeek * 50; // 50 working weeks
  const manualAuditsAnnual = Math.round(totalSessionsAnnual * (manualAuditPercent / 100));
  const manualHoursAnnual = manualAuditsAnnual * 0.85; // 50 mins per manual audio review
  const manualCostAnnual = Math.round(manualHoursAnnual * supervisorRate);

  // TheraScore AI: 100% coverage of ALL sessions
  const aiTokenCostPerSession = 0.0038; // gpt-4o-mini ~3k tokens with prompt caching
  const aiCostAnnual = Math.round(totalSessionsAnnual * aiTokenCostPerSession);
  
  // Supervisor time with AI: review pre-scored flagged adherence risks only (10 mins vs 50 mins)
  const aiAssistedSupervisorHours = Math.round(manualAuditsAnnual * 0.17); // 10 mins per review
  const aiAssistedSupervisorCost = Math.round(aiAssistedSupervisorHours * supervisorRate);
  
  const netDollarSavings = Math.max(0, manualCostAnnual - (aiAssistedSupervisorCost + aiCostAnnual));
  const netHoursSaved = Math.max(0, Math.round(manualHoursAnnual - aiAssistedSupervisorHours));
  const roiMultiplier = Math.round(manualCostAnnual / (aiCostAnnual + 1200)); // factoring SaaS base

  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                Clinical Supervision ROI & Time-Savings Engine
              </h3>
              <Badge variant="outline" className="text-[11px] font-bold border-teal-500/30 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40">
                100% Adherence Coverage vs 10% Manual Sampling
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Model clinic economic impact: Replace manual 50-minute tape listening with instant AI scorecards and targeted supervisor coaching.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Sliders & Live Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] shadow-2xs space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
              Clinic Scale Parameters
            </span>

            {/* Slider 1: Active Clinicians */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-teal-600" />
                  Active Clinicians
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">
                  {therapists} therapists
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                value={therapists}
                onChange={(e) => setTherapists(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            {/* Slider 2: Sessions / Week */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-3.5 w-3.5 text-teal-600" />
                  Sessions / Clinician / Week
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">
                  {sessionsPerWeek} sessions
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                value={sessionsPerWeek}
                onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            {/* Slider 3: Supervisor Hourly Billing Rate */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-teal-600" />
                  Supervisor Loaded Hourly Rate
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">
                  ${supervisorRate}/hr
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={250}
                step={5}
                value={supervisorRate}
                onChange={(e) => setSupervisorRate(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            {/* Slider 4: Manual Sample Audit % */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-teal-600" />
                  Manual Audit Sampling Rate
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">
                  {manualAuditPercent}% of sessions
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                value={manualAuditPercent}
                onChange={(e) => setManualAuditPercent(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            <div className="pt-3 border-t border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-muted)] space-y-1">
              <div className="flex justify-between">
                <span>Annual Session Volume:</span>
                <span className="font-mono font-semibold text-[var(--color-text-primary)]">{totalSessionsAnnual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual LLM Token Burn:</span>
                <span className="font-mono font-semibold text-emerald-600">${aiCostAnnual} / year</span>
              </div>
            </div>

          </div>

          {/* Results Display Column (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* KPI 1: Annual Net Savings */}
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Annual Net Supervision Savings
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 mt-1">
                  ${netDollarSavings.toLocaleString()}
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                Net capital saved by eliminating 80% of passive tape-listening hours while maintaining 100% session adherence audits.
              </p>
            </div>

            {/* KPI 2: Supervisor Hours Reclaimed */}
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Clinical Hours Reclaimed
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-teal-700 dark:text-teal-400 mt-1">
                  {netHoursSaved.toLocaleString()} hrs / yr
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                Direct hours returned to clinical directors to see billable patients or conduct focused 1-on-1 skills coaching.
              </p>
            </div>

            {/* KPI 3: Coverage Multiplier */}
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Quality Audit Coverage
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                  100% Complete
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                Eliminates clinical malpractice blind spots: Every session scored against DBT-ARS & CTRS vs traditional {manualAuditPercent}% spot checks.
              </p>
            </div>

            {/* KPI 4: Net ROI Multiple */}
            <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Platform ROI Multiplier
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                  {roiMultiplier}x Net Return
                </div>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-3 pt-2 border-t border-[var(--color-border-subtle)]">
                Based on $0.0038/session inference cost against standard clinical supervisor loaded compensation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
