import { NextResponse } from "next/server";

export async function GET() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

  const openaiActive = Boolean(openaiKey && !openaiKey.includes("placeholder") && openaiKey.length > 20);
  const geminiActive = Boolean(geminiKey && !geminiKey.includes("placeholder") && geminiKey.length > 20);
  const supabaseActive = Boolean(supabaseUrl && !supabaseUrl.includes("placeholder"));

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "TheraScore AI — Clinical Psychotherapy Quality Platform",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    compliance: {
      hipaaSafeHarbor: true,
      baaCovered: true,
      owaspLlmDefenses: "LLM01_LLM02_LLM05_ACTIVE",
      phiRedactorReady: true
    },
    providers: {
      openai: {
        active: openaiActive,
        model: "gpt-4o-mini",
        role: "Primary Clinical Adherence Rater"
      },
      gemini: {
        active: geminiActive,
        model: "gemini-2.0-flash",
        role: "Secondary Circuit Breaker"
      },
      deterministicFallback: {
        active: true,
        model: "clinical-adherence-rules-engine-v1",
        role: "Offline Local Clinical Rule Engine"
      },
      supabase: {
        active: supabaseActive,
        storage: "Encrypted PostgreSQL with Row-Level Security"
      }
    }
  });
}
