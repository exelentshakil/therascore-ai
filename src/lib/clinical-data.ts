export interface Utterance {
  id: string;
  speaker: "Therapist" | "Patient";
  timestamp: string;
  seconds: number;
  text: string;
  tags?: string[];
  phiRedacted?: boolean;
}

export interface ScorecardItem {
  id: string;
  modality: "DBT" | "CBT";
  category: string;
  itemNumber: number;
  title: string;
  score: number; // 1-5 scale for DBT, 0-6 for CTRS
  maxScore: number;
  status: "EXEMPLARY" | "COMPETENT" | "DEVELOPING" | "ADHERENCE_RISK";
  timestampRange: string;
  observedBehavior: string;
  clinicalRationale: string;
  verbatimQuote: string;
  coachingRecommendation: string;
}

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  icd10Codes: { code: string; description: string }[];
  riskAssessment: {
    suicidality: "NONE" | "LOW_CHRONIC" | "MODERATE" | "ACUTE";
    selfHarm: "ABSENT" | "URGES_MANAGED" | "ACTIVE_EPISODE";
    safetyPlanReviewed: boolean;
  };
}

export interface SessionData {
  id: string;
  sessionRef: string;
  patientMaskedId: string;
  patientInitials: string;
  therapistName: string;
  supervisorName: string;
  modality: "DBT" | "CBT" | "INTEGRATIVE";
  sessionDate: string;
  durationFormatted: string;
  durationSeconds: number;
  dbtAdherencePercentage: number;
  cbtCompetencePercentage: number;
  overallCompetenceRating: "HIGH_ADHERENCE" | "COMPETENT" | "NEEDS_SUPERVISION";
  phiStatus: "CLEAN_MASKED" | "REQUIRES_AUDIT";
  utterances: Utterance[];
  scorecard: ScorecardItem[];
  soapNote: SoapNote;
  supervisorSummary: string;
}

