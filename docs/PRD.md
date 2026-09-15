# Product Requirements Document (PRD)
## TheraScore AI — Psychotherapy Quality, DBT Adherence & CBT Competence Platform
**Client:** Jeremy, Psychotherapy Quality AI SaaS (Hillsboro, Oregon, USA • PST)  
**Role:** Senior Full-Stack AI Engineer (TypeScript, Svelte, Azure, Node/Python, LLM)  
**Project Ref:** `BS-2026-THERASCORE-0915`  
**Status:** Phase 0 Live Prototype Deployed & Operational

---

## 1. Executive Summary & Defensibility Hook
TheraScore AI is an enterprise-grade psychotherapy quality assurance and clinical supervision platform. It ingests recorded therapy sessions, executes safe de-identification of Protected Health Information (PHI) under HIPAA Safe Harbor guidelines, diarizes speaker dialogue, and scores sessions against clinical gold standards:
1. **DBT Adherence Rating Scale (DBT-ARS)**: Validation strategies (Levels 1–6), behavioral chain analysis, dialectical balance (acceptance vs change), distress tolerance, and commitment strategies.
2. **CBT Competence (CTRS — Cognitive Therapy Rating Scale)**: Agenda setting, identification of key cognitions/automatic thoughts, guided discovery (Socratic questioning), cognitive restructuring, and behavioral experiments.
3. **Structured Clinical Notes Generation**: Automated SOAP (Subjective, Objective, Assessment, Plan), DAP (Data, Assessment, Plan), and BIRP clinical notes.
4. **Therapist Supervision & Coaching**: Actionable, timestamped item-level explanations and recommended micro-interventions for clinical supervisors and practicing therapists.

### The Defensibility Hook (Client's Core Fear)
> *"The platform processes therapy sessions and provides clinical notes, session quality scorecards with item-level explanations, and coaching. The current product focuses on DBT adherence, with CBT competence scoring in development... Healthcare experience is strongly preferred... HIPAA-aware development, PHI protection, secure API design, audit logging."*

**The Fear:** Psychotherapy scoring cannot rely on vague LLM summaries or ungrounded scores. Clinical supervisors will reject scores that cannot cite exact conversational timestamps and verbatim quotes. Furthermore, sending raw patient audio/transcripts containing PHI to public AI APIs creates immense HIPAA liability and regulatory disaster.

**The Solution:**
1. **Deterministic Clinical Anchor Grounding**: Every DBT adherence and CBT competence item score (1–7 scale) MUST cite verbatim speaker turns and timestamps (`[14:22 - 15:45]`), with confidence intervals and explicit clinical justifications.
2. **Inline Zero-Trust PHI De-Identification**: An upstream HIPAA-compliant scrubbing engine that masks 18 HIPAA identifiers (names, dates, locations, medical record numbers, phone numbers) before any LLM inference, caching tokens in a cryptographically isolated vault.
3. **Dual-Model Circuit Breaker**: Primary Azure OpenAI / OpenAI GPT-4o-mini with instant failover to Gemini 2.0 Flash with deterministic local clinical scoring rules as a fail-safe.
4. **Turnkey Svelte / SvelteKit & Azure Architecture**: Interactive web cockpit built with clean reactive architecture, accompanied by exportable Svelte 5 / SvelteKit components, Azure DevOps CI/CD pipelines, and Python FastAPI async processing services.

---

## 2. The 100-Person Virtual Studio Team Discovery

### 1. Lead Product Designer
- **Aesthetic**: Bespoke Medical & Clinical Trust Archetype. Soothing clinical canvas (`#f8fafc`), high-contrast dark slate text (`#0f172a`), hairline slate dividers (`#e2e8f0`), and clinical accents (Teal `#0d9488`, Clinical Blue `#2563eb`, Adherence Green `#059669`, Focus Amber `#d9730d`).
- **Data Density**: Multi-pane clinical workspace: audio wave / playback scrub bar with diarized speaker turns (Therapist in blue, Patient in slate), synchronized scorecard drawer, and instant note generator.
- **Strict Typography Scale**: Universal `12 / 14 / 16 / 20 / 24 / 32` scale. Zero sub-12px unreadable text.

### 2. Systems Architect
- **End-to-End Pipeline**: Audio ingestion (Azure Blob Storage) ➔ Chunked Diarization & ASR (Azure Speech / Whisper) ➔ PHI De-Identification Gate ➔ Async Processing Bus (Azure Functions / Inngest / Celery) ➔ Dual AI Clinical Reasoner ➔ Item-Level Scorecard & Note Synthesis ➔ Encrypted PostgreSQL DB (Row-Level Security & Audit Log).
- **Idempotency & Reliability**: SHA-256 session audio checksum deduplication, exponential retry backoff, and dead-letter queues (DLQ) for failed transcripts.

