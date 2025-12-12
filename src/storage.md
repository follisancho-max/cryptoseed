
# Supabase Storage Setup

This file contains the necessary SQL policies to allow your application's `service_role` to manage storage buckets and objects. This is a one-time setup.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the entire SQL script below and paste it into the editor.
5.  Click **"RUN"** to apply the policies.

---

## Full Storage Setup Script

```sql
-- Create the 'landing-images' bucket and make it public if it doesn't exist.
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Grant all privileges on the 'landing-images' bucket to the service_role.
-- This allows the server-side code to manage the bucket.
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.objects TO service_role;

-- Allow public, anonymous read access to all objects in the 'landing-images' bucket.
-- This is necessary so that visitors to your website can see the images.
-- Drop the policy first if it exists, to ensure a clean slate.
DROP POLICY IF EXISTS "Public read access for landing-images" ON storage.objects;
CREATE POLICY "Public read access for landing-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'landing-images');


-- Allow the service_role to perform all actions on objects within the landing-images bucket.
-- This is crucial for the admin panel to upload, update, and delete images.
DROP POLICY IF EXISTS "Enable all actions for service_role on landing-images" ON storage.objects;
CREATE POLICY "Enable all actions for service_role on landing-images"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'landing-images');

```
