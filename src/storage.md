
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
-- Create a policy to allow the service_role to create new storage buckets.
-- This is necessary for the image upload functionality to create the 'landing-images' bucket if it doesn't exist.
CREATE POLICY "Enable bucket creation for service_role"
ON storage.buckets FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a policy to allow the service_role to view all objects in storage.
CREATE POLICY "Enable read access for service_role"
ON storage.objects FOR SELECT
TO service_role
USING (true);

-- Create a policy to allow the service_role to upload new objects.
CREATE POLICY "Enable insert for service_role"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a policy to allow the service_role to update existing objects.
CREATE POLICY "Enable update for service_role"
ON storage.objects FOR UPDATE
TO service_role
USING (true);

-- Create a policy to allow the service_role to delete objects.
CREATE POLICY "Enable delete for service_role"
ON storage.objects FOR DELETE
TO service_role
USING (true);

-- Create the 'landing-images' bucket and make it public.
-- This only runs if the bucket doesn't already exist.
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow public, anonymous read access to the 'landing-images' bucket.
-- This is required so that visitors to your website can see the images.
CREATE POLICY "Public read access for landing-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'landing-images');
```
