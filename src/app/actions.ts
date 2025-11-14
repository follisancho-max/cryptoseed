"use server";

import { z } from "zod";

// Define the data structures for our wallet platform
export type Asset = {
  network: string;
  symbol: string;
  balance: number;
  valueUsd: number;
};

export type WalletData = {
  assets: Asset[];
};

const formSchema = z.object({
  seedPhrase: z.string(),
});

type FetchResult = {
  success: boolean;
  data?: WalletData;
  error?: string;
};

// This is a mock function. In a real app, this would involve:
// 1. Deriving private keys from the seed phrase (client-side).
// 2. Deriving addresses for each blockchain.
// 3. Calling blockchain nodes/APIs to get balances.
// 4. Fetching token prices to calculate USD value.
function mockFetchAssetsFromSeed(seedPhrase: string): WalletData {
  // Simple logic: the longer the seed phrase, the more "assets" we find.
  const wordCount = seedPhrase.trim().split(/\s+/).length;

  if (wordCount < 12) {
    return { assets: [] };
  }

  const assets: Asset[] = [
    { network: "Ethereum", symbol: "ETH", balance: 1.25, valueUsd: 4375.00 },
    { network: "Bitcoin", symbol: "BTC", balance: 0.05, valueUsd: 3500.00 },
    { network: "Solana", symbol: "SOL", balance: 15.5, valueUsd: 2480.00 },
  ];
  
  if (wordCount >= 18) {
     assets.push({ network: "Polygon", symbol: "MATIC", balance: 2500, valueUsd: 1750.00 });
  }

  if (wordCount >= 24) {
      assets.push({ network: "BNB Smart Chain", symbol: "BNB", balance: 3.2, valueUsd: 1920.00 });
  }
  
  // Add some randomness to balances based on seed phrase length
  return {
    assets: assets.map(asset => ({
        ...asset,
        balance: asset.balance * (1 + (seedPhrase.length % 10) / 20),
        valueUsd: asset.valueUsd * (1 + (seedPhrase.length % 10) / 20)
    })),
  };
}


export async function handleFetchData(
  formData: FormData
): Promise<FetchResult> {
  const rawFormData = {
    seedPhrase: formData.get("seedPhrase"),
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
    // In a real application, you would NOT pass the seed phrase to the server.
    // This server action would orchestrate calls to blockchain data providers.
    // The derivation from seed phrase would happen securely on the client.
    // Here, we simulate this process for demonstration.
    const result = mockFetchAssetsFromSeed(validatedFields.data.seedPhrase);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Data fetching failed:", error);
    return {
      success: false,
      error:
        "An unexpected error occurred while fetching wallet data. Please try again later.",
    };
  }
}
