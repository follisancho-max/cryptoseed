"use server";

import { z } from "zod";

// Define the data structures for our wallet platform
export type Asset = {
  network: string;
  symbol: string;
  balance: number;
  valueUsd: number;
};

export type Transaction = {
  id: string;
  date: string;
  type: "in" | "out";
  asset: string;
  amount: number;
  valueUsd: number;
  from: string;
  to: string;
};

export type WalletData = {
  assets: Asset[];
  transactions: Transaction[];
};

const formSchema = z.object({
  seedPhrase: z.string(),
  networks: z.array(z.string()),
});

type FetchResult = {
  success: boolean;
  data?: WalletData;
  error?: string;
};

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

  // Only include transactions for assets the user actually has
  const userSymbols = new Set(assets.map((a) => a.symbol));
  return transactions.filter((tx) => userSymbols.has(tx.asset));
}

// This is a mock function. In a real app, this would involve:
// 1. Deriving private keys from the seed phrase (client-side).
// 2. Deriving addresses for each blockchain.
// 3. Calling blockchain nodes/APIs to get balances and transactions.
// 4. Fetching token prices to calculate USD value.
function mockFetchDataFromSeed(
  seedPhrase: string,
  networks: string[]
): WalletData {
  // Simple logic: the longer the seed phrase, the more "assets" we find.
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
  ];

  // Filter assets based on selected networks
  const selectedAssets = allAssets.filter((asset) =>
    networks.includes(asset.network)
  );
  
  if (selectedAssets.length === 0) {
     return { assets: [], transactions: [] };
  }
  
  // Add some randomness to balances based on seed phrase length
  const assets = selectedAssets.map(asset => ({
      ...asset,
      balance: asset.balance * (1 + (seedPhrase.length % 10) / 20),
      valueUsd: asset.valueUsd * (1 + (seedPhrase.length % 10) / 20)
  }));


  const transactions = mockFetchTransactions(assets);

  return { assets, transactions };
}

export async function handleFetchData(
  formData: FormData
): Promise<FetchResult> {
  const rawFormData = {
    seedPhrase: formData.get("seedPhrase"),
    networks: formData.getAll("networks"),
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
    const result = mockFetchDataFromSeed(
      validatedFields.data.seedPhrase,
      validatedFields.data.networks
    );
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
