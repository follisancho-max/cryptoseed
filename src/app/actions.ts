"use server";

import { z } from "zod";
import {
  analyzeSeedPhraseForRisk,
  type AnalyzeSeedPhraseForRiskOutput,
} from "@/ai/flows/analyze-seed-phrase-for-risk";

const formSchema = z.object({
  seedPhrase: z.string(),
  network: z.string(),
});

type AnalysisResult = {
  success: boolean;
  data?: AnalyzeSeedPhraseForRiskOutput;
  error?: string;
};

export async function handleAnalysis(
  formData: FormData
): Promise<AnalysisResult> {
  const rawFormData = {
    seedPhrase: formData.get("seedPhrase"),
    network: formData.get("network"),
  };

  const validatedFields = formSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten());
    return {
      success: false,
      error: "Invalid form data provided. Please check your inputs.",
    };
  }

  try {
    const result = await analyzeSeedPhraseForRisk(validatedFields.data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return {
      success: false,
      error:
        "An unexpected error occurred during analysis. The AI model may be unavailable. Please try again later.",
    };
  }
}
