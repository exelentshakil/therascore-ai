"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  FileText, 
  AlertTriangle,
  RotateCcw,
  Zap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PhiTokenMatch } from "@/lib/llm-firewall";

const SAMPLE_CLINICAL_PHI = `Therapist: Good afternoon, Michael Stevens. I have your chart from St. Vincent Medical Center in Portland.
Patient: Thanks Dr. Elizabeth Warren. My wife Sarah called your clinic at (503) 555-0199 because my depression score reached 18 last week. My date of birth is 04/12/1988 and my MRN is MRN-4910294.
Therapist: Let's review the treatment plan and ensure we protect all records under our HIPAA privacy agreement.`;

export function PhiRedactorConsole() {
  const [inputText, setInputText] = useState<string>(SAMPLE_CLINICAL_PHI);
  const [cleanText, setCleanText] = useState<string>("");
  const [phiTokens, setPhiTokens] = useState<PhiTokenMatch[]>([]);
  const [auditHash, setAuditHash] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDeidentify = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/deidentify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
      });

      if (res.ok) {
        const data = await res.json();
        setCleanText(data.cleanText);
        setPhiTokens(data.phiTokens);
        setAuditHash(data.sha256AuditHash);
      }
    } catch (err) {
      console.error("De-identification failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    handleDeidentify();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Inline HIPAA Safe Harbor PHI De-Identification Engine
                </h3>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-bold">
                  Pre-Inference Gate
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Scans and masks 18 HIPAA Safe Harbor identifiers (Patient Names, MRNs, Dates, Locations, Phone/Email) prior to any LLM API transmission.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText(SAMPLE_CLINICAL_PHI)}
                className="h-8 text-xs font-semibold gap-1.5 border-[var(--color-border)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Sample</span>
              </Button>
              <Button
                size="sm"
                onClick={handleDeidentify}
                disabled={isLoading}
                className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-xs"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>{isLoading ? "Redacting..." : "Execute PHI Scrub"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 2-Column Redactor Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Column: Raw Clinical Text Input */}
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col h-[480px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                Raw Clinical Text (Contains Live PHI)
              </span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              rows={12}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs sm:text-sm font-mono text-[var(--color-text-primary)] focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
              placeholder="Type or paste therapy notes with patient names..."
            />

            <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>Notice: Raw text never sent to public LLMs</span>
              <span className="font-mono text-[11px] text-amber-600 font-bold">Unsanitized State</span>
            </div>
          </div>

          {/* Right Column: De-Identified Output & Token Vault */}
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col h-[480px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Sanitized Safe Harbor Transcript
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-6 px-2 text-[11px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] gap-1"
              >
                {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {/* Sanitized Text Display */}
            <div className="flex-1 p-3 rounded-lg border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20 overflow-y-auto text-xs sm:text-sm font-mono text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">
              {cleanText || "Click 'Execute PHI Scrub' to view sanitized text."}
            </div>

            {/* Redacted Token Mapping Breakdown */}
            <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Cryptographic Token Vault ({phiTokens.length} Tokens Scrubbed)
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  Audit: {auditHash}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {phiTokens.map((item, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-[10px] font-mono border-emerald-500/40 bg-[var(--color-surface)] text-emerald-800 dark:text-emerald-200"
                  >
                    <span className="font-bold mr-1">{item.token}:</span>
                    <span className="line-through text-slate-400 mr-1">{item.originalText}</span>
                    <span className="text-[9px] text-[var(--color-text-muted)]">({item.category})</span>
                  </Badge>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
