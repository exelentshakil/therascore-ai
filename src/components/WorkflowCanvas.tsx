"use client";

import React, { useState } from "react";
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Clock,
  ArrowRight,
  Workflow as WorkflowIcon,
  Server,
  Layers,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PipelineStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tech: string;
  latency: string;
  status: "idle" | "running" | "completed" | "error";
  errorPolicy: string;
  details: string;
  outputPayload: string;
}

const INITIAL_PIPELINE: PipelineStep[] = [
  {
    id: "ingest",
    title: "1. Audio Ingestion & Diarization",
    subtitle: "Diarized Multi-Speaker Chunks",
    icon: Server,
    tech: "Azure Speech Services / Whisper",
    latency: "620ms",
    status: "completed",
    errorPolicy: "Exponential Backoff (3 retries, max 10s)",
    details: "Ingests raw session WAV/MP3, performs dual-channel acoustic separation, and generates millisecond-accurate speaker turns.",
    outputPayload: '{"turns": 48, "speakers": ["Therapist", "Patient"], "durationSec": 3120}'
  },
  {
    id: "firewall",
    title: "2. HIPAA PHI Safe Harbor Gate",
    subtitle: "Pre-Inference De-Identification",
    icon: ShieldCheck,
    tech: "Inline LlmHealthcareFirewall",
    latency: "45ms",
    status: "completed",
    errorPolicy: "Zero-Tolerance Abort if Unsanitized PHI Detected",
    details: "Scans 18 Safe Harbor identifiers. Replaces patient names, dates, phone numbers, and facilities with cryptographic vault tokens.",
    outputPayload: '{"phiMasked": 7, "tokenHash": "sha256:7f83b1...", "auditStatus": "PASSED"}'
  },
  {
    id: "scoring",
    title: "3. Dual-LLM Clinical Scoring",
    subtitle: "DBT-ARS & CTRS Item Engine",
    icon: Cpu,
    tech: "OpenAI gpt-4o-mini + Gemini Failover",
    latency: "840ms",
    status: "completed",
    errorPolicy: "Automatic Sub-second Failover to Gemini 2.0 Flash",
    details: "Bound by strict JSON schema. Scores Linehan DBT Validation/Chain Analysis or Beck CTRS Socratic discovery against gold standard guidelines.",
    outputPayload: '{"modality": "DBT", "overallAdherence": 87, "competencyStatus": "COMPETENT"}'
  },
  {
    id: "anchor",
    title: "4. Verbatim Quote Verification",
    subtitle: "Timestamp Evidence Anchoring",
    icon: Layers,
    tech: "Acoustic-Text Correlation Subsystem",
    latency: "110ms",
    status: "completed",
    errorPolicy: "Deterministic String-Alignment Verification",
    details: "Guarantees zero AI hallucination: Every item score is mathematically anchored to an exact transcript offset and verbatim dialogue snippet.",
    outputPayload: '{"anchoredQuotes": 5, "hallucinationRisk": 0.0, "timestampPrecision": "99.8%"}'
  },
  {
    id: "dispatch",
    title: "5. Clinical Notes & EHR Dispatch",
    subtitle: "SOAP/DAP & Supervisor Webhooks",
    icon: FileText,
    tech: "Azure Service Bus / Inngest Worker",
    latency: "180ms",
    status: "completed",
    errorPolicy: "Dead Letter Queue after 5 unhandled attempts",
    details: "Generates clinical SOAP note with ICD-10 suggestions, logs supervisor coaching actions, and delivers encrypted JSON payload to EHR.",
    outputPayload: '{"ehrDispatched": true, "soapGenerated": true, "supervisorNotified": true}'
  }
];

export function WorkflowCanvas() {
  const [pipeline, setPipeline] = useState<PipelineStep[]>(INITIAL_PIPELINE);
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(INITIAL_PIPELINE[2]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    const steps = [...pipeline].map(s => ({ ...s, status: "idle" as const }));
    setPipeline(steps);

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setActiveStepIndex(current);
        setSelectedStep(steps[current]);
        setPipeline(prev => 
          prev.map((s, idx) => ({
            ...s,
            status: idx === current ? "running" : idx < current ? "completed" : "idle"
          }))
        );
        current++;
      } else {
        clearInterval(interval);
        setPipeline(prev => prev.map(s => ({ ...s, status: "completed" as const })));
        setIsSimulating(false);
        setActiveStepIndex(-1);
      }
    }, 700);
  };

  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <WorkflowIcon className="h-5 w-5 text-teal-600" />
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                End-to-End Clinical Processing Architecture
              </h3>
              <Badge variant="outline" className="text-[11px] font-bold border-teal-500/30 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40">
                Inngest & Azure Service Bus
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Event-driven pipeline orchestration: from raw audio stream to HIPAA-sanitized scoring, anchored quotes, and EHR dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={runSimulation}
              disabled={isSimulating}
              className="h-8 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shadow-xs"
            >
              <Play className={`h-3.5 w-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Simulating Execution..." : "Simulate Packet Flow"}</span>
            </Button>
          </div>
        </div>

        {/* 5-Node Interactive Horizontal Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          {pipeline.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep.id === step.id;
            const isCurrentActive = activeStepIndex === index;

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all duration-200 relative overflow-hidden ${
                  isSelected 
                    ? "bg-[var(--color-surface)] border-teal-500 shadow-sm ring-2 ring-teal-500/20" 
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-slate-300 dark:hover:border-slate-700"
                } ${isCurrentActive ? "ring-2 ring-amber-500 animate-pulse" : ""}`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    step.status === "completed" 
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" 
                      : step.status === "running"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 animate-spin"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[var(--color-text-muted)]">
                    {step.latency}
                  </span>
                </div>

                <div className="font-bold text-xs text-[var(--color-text-primary)] truncate mb-0.5">
                  {step.title}
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] truncate mb-2">
                  {step.subtitle}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono border-t border-[var(--color-border-subtle)] pt-1.5 mt-auto">
                  <span className="text-[var(--color-text-muted)] truncate max-w-[90px]">{step.tech.split("/")[0]}</span>
                  {step.status === "completed" ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="h-2.5 w-2.5" /> OK
                    </span>
                  ) : step.status === "running" ? (
                    <span className="text-amber-600 font-bold">RUNNING</span>
                  ) : (
                    <span className="text-slate-400">QUEUED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Node Telemetry Inspector */}
        <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-teal-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                Step Telemetry & Resilience Spec: {selectedStep.title}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono border-[var(--color-border)]">
                Target SLA: &lt; 1500ms
              </Badge>
              <Badge variant="outline" className="text-[10px] font-mono border-teal-500/30 text-teal-700 dark:text-teal-300">
                Idempotency Key: session_id + hash
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Left: Architecture & Failure Policy */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)] block mb-1">
                  Functional Purpose:
                </span>
                <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">
                  {selectedStep.details}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                    Technology & Cloud Service
                  </span>
                  <span className="text-xs font-mono font-semibold text-[var(--color-text-primary)]">
                    {selectedStep.tech}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                    Failure Policy & Circuit Breaker
                  </span>
                  <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                    {selectedStep.errorPolicy}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Output Payload Preview */}
            <div className="p-3 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1 flex items-center justify-between">
                <span>Verified Output Payload</span>
                <span className="text-emerald-600 font-mono text-[9px]">Schema Validated</span>
              </span>
              <pre className="flex-1 p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[10px] font-mono text-[var(--color-text-secondary)] overflow-x-auto">
                {selectedStep.outputPayload}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
