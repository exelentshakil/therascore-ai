"use client";

import React, { useEffect, useState } from "react";
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Calculator, 
  Flame, 
  FileText, 
  Workflow as WorkflowIcon,
  X,
  ArrowRight,
  Sun,
  Moon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Clinical Sessions" | "Security & Architecture" | "Tools & Telemetry";
  icon: React.ElementType;
  shortcut?: string;
}

const COMMANDS: CommandItem[] = [
  { id: "session-dbt", title: "Open DBT Session: Sarah Jenkins (Urge Chain Analysis)", category: "Clinical Sessions", icon: FileText, shortcut: "D" },
  { id: "session-cbt", title: "Open CBT Session: Marcus Vance (CTRS Socratic Discovery)", category: "Clinical Sessions", icon: FileText, shortcut: "C" },
  { id: "action-score", title: "Execute Live Dual-LLM Adherence Scoring", category: "Clinical Sessions", icon: Sparkles, shortcut: "S" },
  { id: "view-hipaa", title: "Launch HIPAA Safe Harbor PHI De-Identification Console", category: "Security & Architecture", icon: ShieldCheck, shortcut: "H" },
  { id: "view-pipeline", title: "Inspect Inngest & Azure Service Bus Event Pipeline", category: "Security & Architecture", icon: WorkflowIcon, shortcut: "P" },
  { id: "view-blueprints", title: "Export Svelte 5 & Azure DevOps CI/CD Blueprints", category: "Security & Architecture", icon: Code2, shortcut: "B" },
  { id: "view-roi", title: "Calculate Clinic Supervision Hours Saved & Token ROI", category: "Tools & Telemetry", icon: Calculator, shortcut: "R" },
  { id: "view-chaos", title: "Trigger Chaos Engineering & Azure AI 503 Failover", category: "Tools & Telemetry", icon: Flame, shortcut: "X" },
];

export function CommandMenu({ isOpen, onClose, onSelectAction }: CommandMenuProps) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Handled by parent
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-[var(--color-surface)] w-full max-w-xl rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input */}
        <div className="p-3 border-b border-[var(--color-border-subtle)] flex items-center gap-2.5">
          <Search className="h-4 w-4 text-[var(--color-text-muted)] shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, session name, or tool..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)] bg-slate-100 dark:bg-slate-800 rounded border border-[var(--color-border)]">
            ESC
          </kbd>
        </div>

        {/* Command Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--color-text-muted)]">
              No matching clinical actions found.
            </div>
          ) : (
            filteredCommands.map(cmd => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onSelectAction(cmd.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-[var(--color-panel-subtle)] flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[var(--color-text-secondary)] group-hover:text-teal-600 transition-colors shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                        {cmd.title}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">
                        {cmd.category}
                      </div>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)] bg-slate-100 dark:bg-slate-800 rounded border border-[var(--color-border)] shrink-0">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[var(--color-panel-subtle)] border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
          <span className="font-mono text-[10px]">TheraScore Clinical Cockpit v2.4</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
}
