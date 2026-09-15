import { NextRequest, NextResponse } from "next/server";
import { analyzeTherapySession } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transcript = body.transcript || "";
    const modality = body.modality || "DBT";

    if (!transcript || transcript.trim().length < 20) {
      return NextResponse.json(
        { error: "Transcript is required and must contain at least 20 characters." },
        { status: 400 }
      );
    }

    const result = await analyzeTherapySession(transcript, modality);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Session Scoring Error:", err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
