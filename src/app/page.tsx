"use client";

import { useState } from "react";
import type { AnalyzeSeedPhraseForRiskOutput } from "@/ai/flows/analyze-seed-phrase-for-risk";
import { Logo } from "@/components/icons";
import { SeedPhraseForm } from "@/components/seed-phrase-form";
import { AnalysisResult } from "@/components/analysis-result";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeSeedPhraseForRiskOutput | null>(null);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            CryptoSeedGate
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
              Seed Phrase Security Analysis
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-lg mx-auto">
              Enter your seed phrase and select a network to get an AI-powered
              risk assessment.
            </p>
          </div>

          <SeedPhraseForm
            onAnalysisComplete={setAnalysisResult}
            onAnalysisStart={() => setAnalysisResult(null)}
          />

          {analysisResult && (
            <div className="animate-in fade-in-0 duration-500">
              <AnalysisResult data={analysisResult} />
            </div>
          )}
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CryptoSeedGate. For educational purposes
        only.
      </footer>
    </div>
  );
}
