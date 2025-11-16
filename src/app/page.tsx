
"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Github, Wallet, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            CryptoSeed Wallet
          </h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </a>
            </Button>
            <Button asChild>
                <Link href="/wallet">Go to App</Link>
            </Button>
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 sm:py-28">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-headline">
              One Phrase to Rule Them All
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Securely view all your crypto assets from a single seed phrase. Our platform supports multiple blockchains and keeps your data private by processing everything in your browser.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90">
                <Link href="/wallet">View Your Wallet Instantly</Link>
            </Button>
        </section>

        <section className="bg-muted/50 py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose CryptoSeed Wallet?</h3>
                    <p className="mt-3 text-lg text-muted-foreground">A secure and simple way to manage your crypto portfolio.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <Wallet className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Universal Wallet</h4>
                        <p className="text-muted-foreground">No more switching apps. View assets from Ethereum, Bitcoin, Solana, and many more networks all in one place.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <ShieldCheck className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Client-Side Security</h4>
                        <p className="text-muted-foreground">Your seed phrase is your key. It's processed only in your browser and is never sent to our servers. Ever.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                            <Zap className="h-8 w-8" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Instant & Simple</h4>
                        <p className="text-muted-foreground">Just enter your seed phrase and instantly see your portfolio. No sign-ups, no lengthy setups.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CryptoSeed Wallet. For educational purposes
        only.
      </footer>
    </div>
  );
}
