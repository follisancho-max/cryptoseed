"use client";

import { useState } from "react";
import type { WalletData } from "@/app/actions";
import { Logo } from "@/components/icons";
import { SeedPhraseForm } from "@/components/seed-phrase-form";
import { AnalysisResult } from "@/components/analysis-result";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  const [walletData, setWalletData] =
    useState<WalletData | null>(null);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            CryptoSeed Wallet
          </h1>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
              Universal Seed Phrase Wallet
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
            <div className="animate-in fade-in-0 duration-500">
              <AnalysisResult data={walletData} />
            </div>
          )}
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CryptoSeed Wallet. For educational purposes
        only.
      </footer>
    </div>
  );
}
