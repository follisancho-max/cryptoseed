
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ShieldCheck, Wallet } from "lucide-react";
import content from "@/lib/landing-page-content.json";
import { 
  BitcoinIcon, 
  EthereumIcon, 
  SolanaIcon, 
  PolygonIcon, 
  AvalancheIcon, 
  BnbIcon, 
  CardanoIcon,
  PolkadotIcon,
  ChainlinkIcon
} from "@/components/icons";

export default function LandingPage() {
  const icons: { [key: string]: React.ReactNode } = {
    Wallet: <Wallet className="h-6 w-6" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" />,
    Code: <Code className="h-6 w-6" />,
  };

  const chainIcons = [
    <BitcoinIcon className="w-8 h-8" />,
    <EthereumIcon className="w-8 h-8" />,
    <SolanaIcon className="w-8 h-8" />,
    <PolygonIcon className="w-8 h-8" />,
    <AvalancheIcon className="w-8 h-8" />,
    <BnbIcon className="w-8 h-8" />,
    <CardanoIcon className="w-8 h-8" />,
    <PolkadotIcon className="w-8 h-8" />,
    <ChainlinkIcon className="w-8 h-8" />
  ]

  const partnerLogos = [
    "Unstoppable Domains",
    "Ledger",
    "Blockaid",
    "Bitcoin.com",
    "Metamask",
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-background to-blue-900/20 -z-10" />
      <main className="flex-1 w-full">
        <section className="flex flex-col items-center justify-center text-center py-24 px-4 sm:py-32">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-primary">Fetch</span> Blockchain Data
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.hero.subtitle}
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/wallet">{content.hero.cta} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </section>
        
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {content.stats.items.map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
                    <p className="text-muted-foreground uppercase tracking-widest mt-2 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>

        <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <p className="text-center text-sm font-semibold text-primary tracking-wider uppercase mb-8">
                  {content.trusted.title}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground">
                    {partnerLogos.map((logo, index) => (
                      <div key={index} className="text-lg font-medium grayscale hover:grayscale-0 transition-all">
                        {logo}
                      </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="bg-card/50 py-20 px-4 mt-20">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.features.title}</h2>
                    <p className="mt-3 text-lg text-muted-foreground">{content.features.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {content.features.items.map((item, index) => (
                        <div key={index} className="flex flex-col text-left p-6 rounded-lg bg-card border border-border">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4">
                                {icons[item.icon] || <Wallet className="h-6 w-6" />}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      )
                    )}
                </div>
            </div>
        </section>
      </main>
      <footer className="p-8 text-center text-sm text-muted-foreground border-t mt-20">
        © {new Date().getFullYear()} CryptoSeed Wallet. For educational purposes only. Not for use with real funds.
      </footer>
    </div>
  );
}
