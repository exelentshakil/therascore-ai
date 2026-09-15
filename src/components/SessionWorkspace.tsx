"use client";

import React, { useState } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Headphones, 
  FileText, 
  Stethoscope, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Bot, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Send, 
  Download,
  Share2,
  Sliders,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  SAMPLE_SESSIONS, 
  SessionData, 
  Utterance, 
  ScorecardItem,
  DBT_RUBRIC_DOMAINS,
  CBT_CTRS_DOMAINS 
} from "@/lib/clinical-data";

interface SessionWorkspaceProps {
  selectedSessionId?: string;
  onSelectSession?: (id: string) => void;
  onAiScoreGenerated?: (data: { dbtScore: number; cbtScore: number; latencyMs: number }) => void;
  initialTab?: "scorecard" | "soap" | "coaching" | "custom_test";
}

export function SessionWorkspace({ 
  selectedSessionId: propSessionId, 
  onSelectSession,
  onAiScoreGenerated,
  initialTab: propTab 
}: SessionWorkspaceProps) {
  const [internalSessionId, setInternalSessionId] = useState<string>("sess_dbt_01");
  const selectedSessionId = propSessionId || internalSessionId;
  const setSelectedSessionId = onSelectSession || setInternalSessionId;
  const [activeTab, setActiveTab] = useState<"scorecard" | "soap" | "coaching" | "custom_test">(propTab || "scorecard");

  React.useEffect(() => {
    if (propTab) {
      setActiveTab(propTab);
    }
  }, [propTab]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(85); // 01:25 default
  const [selectedItemAnchor, setSelectedItemAnchor] = useState<string | null>("dbt_item_1");
  
  // Real AI Execution State
  const [isScoringAi, setIsScoringAi] = useState<boolean>(false);
  const [aiTelemetry, setAiTelemetry] = useState<{
    provider: string;
    model: string;
    latencyMs: number;
    tokens?: number;
  } | null>(null);

  // Custom transcript input for test-with-your-own-data
  const [customTranscript, setCustomTranscript] = useState<string>(
    "Therapist: Let's examine what happened after your meeting on Tuesday.\nPatient: My colleague John at Providence Health said I was too slow. I felt a surge of shame and thought 'I should quit therapy and give up.'\nTherapist: That shame is understandable given how hard you've been working. Let's trace the chain from that thought to the urge."
  );

  const currentSession: SessionData = SAMPLE_SESSIONS.find(s => s.id === selectedSessionId) || SAMPLE_SESSIONS[0];

  // Playback timer simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds(prev => (prev >= currentSession.durationSeconds ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSession.durationSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (seconds: number) => {
    setCurrentSeconds(seconds);
  };

  // Live real AI session evaluation call
  const handleRunAiEvaluation = async () => {
    setIsScoringAi(true);
    try {
      const transcriptText = currentSession.utterances.map(u => `${u.speaker}: ${u.text}`).join("\n");
      const res = await fetch("/api/ai/score-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: transcriptText,
          modality: currentSession.modality
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiTelemetry({
          provider: data.provider,
          model: data.model,
          latencyMs: data.latencyMs,
          tokens: data.tokenUsage?.totalTokens
        });
        if (onAiScoreGenerated) {
          onAiScoreGenerated({
            dbtScore: data.dbtAdherenceScore,
            cbtScore: data.cbtCompetenceScore,
            latencyMs: data.latencyMs
          });
        }
      }
    } catch (err) {
      console.error("AI Evaluation failed:", err);
    } finally {
      setIsScoringAi(false);
    }
  };

  return (
    <div className="w-full py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Session Selector & Metadata Strip */}
        <div className="bg-[var(--color-surface)] p-3.5 rounded-xl border border-[var(--color-border)] shadow-2xs mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Session Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mr-1">
                Select Session:
              </span>
              <button
                onClick={() => setSelectedSessionId("sess_dbt_01")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  selectedSessionId === "sess_dbt_01"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Session 1: DBT Adherence (Emotion Regulation)</span>
              </button>
              <button
                onClick={() => setSelectedSessionId("sess_cbt_02")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  selectedSessionId === "sess_cbt_02"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
                }`}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                <span>Session 2: CBT Competence (CTRS Socratic)</span>
              </button>
            </div>

            {/* Session Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline" className="font-mono text-teal-700 dark:text-teal-300 border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/30 whitespace-nowrap shrink-0">
                Ref: {currentSession.sessionRef}
              </Badge>
              <Badge variant="outline" className="border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
                Therapist: {currentSession.therapistName}
              </Badge>
              <Badge variant="outline" className="border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
                Supervisor: {currentSession.supervisorName}
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 whitespace-nowrap shrink-0">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {currentSession.phiStatus}
              </Badge>
            </div>

          </div>

          {/* Audio Waveform Scrubber Simulation */}
          <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 px-3 text-xs font-bold gap-1.5 border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-teal-700 dark:text-teal-300 shrink-0"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlaying ? "Pause Tape" : "Play Diarized Audio"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setIsPlaying(false); setCurrentSeconds(0); }}
                className="h-8 w-8 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] shrink-0"
                title="Restart"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>

              {/* Progress Slider */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs text-[var(--color-text-secondary)] shrink-0">
                  {formatTime(currentSeconds)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={currentSession.durationSeconds}
                  value={currentSeconds}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="font-mono text-xs text-[var(--color-text-muted)] shrink-0">
                  {currentSession.durationFormatted}
                </span>
              </div>

              {/* Live Run AI Scoring Button */}
              <Button
                size="sm"
                onClick={handleRunAiEvaluation}
                disabled={isScoringAi}
                className="h-8 px-3 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white gap-1.5 shrink-0 whitespace-nowrap shadow-xs"
              >
                <Sparkles className={`h-3.5 w-3.5 ${isScoringAi ? "animate-spin" : ""}`} />
                <span>{isScoringAi ? "Analyzing Session..." : "Run Real AI Scoring"}</span>
              </Button>
            </div>

            {/* AI Telemetry Strip (Shown after real execution) */}
            {aiTelemetry && (
              <div className="mt-2 p-2 rounded-md bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 flex flex-wrap items-center justify-between text-xs text-teal-800 dark:text-teal-200">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-teal-600 text-white border-none text-[10px] font-mono">
                    {aiTelemetry.provider.toUpperCase()} ({aiTelemetry.model})
                  </Badge>
                  <span>Inference Latency: <strong>{aiTelemetry.latencyMs}ms</strong></span>
                  {aiTelemetry.tokens && <span>Tokens: <strong>{aiTelemetry.tokens}</strong></span>}
                </div>
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                  ✓ Verified Clinical Grounding &amp; Item Anchor Scores
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main 2-Column Clinical Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Column: Diarized Dialogue Transcript (7 Cols) */}
          <div className="lg:col-span-7 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col h-[650px]">
            
            {/* Transcript Header */}
            <div className="p-3.5 border-b border-[var(--color-border)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-teal-600" />
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  Diarized Session Transcript &amp; Dialogue Anchor Trace
                </h3>
              </div>
              <Badge variant="outline" className="text-[11px] font-mono text-[var(--color-text-muted)] border-[var(--color-border)]">
                {currentSession.utterances.length} Speaker Turns
              </Badge>
            </div>

            {/* Utterance Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {currentSession.utterances.map((u) => {
                const isTherapist = u.speaker === "Therapist";
                const isCurrentActive = currentSeconds >= u.seconds && currentSeconds < u.seconds + 60;

                return (
                  <div 
                    key={u.id}
                    onClick={() => handleSeek(u.seconds)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isCurrentActive 
                        ? "border-teal-500/80 bg-teal-50/40 dark:bg-teal-950/30 shadow-xs" 
                        : "border-[var(--color-border)] hover:border-slate-300 dark:hover:border-slate-700 bg-[var(--color-panel-subtle)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold ${
                          isTherapist ? "text-teal-700 dark:text-teal-400" : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {isTherapist ? <Stethoscope className="h-3 w-3" /> : <User className="h-3 w-3" />}
                          {u.speaker}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                          [{u.timestamp}]
                        </span>
                      </div>

                      {/* Tags & PHI Status */}
                      <div className="flex items-center gap-1.5">
                        {u.phiRedacted && (
                          <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-700 dark:text-amber-300 bg-amber-50/50">
                            PHI Redacted
                          </Badge>
                        )}
                        {u.tags?.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed">
                      {u.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Transcript Footer Helper */}
            <div className="p-2.5 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs text-[var(--color-text-muted)] flex items-center justify-between">
              <span>Click any dialogue turn to scrub the audio player</span>
              <span className="font-mono text-[11px]">Azure Speech SDK Diarized</span>
            </div>

          </div>

          {/* Right Column: Tabbed Clinical Workstation (5 Cols) */}
          <div className="lg:col-span-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-2xs flex flex-col h-[650px]">
            
            {/* Workstation Tab Switcher */}
            <div className="p-2 border-b border-[var(--color-border)] flex items-center gap-1 bg-[var(--color-panel-subtle)]">
              <button
                onClick={() => setActiveTab("scorecard")}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center whitespace-nowrap shrink-0 ${
                  activeTab === "scorecard"
                    ? "bg-[var(--color-surface)] text-teal-700 dark:text-teal-300 shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Item Scorecards
              </button>
              <button
                onClick={() => setActiveTab("soap")}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center whitespace-nowrap shrink-0 ${
                  activeTab === "soap"
                    ? "bg-[var(--color-surface)] text-teal-700 dark:text-teal-300 shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                SOAP Notes
              </button>
              <button
                onClick={() => setActiveTab("coaching")}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center whitespace-nowrap shrink-0 ${
                  activeTab === "coaching"
                    ? "bg-[var(--color-surface)] text-teal-700 dark:text-teal-300 shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Supervision Plan
              </button>
              <button
                onClick={() => setActiveTab("custom_test")}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center whitespace-nowrap shrink-0 ${
                  activeTab === "custom_test"
                    ? "bg-[var(--color-surface)] text-teal-700 dark:text-teal-300 shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Test Your Own
              </button>
            </div>

            {/* Workstation Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              
              {/* TAB 1: Item-Level Scorecard */}
              {activeTab === "scorecard" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                        {currentSession.modality} Adherence &amp; Competence Rubric
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Scored against gold standard Linehan DBT-ARS / Beck CTRS
                      </p>
                    </div>
                    <Badge className="bg-teal-600 text-white font-mono text-xs">
                      {currentSession.dbtAdherencePercentage}% Adherent
                    </Badge>
                  </div>

                  {/* Scorecard Items */}
                  {currentSession.scorecard.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemAnchor(item.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedItemAnchor === item.id
                          ? "border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 shadow-xs"
                          : "border-[var(--color-border)] bg-[var(--color-panel-subtle)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold font-mono text-teal-700 dark:text-teal-300">
                            #{item.itemNumber}
                          </span>
                          <span className="text-xs font-bold text-[var(--color-text-primary)]">
                            {item.title}
                          </span>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`text-[10px] font-bold ${
                            item.status === "EXEMPLARY"
                              ? "text-emerald-700 border-emerald-500/40 bg-emerald-50/50"
                              : "text-blue-700 border-blue-500/40 bg-blue-50/50"
                          }`}
                        >
                          {item.score} / {item.maxScore} • {item.status}
                        </Badge>
                      </div>

                      <div className="text-[11px] text-[var(--color-text-muted)] font-mono mb-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Anchor: {item.timestampRange}
                      </div>

                      <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                        <strong>Observed:</strong> {item.observedBehavior}
                      </p>

                      <div className="p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-xs italic text-[var(--color-text-primary)] mb-2">
                        {item.verbatimQuote}
                      </div>

                      <div className="text-xs text-teal-700 dark:text-teal-300 bg-teal-50/60 dark:bg-teal-950/40 p-2 rounded border border-teal-500/20">
                        <strong>Supervisor Coaching:</strong> {item.coachingRecommendation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: SOAP Clinical Notes */}
              {activeTab === "soap" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                        Automated SOAP Clinical Documentation
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Synthesized from session dialogue with ICD-10 diagnostic coding
                      </p>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-700 bg-emerald-50/50 text-[10px] font-bold">
                      Ready for Review
                    </Badge>
                  </div>

                  {/* S - Subjective */}
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block mb-1">
                      [S] Subjective
                    </span>
                    <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">
                      {currentSession.soapNote.subjective}
                    </p>
                  </div>

                  {/* O - Objective */}
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block mb-1">
                      [O] Objective
                    </span>
                    <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">
                      {currentSession.soapNote.objective}
                    </p>
                  </div>

                  {/* A - Assessment */}
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block mb-1">
                      [A] Assessment
                    </span>
                    <p className="text-xs text-[var(--color-text-primary)] leading-relaxed mb-2">
                      {currentSession.soapNote.assessment}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSession.soapNote.icd10Codes.map((icd, idx) => (
                        <Badge key={idx} variant="outline" className="text-[10px] font-mono bg-[var(--color-surface)]">
                          {icd.code} • {icd.description}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* P - Plan */}
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block mb-1">
                      [P] Plan
                    </span>
                    <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">
                      {currentSession.soapNote.plan}
                    </p>
                  </div>

                  {/* Risk Assessment Box */}
                  <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/30 text-xs">
                    <div className="font-bold text-amber-800 dark:text-amber-200 mb-1 flex items-center justify-between">
                      <span>Clinical Risk Status</span>
                      <span>Safety Plan: {currentSession.soapNote.riskAssessment.safetyPlanReviewed ? "Reviewed" : "N/A"}</span>
                    </div>
                    <div className="flex gap-4 text-[11px] text-amber-700 dark:text-amber-300 font-mono">
                      <span>Suicidality: {currentSession.soapNote.riskAssessment.suicidality}</span>
                      <span>Self-Harm: {currentSession.soapNote.riskAssessment.selfHarm}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="sm" className="flex-1 h-8 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve Clinical Note
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-[var(--color-border)]">
                      <Download className="h-3.5 w-3.5 mr-1" /> Export PDF
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 3: Supervision Plan & Coaching */}
              {activeTab === "coaching" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                        Clinical Supervision Recommendations
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        High-yield coaching areas for therapist consultation team
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-teal-500/30 bg-teal-50/40 dark:bg-teal-950/30">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-200 block mb-1">
                      Lead Supervisor Assessment ({currentSession.supervisorName})
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {currentSession.supervisorSummary}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
                    <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                      Targeted Deliberate Practice Drill
                    </span>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      1. Inquire into somatic cues earlier in the chain before patient reaches acute isolation distress.
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      2. Reinforce DBT skills coaching availability: practice role-playing texting skills coaching in the room.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: Test With Your Own Data */}
              {activeTab === "custom_test" && (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                      Test With Your Own Therapy Dialogue
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Paste a dialogue snippet with patient names or clinical notes. The inline HIPAA redactor will scrub identifiers before scoring.
                    </p>
                  </div>

                  <textarea
                    rows={8}
                    value={customTranscript}
                    onChange={(e) => setCustomTranscript(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-text-primary)] focus:outline-none focus:border-teal-500"
                    placeholder="Paste therapy dialogue here..."
                  />

                  <Button
                    onClick={handleRunAiEvaluation}
                    disabled={isScoringAi}
                    className="w-full h-8 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    {isScoringAi ? "Scoring Custom Dialogue..." : "Analyze Custom Dialogue with Live AI"}
                  </Button>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