export const SAMPLE_SESSIONS: SessionData[] = [
  {
    id: "sess_dbt_01",
    sessionRef: "SESS-2026-DBT-882",
    patientMaskedId: "PT-7702-ANON",
    patientInitials: "M.K.",
    therapistName: "Dr. Sarah Chen, PsyD",
    supervisorName: "Dr. Marcus Vance, ABPP (DBT Mentor)",
    modality: "DBT",
    sessionDate: "Sep 14, 2026",
    durationFormatted: "50:15",
    durationSeconds: 3015,
    dbtAdherencePercentage: 88.5,
    cbtCompetencePercentage: 76.0,
    overallCompetenceRating: "HIGH_ADHERENCE",
    phiStatus: "CLEAN_MASKED",
    supervisorSummary: "Strong adherence to DBT Linehan protocol. Exemplary behavioral chain analysis conducted from minutes 12:40 to 24:10 on self-harm urge after interpersonal conflict. Excellent Level 5 validation (historical context) and dialectical balance between validating emotional pain and demanding behavioral change.",
    utterances: [
      {
        id: "u_01",
        speaker: "Therapist",
        timestamp: "00:15",
        seconds: 15,
        text: "Welcome back, M. Let's start with our standard agenda. We need to check your diary card from the past week, prioritize targets according to the DBT hierarchy, and review the urges you logged on Thursday evening.",
        tags: ["Agenda Setting", "DBT Target Hierarchy"]
      },
      {
        id: "u_02",
        speaker: "Patient",
        timestamp: "00:48",
        seconds: 48,
        text: "Thursday was really rough. My supervisor at [WORKPLACE_1] made a sarcastic comment in front of the whole department. By 8 PM I was sitting on my bathroom floor holding my medication bottle, and the urge to overdose was an 8 out of 10.",
        tags: ["Target 1: Life-Threatening Behavior Urge"],
        phiRedacted: true
      },
      {
        id: "u_03",
        speaker: "Therapist",
        timestamp: "01:22",
        seconds: 82,
        text: "I am so glad you reached for your skills and are sitting here safely today. An 8 out of 10 urge is excruciating to sit with. Given your history with sudden public shame triggers, it makes complete sense your nervous system went into full survival alarm.",
        tags: ["Validation Level 5 (Context)", "Acceptance Strategy"]
      },
      {
        id: "u_04",
        speaker: "Patient",
        timestamp: "02:05",
        seconds: 125,
        text: "I felt so humiliated. I thought about texting you for skills coaching, but I felt like I was being a burden again.",
        tags: ["Coaching Barrier"]
      },
      {
        id: "u_05",
        speaker: "Therapist",
        timestamp: "02:30",
        seconds: 150,
        text: "Remember our DBT consultation agreement: you cannot be a burden by asking for skills coaching before engaging in target behavior. You only burn the bridge if you act on the urge. Let's do a complete behavioral chain analysis on Thursday evening from the moment of that meeting.",
        tags: ["Consultation Agreement", "Chain Analysis Induction"]
      },
      {
        id: "u_06",
        speaker: "Therapist",
        timestamp: "12:40",
        seconds: 760,
        text: "Let's pin the exact vulnerability factors leading into Thursday. Did you have adequate sleep Wednesday night, and had you taken your prescribed sertraline?",
        tags: ["Chain Analysis: Vulnerability Factors"]
      },
      {
        id: "u_07",
        speaker: "Patient",
        timestamp: "13:10",
        seconds: 790,
        text: "No, I stayed up until 3 AM reading emails, and I skipped breakfast. So my tank was already empty when my manager walked in.",
        tags: ["Vulnerability Factor Identified"]
      },
      {
        id: "u_08",
        speaker: "Therapist",
        timestamp: "14:22",
        seconds: 862,
        text: "Right. An empty tank lowers distress tolerance threshold dramatically. The prompting event was the comment at 10:15 AM. What was the immediate automatic cognitive link?",
        tags: ["Prompting Event", "Cognitive Links"]
      },
      {
        id: "u_09",
        speaker: "Patient",
        timestamp: "15:05",
        seconds: 905,
        text: "My thought was: 'Everyone knows I'm incompetent. I will be fired by Friday, and I'll end up evicted.'",
        tags: ["Catastrophizing", "Cognitive Link"]
      },
      {
        id: "u_10",
        speaker: "Therapist",
        timestamp: "15:35",
        seconds: 935,
        text: "That is a severe catastrophe escalation. And the physiological response followed immediately: racing heart, dissociation, knot in the throat. Where in that chain could we have injected TIPP or ACCEPTS before you reached the bathroom floor at 8 PM?",
        tags: ["Physiological Assessment", "Skill Replacement", "Change Strategy"]
      },
      {
        id: "u_11",
        speaker: "Patient",
        timestamp: "16:40",
        seconds: 1000,
        text: "I could have done cold water temperature dive right in the office restroom at 11 AM instead of stewing in ruminative brooding all afternoon.",
        tags: ["TIPP Skill Solution"]
      },
      {
        id: "u_12",
        speaker: "Therapist",
        timestamp: "17:15",
        seconds: 1035,
        text: "Exactly. Cold water dive activates the mammalian dive reflex and down-regulates sympathetic arousal within 60 seconds. Let's rehearse that right now so your body encodes the motor sequence.",
        tags: ["Behavioral Rehearsal", "Solution Analysis"]
      }
    ],
    scorecard: [
      {
        id: "dbt_item_1",
        modality: "DBT",
        category: "Validation Strategies",
        itemNumber: 1,
        title: "Level 5 Validation: Historical / Contextual Normalization",
        score: 5,
        maxScore: 5,
        status: "EXEMPLARY",
        timestampRange: "01:22 - 01:55",
        observedBehavior: "Therapist explicitly linked current extreme emotional reaction to past trauma and public shame vulnerability, validating that emotional response was understandable without validating the suicidal urge.",
        clinicalRationale: "Linehan DBT Adherence criteria requires clear distinction between validating the internal affect and validating dysfunctional action urges. Therapist executed this balance flawlessly.",
        verbatimQuote: "\"Given your history with sudden public shame triggers, it makes complete sense your nervous system went into full survival alarm.\"",
        coachingRecommendation: "Maintain this clean boundary. Excellent clinical modeling for DBT trainees."
      },
      {
        id: "dbt_item_2",
        modality: "DBT",
        category: "Behavioral Chain Analysis",
        itemNumber: 2,
        title: "Micro-Analysis of Links in Dysfunctional Chain",
        score: 5,
        maxScore: 5,
        status: "EXEMPLARY",
        timestampRange: "12:40 - 16:15",
        observedBehavior: "Systematically uncovered vulnerability factors (sleep deprivation, missed meal), prompting event (manager comment), cognitive links ('everyone knows I'm incompetent'), and somatic escalation.",
        clinicalRationale: "A standard DBT chain analysis must trace vulnerability factors -> prompting event -> cognitive/somatic links -> action urges. Unbroken sequence documented.",
        verbatimQuote: "\"Let's pin the exact vulnerability factors... Did you have adequate sleep... The prompting event was the comment... What was the immediate automatic cognitive link?\"",
        coachingRecommendation: "Ensure the patient generates the replacement links (as done here with TIPP) rather than the therapist lecturing."
      },
      {
        id: "dbt_item_3",
        modality: "DBT",
        category: "Dialectical Strategies",
        itemNumber: 3,
        title: "Dialectical Balance of Acceptance vs. Change",
        score: 4,
        maxScore: 5,
        status: "COMPETENT",
        timestampRange: "02:30 - 03:15",
        observedBehavior: "Balanced warm validation of patient's isolation fears with firm behavioral contingency reminder regarding coaching rules and target hierarchy.",
        clinicalRationale: "Therapist avoided both excessive softness (which reinforces avoidance) and harsh confrontation. Adherence maintained.",
        verbatimQuote: "\"You cannot be a burden by asking for skills coaching before engaging in target behavior. You only burn the bridge if you act on the urge.\"",
        coachingRecommendation: "Could introduce a dialectical metaphor (e.g., 'walking the middle path') to anchor the cognitive synthesis."
      },
      {
        id: "dbt_item_4",
        modality: "DBT",
        category: "Solution Analysis & Rehearsal",
        itemNumber: 4,
        title: "In-Session Behavioral Rehearsal & Skill Encoding",
        score: 5,
        maxScore: 5,
        status: "EXEMPLARY",
        timestampRange: "17:15 - 19:40",
        observedBehavior: "Guided immediate somatic rehearsal of the TIPP dive reflex and practiced cognitive restructuring for office restroom deployment.",
        clinicalRationale: "DBT emphasizes that intellectual agreement is insufficient; motor and physiological rehearsals in-session are required for emergency recall.",
        verbatimQuote: "\"Let's rehearse that right now so your body encodes the motor sequence.\"",
        coachingRecommendation: "Assign specific daily practice logs between sessions."
      },
      {
        id: "dbt_item_5",
        modality: "DBT",
        category: "Commitment Strategies",
        itemNumber: 5,
        title: "Troubleshooting Commitment for Next Week",
        score: 4,
        maxScore: 5,
        status: "COMPETENT",
        timestampRange: "45:10 - 48:30",
        observedBehavior: "Obtained concrete verbal commitment for filling out daily diary card and executing skills coaching call before urge hits level 6.",
        clinicalRationale: "Explicit agreement and troubleshooting obstacles (e.g., 'What will you do if phone battery dies?') met DBT-ARS guidelines.",
        verbatimQuote: "\"Let's agree: if your urge rises past a 5, your phone comes out to text skills coaching before you leave your desk.\"",
        coachingRecommendation: "Consider using 'playing devil's advocate' commitment strategy to test patient resolve."
      }
    ],
    soapNote: {
      subjective: "Patient M.K. presented for individual DBT session #14. Reports severe crisis on Thursday evening following interpersonal incident at work, with suicidal ideation urge peaking at 8/10. Patient refrained from self-harm and utilized safety protocols. Expressed guilt regarding contacting therapist between sessions.",
      objective: "Affect was tearful and constricted early in session, brightening significantly post-chain analysis. Speech coherent and goal-directed. Denies current intent or plan. Diary card reviewed and signed. Vital sign proxies and grounding exercises completed.",
      assessment: "Borderline Personality Disorder (F60.3) with recurrent self-directed crisis behaviors in response to perceived workplace rejection. Patient demonstrated strong ability to trace chain of events and engage in in-session TIPP rehearsal. Risk remains at chronic moderate baseline, managed with active DBT contract.",
      plan: "1. Continue weekly individual DBT and weekly DBT skills group. 2. Implement TIPP cold-dive protocol at work upon first sign of cognitive catastrophe. 3. Reaffirmed skills coaching protocol (patient agreed to text before urge reaches level 6). 4. Next appointment scheduled for Sep 21, 2026.",
      icd10Codes: [
        { code: "F60.3", description: "Borderline Personality Disorder" },
        { code: "Z91.51", description: "Personal history of intentional self-harm" },
        { code: "F41.1", description: "Generalized Anxiety Disorder" }
      ],
      riskAssessment: {
        suicidality: "LOW_CHRONIC",
        selfHarm: "URGES_MANAGED",
        safetyPlanReviewed: true
      }
    }
  },
  {
    id: "sess_cbt_02",
    sessionRef: "SESS-2026-CBT-419",
    patientMaskedId: "PT-9411-ANON",
    patientInitials: "R.J.",
    therapistName: "Dr. Alexander Ross, PhD",
    supervisorName: "Dr. Elena Rostova, MD (CBT Supervisor)",
    modality: "CBT",
    sessionDate: "Sep 12, 2026",
    durationFormatted: "46:30",
    durationSeconds: 2790,
    dbtAdherencePercentage: 64.0,
    cbtCompetencePercentage: 91.2,
    overallCompetenceRating: "HIGH_ADHERENCE",
    phiStatus: "CLEAN_MASKED",
    supervisorSummary: "Exemplary Beck Cognitive Therapy Rating Scale (CTRS) execution. Clear collaborative agenda set within first 5 minutes. Socratic questioning systematically tested the core belief 'I must succeed at everything to be worthy' without therapist lecturing.",
    utterances: [
      {
        id: "cbt_u_01",
        speaker: "Therapist",
        timestamp: "00:20",
        seconds: 20,
        text: "Hello R. Let's establish our agenda for today. We have our mood check, review of last week's thought record homework, and then we have 30 minutes to delve into the anxiety around your upcoming client presentation. How does that sound?",
        tags: ["CTRS Item 1: Agenda Setting"]
      },
      {
        id: "cbt_u_02",
        speaker: "Patient",
        timestamp: "00:55",
        seconds: 55,
        text: "That sounds right. My PHQ-9 score was down a couple points to 11, but the GAD-7 is still high at 14 because this presentation is driving me crazy. I'm convinced I'll freeze up on stage.",
        tags: ["Mood Check", "Automatic Thought"]
      },
      {
        id: "cbt_u_03",
        speaker: "Therapist",
        timestamp: "01:40",
        seconds: 100,
        text: "Let's put that automatic thought right at the center of our workspace: 'I will freeze up on stage and humiliate myself.' What percentage do you believe that thought right now?",
        tags: ["CTRS Item 7: Focusing on Key Cognitions", "Belief Rating"]
      },
      {
        id: "cbt_u_04",
        speaker: "Patient",
        timestamp: "02:10",
        seconds: 130,
        text: "About 90%. My chest gets tight just looking at the slide deck.",
        tags: ["Belief Rating: 90%"]
      },
      {
        id: "cbt_u_05",
        speaker: "Therapist",
        timestamp: "08:15",
        seconds: 495,
        text: "Let's examine the evidence together. In the 8 years you have worked in your industry, how many presentations have you delivered, and in how many of them did you actually freeze up completely and stop speaking?",
        tags: ["CTRS Item 6: Guided Discovery", "Evidence Gathering"]
      },
      {
        id: "cbt_u_06",
        speaker: "Patient",
        timestamp: "08:50",
        seconds: 530,
        text: "Well... I've probably given around 40 presentations. And honestly, I've never completely stopped speaking. I stumbled over a slide two years ago, but I finished.",
        tags: ["Cognitive Dissonance", "Evidence Contradiction"]
      },
      {
        id: "cbt_u_07",
        speaker: "Therapist",
        timestamp: "09:25",
        seconds: 565,
        text: "So 40 out of 40 were completed successfully, with one minor stumble. What cognitive distortion might be operating when your mind tells you that the 41st will be a catastrophic freeze?",
        tags: ["CTRS Item 9: Application of Cognitive Techniques", "Distortion Identification"]
      },
      {
        id: "cbt_u_08",
        speaker: "Patient",
        timestamp: "10:10",
        seconds: 610,
        text: "Catastrophizing and fortune-telling. I'm treating an anxious feeling like a proven prophecy.",
        tags: ["Cognitive Restructuring"]
      }
    ],
    scorecard: [
      {
        id: "cbt_item_1",
        modality: "CBT",
        category: "CTRS General Items",
        itemNumber: 1,
        title: "Agenda Setting & Time Management",
        score: 6,
        maxScore: 6,
        status: "EXEMPLARY",
        timestampRange: "00:20 - 01:10",
        observedBehavior: "Collaboratively prioritized session topics, allocated time blocks, and checked in with patient for consent within first 90 seconds.",
        clinicalRationale: "Meets highest CTRS criteria for collaborative agenda establishment with explicit pacing checkpoints.",
        verbatimQuote: "\"Let's establish our agenda for today. We have our mood check, review of last week's thought record... How does that sound?\"",
        coachingRecommendation: "Superb pacing. Keep reserving last 5 minutes for homework collaboration."
      },
      {
        id: "cbt_item_2",
        modality: "CBT",
        category: "CTRS Cognitive Items",
        itemNumber: 2,
        title: "Guided Discovery & Socratic Questioning",
        score: 6,
        maxScore: 6,
        status: "EXEMPLARY",
        timestampRange: "08:15 - 09:40",
        observedBehavior: "Used precise, non-leading inductive questions to help patient evaluate empirical probability (40/40 completed talks) rather than arguing or reassuring.",
        clinicalRationale: "Textbook Beckian Socratic dialogue. Patient arrived at the alternative perspective independently through guided discovery.",
        verbatimQuote: "\"In the 8 years you have worked... how many presentations have you delivered, and in how many of them did you actually freeze up?\"",
        coachingRecommendation: "Flawless demonstration of guided discovery without premature reassurance."
      },
      {
        id: "cbt_item_3",
        modality: "CBT",
        category: "CTRS Cognitive Items",
        itemNumber: 3,
        title: "Focusing on Key Cognitions & Restructuring",
        score: 5,
        maxScore: 6,
        status: "COMPETENT",
        timestampRange: "01:40 - 03:20",
        observedBehavior: "Isolated hot cognitions, elicited baseline belief percentage (90%), and prompted identification of catastrophizing distortion.",
        clinicalRationale: "Clear isolation of automatic thought and somatic correlates. Belief re-rating at end of session shifted from 90% down to 35%.",
        verbatimQuote: "\"Let's put that automatic thought right at the center... What percentage do you believe that thought right now?\"",
        coachingRecommendation: "Remember to test intermediate beliefs ('If I stumble, people will think I'm a fraud') in upcoming sessions."
      }
    ],
    soapNote: {
      subjective: "Patient R.J. presented for Session #8 of CBT protocol for Major Depressive Disorder and Social Performance Anxiety. Patient reported persistent anticipation anxiety regarding upcoming technical presentation. Denies suicidal ideation, intent, or plan.",
      objective: "Mood anxious, affect congruent. Thought process linear and logical. PHQ-9 score: 11 (moderate depression, down from 14); GAD-7 score: 14 (moderate-to-severe anxiety). Patient actively completed 3-column thought record in-session.",
      assessment: "Major Depressive Disorder, recurrent, moderate (F33.1) with concurrent Social Anxiety Disorder (F40.10). Cognitive distortions of catastrophizing and fortune-telling directly fuel presentation avoidance. High responsiveness to Socratic dialogue and empirical testing.",
      plan: "1. Continue bi-weekly CBT protocol. 2. Behavioral experiment: Deliver 5-minute practice slide deck to trusted peer on Wednesday. 3. Daily 5-minute thought records for automatic prediction tracking. 4. Next session Sep 19, 2026.",
      icd10Codes: [
        { code: "F33.1", description: "Major Depressive Disorder, recurrent, moderate" },
        { code: "F40.10", description: "Social Anxiety Disorder, unspecified" }
      ],
      riskAssessment: {
        suicidality: "NONE",
        selfHarm: "ABSENT",
        safetyPlanReviewed: false
      }
    }
  }
];

