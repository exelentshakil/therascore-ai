"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoGrid } from "@/components/BentoGrid";
import { SessionWorkspace } from "@/components/SessionWorkspace";
import { PhiRedactorConsole } from "@/components/PhiRedactorConsole";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { RoiCostCalculator } from "@/components/RoiCostCalculator";
import { ChaosSimulatorModal } from "@/components/ChaosSimulatorModal";
import { CommandMenu } from "@/components/CommandMenu";
import { ExecutionLogDrawer } from "@/components/ExecutionLogDrawer";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("workspace");
  const [activeSessionId, setActiveSessionId] = useState<string>("sess_dbt_01");
  const [isChaosOpen, setIsChaosOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  // Keyboard shortcut listener for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommandSelect = (actionId: string) => {
    if (actionId === "session-dbt") {
      setActiveSessionId("sess_dbt_01");
      setActiveTab("workspace");
    } else if (actionId === "session-cbt") {
      setActiveSessionId("sess_cbt_02");
      setActiveTab("workspace");
    } else if (actionId === "action-score") {
      setActiveTab("workspace");
    } else if (actionId === "view-hipaa") {
      setActiveTab("deid");
    } else if (actionId === "view-pipeline") {
      setActiveTab("workflow");
    } else if (actionId === "view-blueprints") {
      setActiveTab("blueprints");
    } else if (actionId === "view-roi") {
      setActiveTab("roi");
    } else if (actionId === "view-chaos") {
      setIsChaosOpen(true);
    }
  };

  const handleSelectPath = (path: string) => {
    if (path === "scorecard" || path === "transcript" || path === "soap") {
      setActiveTab("workspace");
    } else if (path === "deid") {
      setActiveTab("deid");
    } else if (path === "blueprints") {
      setActiveTab("blueprints");
    } else if (path === "workflow") {
      setActiveTab("workflow");
    } else if (path === "roi") {
      setActiveTab("roi");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenChaos={() => setIsChaosOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* Executive Briefing & 1-Click Evaluation Cockpit */}
        <ReviewerTour
          onSelectPath={handleSelectPath}
        />

        {/* Micro-Observability Bento Grid */}
        <BentoGrid />

        {/* Active Tab View */}
        <div className="mt-2">
          {activeTab === "workspace" && (
            <SessionWorkspace
              selectedSessionId={activeSessionId}
              onSelectSession={setActiveSessionId}
            />
          )}

          {activeTab === "deid" && (
            <PhiRedactorConsole />
          )}

          {activeTab === "workflow" && (
            <WorkflowCanvas />
          )}

          {activeTab === "blueprints" && (
            <BlueprintExporter />
          )}

          {activeTab === "roi" && (
            <RoiCostCalculator />
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Telemetry Drawer */}
      <ExecutionLogDrawer />

      {/* Modals & Command Palettes */}
      <ChaosSimulatorModal
        isOpen={isChaosOpen}
        onClose={() => setIsChaosOpen(false)}
      />

      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectAction={handleCommandSelect}
      />

    </div>
  );
}
