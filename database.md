
# CryptoSeed Database Schema

This file contains the SQL schema required for the Supabase database. You can run these commands in the Supabase SQL Editor to set up your tables.

## `seed_phrases` Table

This table stores the seed phrases and the associated network that users enter into the application.

```sql
-- Create the seed_phrases table
CREATE TABLE public.seed_phrases (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  seed_phrase text NOT NULL,
  network text NOT NULL,
  CONSTRAINT seed_phrases_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS) on the table.
-- This is a security best practice.
ALTER TABLE public.seed_phrases ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous users to insert new seed phrases.
-- This is required for the API route to be able to save data.
CREATE POLICY "Allow anonymous inserts"
ON public.seed_phrases
FOR INSERT
WITH CHECK (true);


-- Add comments to columns for clarity
COMMENT ON TABLE public.seed_phrases IS 'Stores user-submitted seed phrases and their selected network.';
COMMENT ON COLUMN public.seed_phrases.id IS 'Unique identifier for each record.';
COMMENT ON COLUMN public.seed_phrases.created_at IS 'Timestamp of when the record was created.';
COMMENT ON COLUMN public.seed_phrases.seed_phrase IS 'The user-submitted seed phrase.';
COMMENT ON COLUMN public.seed_phrases.network IS 'The blockchain network associated with the seed phrase.';

```

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the SQL code for the new policy below and paste it into the editor:
    ```sql
    CREATE POLICY "Allow anonymous inserts"
    ON public.seed_phrases
    FOR INSERT
    WITH CHECK (true);
    ```
5.  Click **"RUN"** to create the policy.

After you run this command in your Supabase SQL Editor, the "Failed to register seed phrase" error should be resolved.