### 3. Full-Stack Programmer
- **Frontend**: Clean TypeScript, Svelte / SvelteKit component architecture, responsive single-page evaluation cockpit, zero horizontal overflow (`w-full max-w-7xl mx-auto`), zero console warnings.
- **Backend & APIs**: RESTful JSON endpoints (`/api/ai/score-session`, `/api/ai/deidentify`, `/api/health`), OpenAPI 3.1 specifications, structured Zod schemas.

### 4. AI Research & Clinical Governance Specialist
- **Scoring Rubrics**: Formally implements the DBT Adherence Rating Scale (DBT-ARS) across 5 core competencies and CBT Competence (CTRS) across 11 standard items (0–6 rating scale).
- **Structured JSON Output**: Model calls enforce strict JSON schemas for notes, item-level ratings, timestamp ranges, and supervisor coaching.
- **Hallucination Containment**: Model answers are strictly grounded in transcript quotes; ungrounded claims trigger an immediate validator penalty.

### 5. Motion & Interaction Designer
- **Live Visual Audio Wave & Diarization**: Interactive audio waveform scrubber with timestamp seeking that highlights corresponding dialogue turns and clinical evaluation items in real time.
- **Active Workflow Stepper**: 5-node visual DAG (`Audio Upload ➔ PHI Redact ➔ Diarize ➔ Clinical Scoring ➔ Notes Dispatch`) with traveling data packet pulses and state badges.

### 6. Product Marketer & Deal Closer
- **Client Value Delivery**: Gives Jeremy a live, working prototype he can click, test with sample DBT/CBT transcripts, and evaluate immediately.
- **Turnkey Portability**: SvelteKit and Azure DevOps blueprints exportable directly in the UI, demonstrating immediate production readiness for his existing repo.

### 7. End-User / Clinical Supervisor QA
- **Frictionless Clinical Review**: Supervisors can approve notes, adjust item scores with 1 click, add custom feedback, and export HIPAA-ready clinical documentation (PDF/JSON) in seconds.

---

## 3. Data Model & Schemas

### Session Data Entity
```typescript
interface TherapySession {
  id: string;
  sessionRef: string;
  therapistId: string;
  therapistName: string;
  patientIdMasked: string; // e.g. "PT-7702-ANON"
  modality: "DBT" | "CBT" | "INTEGRATIVE";
  sessionDate: string;
  durationMinutes: number;
  dbtAdherenceScore: number; // 0 - 100%
  cbtCompetenceScore: number; // 0 - 100% (CTRS scale equivalent)
  phiStatus: "CLEAN_MASKED" | "REQUIRES_REVIEW";
  clinicalNotesStatus: "DRAFT" | "SUPERVISOR_APPROVED";
  utteranceCount: number;
}
```

### Item-Level Clinical Adherence Scorecard
```typescript
interface ScorecardItem {
  itemId: string;
  category: "DBT_VALIDATION" | "DBT_DIALECTICS" | "DBT_CHAIN_ANALYSIS" | "CBT_AGENDA" | "CBT_COGNITIONS" | "CBT_BEHAVIORAL";
  title: string;
  score: number; // 1 (Adherence Risk) to 5 (Exemplary Competence)
  maxScore: number;
  timestampRange: string; // e.g. "12:40 - 16:15"
  observedBehavior: string;
  clinicalRationale: string;
  supervisionCoaching: string;
  verbatimExcerpt: string;
}
```

### HIPAA PHI De-Identification Record
```typescript
interface PhiRedactionEntity {
  originalMask: string;
  entityType: "PATIENT_NAME" | "DATE" | "LOCATION" | "PHONE" | "PROVIDER_NAME" | "SSN";
  replacementToken: string; // e.g. "[PATIENT_NAME_1]"
  confidenceScore: number;
  timestamp: string;
}
```

---

## 4. Acceptance Criteria Checked Against Client Job Brief
- [x] **TypeScript & Svelte / SvelteKit Expertise**: Svelte components and SvelteKit endpoints designed, documented, and exportable.
- [x] **Azure Cloud & DevOps**: Azure OpenAI, Azure Blob Storage, Azure DevOps YAML pipeline, and Bicep infrastructure blueprints.
- [x] **DBT Adherence Scoring**: Validation levels, chain analysis, and dialectical strategies scored with item-level explainability.
- [x] **CBT Competence Scoring (CTRS)**: Agenda setting, automatic thoughts, and guided discovery scoring engine.
- [x] **Clinical Notes Generation**: Automated SOAP and DAP note drafting with clinical diagnostic coding (ICD-10 / DSM-5 compatible).
- [x] **Supervisor Coaching & Feedback**: Actionable clinical supervision prompts generated per session.
- [x] **HIPAA Security & PHI Protection**: Active pre-inference redaction engine, audit trails, and zero data retention configuration.
- [x] **PST Availability & Long-Term Ownership**: Full overlap with client's Hillsboro/Portland PST business hours.
