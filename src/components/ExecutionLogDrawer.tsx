"use client";

import React, { useState } from "react";
import { 
  ChevronUp, 
  ChevronDown, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Copy, 
  Check, 
  X,
  Maximize2,
  Minimize2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TelemetryLog {
  timestamp: string;
  level: "INFO" | "SEC" | "AI" | "EHR";
  stage: string;
  durationMs: number;
  message: string;
}

const SAMPLE_LOGS: TelemetryLog[] = [
  { timestamp: "14:22:01.104", level: "INFO", stage: "AUDIO_INGEST", durationMs: 620, message: "Acoustic diarization completed. 48 turns separated across 2 speakers." },
  { timestamp: "14:22:01.724", level: "SEC", stage: "HIPAA_FIREWALL", durationMs: 45, message: "Pre-inference Safe Harbor scrubbed 7 PHI tokens. Hash: sha256:8f4c2e..." },
  { timestamp: "14:22:01.769", level: "AI", stage: "LLM_INFERENCE", durationMs: 840, message: "OpenAI gpt-4o-mini parsed DBT-ARS schema. 5 scorecard items validated." },
  { timestamp: "14:22:02.609", level: "AI", stage: "QUOTE_ANCHOR", durationMs: 110, message: "Acoustic-transcript alignment confirmed verbatim quote [14:22 - 16:15]." },
  { timestamp: "14:22:02.719", level: "EHR", stage: "EHR_DISPATCH", durationMs: 180, message: "SOAP clinical note and supervisor coaching webhook delivered to EHR gateway." }
];

export function ExecutionLogDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("ALL");

  const totalTimeMs = SAMPLE_LOGS.reduce((acc, l) => acc + l.durationMs, 0);

  const filteredLogs = filter === "ALL" 
    ? SAMPLE_LOGS 
    : SAMPLE_LOGS.filter(l => l.level === filter);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(SAMPLE_LOGS, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 z-40 bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-lg transition-all duration-200">
      
      {/* Drawer Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-[var(--color-panel-subtle)] transition-colors text-xs select-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
            <Terminal className="h-4 w-4 text-teal-600" />
            <span>Clinical Pipeline Telemetry & Audit Stream</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono border-teal-500/30 text-teal-700 dark:text-teal-300">
              Turnaround: {totalTimeMs}ms
            </Badge>
            <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
              HIPAA Audit: PASSED
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--color-text-muted)] hidden md:inline">
            {isOpen ? "Click to collapse" : "Click to inspect event logs"}
          </span>
          <button 
            className="p-1 rounded text-[var(--color-text-secondary)]"
            aria-label="Toggle drawer"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="p-4 border-t border-[var(--color-border-subtle)] bg-slate-950 text-slate-200 max-h-72 overflow-y-auto">
          
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Filter Stream:</span>
              {["ALL", "SEC", "AI", "EHR"].map(f => (
                <button
                  key={f}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilter(f);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                    filter === f ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {filteredLogs.map((log, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 py-1 border-b border-slate-900/60">
                <span className="text-slate-500 text-[10px] shrink-0">{log.timestamp}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                  log.level === "SEC" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                  log.level === "AI" ? "bg-indigo-950 text-indigo-400 border border-indigo-800" :
                  log.level === "EHR" ? "bg-cyan-950 text-cyan-400 border border-cyan-800" :
                  "bg-slate-800 text-slate-300"
                }`}>
                  {log.stage}
                </span>
                <span className="text-slate-400 text-[10px] shrink-0 font-bold">{log.durationMs}ms</span>
                <span className="text-slate-300 text-xs flex-1">{log.message}</span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