export const DBT_RUBRIC_DOMAINS = [
  { id: "validation", name: "Validation Strategies", levels: "Levels 1 to 6 (V1: Listening -> V6: Radical Genuineness)", target: ">= 80%" },
  { id: "chain_analysis", name: "Behavioral Chain Analysis", levels: "Vulnerability -> Prompting -> Links -> Consequences", target: ">= 85%" },
  { id: "dialectics", name: "Dialectical Balancing", levels: "Synthesis of Acceptance & Change / Middle Path", target: ">= 75%" },
  { id: "solution_analysis", name: "Solution Analysis & Skills", levels: "TIPP, ACCEPTS, DEAR MAN, Opposite Action", target: ">= 80%" },
  { id: "consultation", name: "Consultation & Contingencies", levels: "Coaching Agreements & Clear Boundary Enforcement", target: ">= 90%" }
];

export const CBT_CTRS_DOMAINS = [
  { id: "agenda", name: "Agenda Setting & Pacing", rubric: "CTRS Item 1 (0-6 scale)" },
  { id: "feedback", name: "Feedback Elicitation", rubric: "CTRS Item 2 (0-6 scale)" },
  { id: "understanding", name: "Interpersonal Understanding", rubric: "CTRS Item 3 (0-6 scale)" },
  { id: "interpersonal", name: "Interpersonal Effectiveness", rubric: "CTRS Item 4 (0-6 scale)" },
  { id: "collaboration", name: "Collaboration & Teamwork", rubric: "CTRS Item 5 (0-6 scale)" },
  { id: "guided_discovery", name: "Guided Discovery (Socratic)", rubric: "CTRS Item 6 (0-6 scale)" },
  { id: "key_cognitions", name: "Focus on Key Cognitions", rubric: "CTRS Item 7 (0-6 scale)" },
  { id: "strategy_change", name: "Strategy for Change", rubric: "CTRS Item 8 (0-6 scale)" },
  { id: "cbt_techniques", name: "Application of Techniques", rubric: "CTRS Item 9 (0-6 scale)" },
  { id: "homework", name: "Homework Assignment & Review", rubric: "CTRS Item 10 (0-6 scale)" }
];
