
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
  riskAnalysis: {
    isHighRisk: boolean;
    reasons: string[];
    suggestions: string[];
  };
};
