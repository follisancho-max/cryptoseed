'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet } from "lucide-react";
import { Logo } from "@/components/icons";

export default function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-background to-blue-900/20 -z-10" />
      <main className="flex-1 w-full flex items-center justify-center">
        <section className="flex flex-col items-center justify-center text-center py-24 px-4 sm:py-32">
            <Logo className="w-20 h-20 text-primary mb-6" />
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-primary">CryptoSeed</span> Wallet Assistance
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
             A secure, decentralized platform to help you with your web3 wallet issues. Get quick assistance for a variety of problems.
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/wallet">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </section>
      </main>
      <footer className="bg-background border-t py-6 px-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground/50">
            <p>
                © {new Date().getFullYear()} CryptoSeed Wallet. For educational purposes only. Not for use with real funds.
            </p>
        </div>
      </footer>
    </div>
  );
}
