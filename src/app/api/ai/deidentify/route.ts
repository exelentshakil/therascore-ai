import { NextRequest, NextResponse } from "next/server";
import { LlmHealthcareFirewall } from "@/lib/llm-firewall";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text || "";

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required for PHI de-identification." },
        { status: 400 }
      );
    }

    const result = LlmHealthcareFirewall.deidentify(text);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
