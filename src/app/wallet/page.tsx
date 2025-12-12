
"use client";

import { useState } from "react";
import type { WalletData } from "@/lib/types";
import { SeedPhraseForm } from "@/components/seed-phrase-form";
import { AnalysisResult } from "@/components/analysis-result";
import { TransactionHistory } from "@/components/transaction-history";

export default function WalletPage() {
  const [walletData, setWalletData] =
    useState<WalletData | null>(null);

  return (
    <div className="container flex-1 w-full flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Connect Your Wallet
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-lg mx-auto">
            Enter your seed phrase to view your assets across different blockchains. All operations are done locally in your browser.
          </p>
        </div>

        <SeedPhraseForm
          onDataFetched={setWalletData}
          onFetchStart={() => setWalletData(null)}
        />

        {walletData && (
          <div className="space-y-8 animate-in fade-in-0 duration-500">
            <AnalysisResult data={walletData} />
            <TransactionHistory transactions={walletData.transactions} />
          </div>
        )}
      </div>
    </div>
  );
