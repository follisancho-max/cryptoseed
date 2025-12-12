
# CryptoSeed Supabase Storage Setup

This file contains the necessary SQL scripts to set up Supabase Storage for the application. It includes creating a storage bucket and setting up Row Level Security (RLS) policies to control access.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the entire SQL script below and paste it into the editor.
5.  Click **"RUN"** to create the bucket and apply the policies.

---

## Full Storage Setup Script

```sql
-- 1. Create a storage bucket called "landing-images"
-- The "public" argument makes the bucket publicly accessible, which is what we need
-- for images that will be displayed on the landing page.
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Add comments for clarity
COMMENT ON TABLE storage.buckets IS 'Stores file buckets';


-- 2. Create a policy that allows public read access to the bucket.
-- This is necessary so that anyone visiting the website can see the images.
CREATE POLICY "Public read access for landing images"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'landing-images' );

-- 3. Create a policy to allow file uploads (inserts) for any authenticated user.
-- In a real production app, you might restrict this to a specific admin role.
-- For this demo, we'll allow any logged-in user to upload.
-- Note: The server action uses the service_role key, which bypasses RLS,
-- but having this policy is good practice for potential future client-side uploads.
CREATE POLICY "Allow uploads for authenticated users"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'landing-images' );

-- 4. Create a policy to allow updates for authenticated users.
CREATE POLICY "Allow updates for authenticated users"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'landing-images' );

-- 5. Create a policy to allow deletes for authenticated users.
CREATE POLICY "Allow deletes for authenticated users"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'landing-images' );
```

### Security Notes

*   The bucket is set to `public` because the images are meant to be displayed on a public-facing website.
*   The policies for `INSERT`, `UPDATE`, and `DELETE` are currently set for any `authenticated` user. In a real-world scenario with multiple user roles, you would tighten these rules to only allow users with a specific `admin` role to perform these actions.
*   Our application's `updateLandingPageImages` server action uses the `service_role` key, which bypasses these RLS policies. This is a secure pattern for backend operations. These policies are in place for completeness and for any potential client-side interactions with storage in the future.

