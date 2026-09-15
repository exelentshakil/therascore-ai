"use client";

import React from "react";
import { useTheme } from "next-themes";
import { 
  ShieldCheck, 
  Activity, 
  Moon, 
  Sun, 
  Command, 
  AlertTriangle, 
  Sparkles, 
  FileCode2,
  Stethoscope,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onOpenCommand: () => void;
  onOpenChaos: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export function Header({ onOpenCommand, onOpenChaos, onSelectTab, activeTab }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand & Context */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-[var(--color-text-primary)] whitespace-nowrap">
                  TheraScore AI
                </span>
                <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold border-teal-500/30 text-teal-700 dark:text-teal-300 bg-teal-50/60 dark:bg-teal-950/40 whitespace-nowrap shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Clinical Supervision
                </Badge>
                <Badge variant="outline" className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40 whitespace-nowrap shrink-0">
                  <Lock className="h-2.5 w-2.5" />
                  HIPAA Enclave
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate hidden sm:block">
                DBT Adherence Rating Scale • CBT CTRS Competence • Azure AI Infrastructure
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Single-Line, Anti-Wrapping) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)] shrink-0">
            <button
              onClick={() => onSelectTab("workspace")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === "workspace"
                  ? "bg-[var(--color-surface)] text-[var(--color-brand)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Session Review
            </button>
            <button
              onClick={() => onSelectTab("deid")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === "deid"
                  ? "bg-[var(--color-surface)] text-[var(--color-brand)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              PHI Redactor
            </button>
            <button
              onClick={() => onSelectTab("workflow")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === "workflow"
                  ? "bg-[var(--color-surface)] text-[var(--color-brand)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Pipeline DAG
            </button>
            <button
              onClick={() => onSelectTab("blueprints")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === "blueprints"
                  ? "bg-[var(--color-surface)] text-[var(--color-brand)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Svelte & Azure Blueprints
            </button>
            <button
              onClick={() => onSelectTab("roi")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === "roi"
                  ? "bg-[var(--color-surface)] text-[var(--color-brand)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Clinical ROI
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* ⌘K Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCommand}
              className="h-8 px-2.5 text-xs text-[var(--color-text-secondary)] gap-1.5 hidden md:inline-flex border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] whitespace-nowrap shrink-0"
            >
              <Command className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              <span>Cockpit</span>
              <kbd className="text-[10px] font-mono bg-[var(--color-panel-subtle)] px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                ⌘K
              </kbd>
            </Button>

            {/* Chaos Simulator */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChaos}
              className="h-8 px-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-950/30 gap-1.5 whitespace-nowrap shrink-0"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Failover Test</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shrink-0"
              title="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}
