
# CryptoSeed Database Schema

This file contains the SQL schema required for the Supabase database.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the entire SQL script below and paste it into the editor.
5.  Click **"RUN"** to create the table and its security policy.

This will set up your `seed_phrases` table and allow the application to save data to it.

---

## Full Database Setup Script

```sql
-- Drop the table if it exists to start fresh (optional, use with caution)
-- DROP TABLE IF EXISTS public.seed_phrases;

-- Create the seed_phrases table
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
COMMENT ON COLUMN public.seed_phrases.seed_phrase IS 'The user-submitted seed phrase.';
COMMENT ON COLUMN public.seed_phrases.network IS 'The blockchain network associated with the seed phrase.';

-- Enable Row Level Security (RLS) on the table.
-- This is a critical security best practice.
ALTER TABLE public.seed_phrases ENABLE ROW LEVEL SECURITY;

-- Drop the policy if it already exists to avoid errors on re-run
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.seed_phrases;

-- Create a policy to allow anonymous (public) users to insert new seed phrases.
-- This is required for the application to be able to save data.
CREATE POLICY "Allow anonymous inserts"
ON public.seed_phrases
FOR INSERT
TO anon -- Specifically grant permission to the anonymous role
WITH CHECK (true);
```
