
# Supabase Storage Setup

This file contains the necessary SQL policies to allow your application's `service_role` to manage storage buckets and objects, and provides guidance for setting up fine-grained admin policies. This is a one-time setup.

### How to use this file:

1.  Go to your Supabase project dashboard.
2.  Navigate to the **SQL Editor**.
3.  Click on **"New query"**.
4.  Copy the SQL script below and paste it into the editor.
5.  Click **"RUN"** to apply the policies.
6.  Follow the additional steps to create admin-only upload policies in the Supabase Dashboard.

---

## Part 1: Base Storage Setup Script

This script sets up the bucket and provides public read access, along with full access for the `service_role` as a fallback.

```sql
-- Create the 'landing-images' bucket and make it public if it doesn't exist.
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public, anonymous read access to all objects in the 'landing-images' bucket.
-- This is necessary so that visitors to your website can see the images.
DROP POLICY IF EXISTS "Public read access for landing-images" ON storage.objects;
CREATE POLICY "Public read access for landing-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'landing-images');


-- Allow the service_role to perform all actions on objects within the landing-images bucket.
-- This is a fallback and the primary control is the user-role-based policy below.
DROP POLICY IF EXISTS "Enable all actions for service_role on landing-images" ON storage.objects;
CREATE POLICY "Enable all actions for service_role on landing-images"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'landing-images');
```

---

## Part 2: Admin-Only Upload Policies (Manual Setup)

To ensure only authenticated admins can upload or update images, you must create Row Level Security (RLS) policies directly on the `landing-images` storage bucket. The application code now performs uploads using the user's permissions, so these policies will be enforced.

**Go to your Supabase Dashboard → Storage → "landing-images" Bucket → Policies**

Click **"New Policy"** and create the following two policies.

### ✔️ Policy 1: Admins Can Upload (INSERT)

*   **Policy Name**: `Admins can upload files`
*   **Allowed operation**: `INSERT`
*   **Target roles**: `authenticated`
*   **USING expression**: `auth.jwt() ->> 'role' = 'admin'`
    *   *Note: This assumes you have a `role` in your user's JWT claims. If you identify admins differently (e.g., via a column in a `profiles` table), adjust this expression accordingly.*

### ✔️ Policy 2: Admins Can Update (UPDATE)

*   **Policy Name**: `Admins can update files`
*   **Allowed operation**: `UPDATE`
*   **Target roles**: `authenticated`
*   **USING expression**: `auth.jwt() ->> 'role' = 'admin'`

This setup provides granular, secure control over who can modify your site's images.
