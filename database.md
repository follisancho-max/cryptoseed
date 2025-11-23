
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

-- Optional: Enable Row Level Security (RLS)
-- It's a good practice to enable RLS and define policies, 
-- though for this app's server-side access, it might not be strictly necessary
-- if your API keys are kept secure.
ALTER TABLE public.seed_phrases ENABLE ROW LEVEL SECURITY;

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
4.  Copy the SQL code from this file and paste it into the editor.
5.  Click **"RUN"** to create the table.
