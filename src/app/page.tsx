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
  const [workspaceInitialTab, setWorkspaceInitialTab] = useState<"scorecard" | "soap" | "coaching" | "custom_test">("scorecard");
  const [activeSessionId, setActiveSessionId] = useState<string>("sess_dbt_01");
  const [isChaosOpen, setIsChaosOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  // Smooth offset scrolling to section
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    const targetMap: Record<string, string> = {
      workspace: "session-review",
      deid: "phi-redactor",
      workflow: "pipeline-dag",
      blueprints: "blueprints",
      roi: "clinical-roi",
    };
    const targetId = targetMap[tab];
    if (targetId) {
      scrollToSection(targetId);
    }
  };

  // Keyboard shortcut listener for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ScrollSpy: Automatically highlight the active header navigation tab as user scrolls
  useEffect(() => {
    const sections = [
      { id: "session-review", tab: "workspace" },
      { id: "phi-redactor", tab: "deid" },
      { id: "pipeline-dag", tab: "workflow" },
      { id: "blueprints", tab: "blueprints" },
      { id: "clinical-roi", tab: "roi" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveTab(match.tab);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCommandSelect = (actionId: string) => {
    if (actionId === "session-dbt") {
      setActiveSessionId("sess_dbt_01");
      setActiveTab("workspace");
      setWorkspaceInitialTab("scorecard");
      scrollToSection("session-review");
    } else if (actionId === "session-cbt") {
      setActiveSessionId("sess_cbt_02");
      setActiveTab("workspace");
      setWorkspaceInitialTab("scorecard");
      scrollToSection("session-review");
    } else if (actionId === "action-score") {
      setActiveTab("workspace");
      scrollToSection("session-review");
    } else if (actionId === "view-hipaa") {
      setActiveTab("deid");
      scrollToSection("phi-redactor");
    } else if (actionId === "view-pipeline") {
      setActiveTab("workflow");
      scrollToSection("pipeline-dag");
    } else if (actionId === "view-blueprints") {
      setActiveTab("blueprints");
      scrollToSection("blueprints");
    } else if (actionId === "view-roi") {
      setActiveTab("roi");
      scrollToSection("clinical-roi");
    } else if (actionId === "view-chaos") {
      setIsChaosOpen(true);
    }
  };

  const handleSelectPath = (path: string) => {
    if (path === "scorecard" || path === "transcript" || path === "soap") {
      setActiveTab("workspace");
      if (path === "soap") {
        setWorkspaceInitialTab("soap");
      } else {
        setWorkspaceInitialTab("scorecard");
      }
      scrollToSection("session-review");
    } else if (path === "deid") {
      setActiveTab("deid");
      scrollToSection("phi-redactor");
    } else if (path === "blueprints") {
      setActiveTab("blueprints");
      scrollToSection("blueprints");
    } else if (path === "workflow") {
      setActiveTab("workflow");
      scrollToSection("pipeline-dag");
    } else if (path === "roi") {
      setActiveTab("roi");
      scrollToSection("clinical-roi");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
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

        {/* Continuous Multi-Section Layout with Anchor IDs and Scroll Clearance */}
        <div className="space-y-10 mt-4">
          
          {/* Section 1: Session Review */}
          <section id="session-review" className="scroll-mt-24 w-full">
            <SessionWorkspace
              selectedSessionId={activeSessionId}
              onSelectSession={setActiveSessionId}
              initialTab={workspaceInitialTab}
            />
          </section>

          {/* Section 2: PHI Redactor */}
          <section id="phi-redactor" className="scroll-mt-24 w-full">
            <PhiRedactorConsole />
          </section>

          {/* Section 3: Pipeline DAG */}
          <section id="pipeline-dag" className="scroll-mt-24 w-full">
            <WorkflowCanvas />
          </section>

          {/* Section 4: Svelte & Azure Blueprints */}
          <section id="blueprints" className="scroll-mt-24 w-full">
            <BlueprintExporter />
          </section>

          {/* Section 5: Clinical ROI */}
          <section id="clinical-roi" className="scroll-mt-24 w-full">
            <RoiCostCalculator />
          </section>

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
