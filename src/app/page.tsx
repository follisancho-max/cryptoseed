
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet, ShieldCheck, Zap } from "lucide-react";
import content from "@/lib/landing-page-content.json";


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1 w-full">
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 sm:py-28">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {content.hero.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.hero.subtitle}
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/wallet">{content.hero.cta}</Link>
            </Button>
        </section>

        <section className="bg-card/50 py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{content.features.title}</h3>
                    <p className="mt-3 text-lg text-muted-foreground">{content.features.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {content.features.items.map((item, index) => {
                      const icons: { [key: string]: React.ReactNode } = {
                        Wallet: <Wallet className="h-8 w-8" />,
                        ShieldCheck: <ShieldCheck className="h-8 w-8" />,
                        Zap: <Zap className="h-8 w-8" />,
                      };
                      return (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                                {icons[item.icon] || <Wallet className="h-8 w-8" />}
                            </div>
                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      )
                    })}
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
