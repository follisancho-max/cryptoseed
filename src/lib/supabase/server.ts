
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// This function creates a Supabase client with the service_role key,
// giving it admin privileges. It's intended for use in Server Components
// and Server Actions where you need to bypass RLS.
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
