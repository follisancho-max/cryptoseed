
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
import Image from "next/image";

export default function LandingPage() {
  const icons: { [key: string]: React.ReactNode } = {
    Wallet: <Wallet className="h-6 w-6" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" />,
    Code: <Code className="h-6 w-6" />,
  };

  const chainIcons = [
    <BitcoinIcon key="btc" className="w-8 h-8" />,
    <EthereumIcon key="eth" className="w-8 h-8" />,
    <SolanaIcon key="sol" className="w-8 h-8" />,
    <PolygonIcon key="matic" className="w-8 h-8" />,
    <AvalancheIcon key="avax" className="w-8 h-8" />,
    <BnbIcon key="bnb" className="w-8 h-8" />,
    <CardanoIcon key="ada" className="w-8 h-8" />,
    <PolkadotIcon key="dot" className="w-8 h-8" />,
    <ChainlinkIcon key="link" className="w-8 h-8" />
  ]

  const partnerLogos = [
    "Unstoppable Domains",
    "Ledger",
    "Blockaid",
    "Bitcoin.com",
    "Metamask",
  ];
  
  const productUsedByLogos = [
    "METAMASK",
    "LEDGER",
    "Blockchain.com"
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

        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.products.title}</h2>
                    <Link href="#" className="text-primary font-medium hover:underline flex items-center gap-1">
                        {content.products.link} <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="rounded-2xl bg-card/30 border border-border overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-2 py-1 rounded-full">{content.products.card.tag}</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{content.products.card.title}</h3>
                            <p className="text-muted-foreground mb-6">{content.products.card.description}</p>
                            
                            <p className="text-sm text-muted-foreground mb-4">{content.products.card.usedBy}</p>
                            <div className="flex items-center gap-8 mb-8 text-muted-foreground">
                                {productUsedByLogos.map((logo, index) => (
                                    <div key={index} className="text-lg font-bold grayscale hover:grayscale-0 transition-all">{logo}</div>
                                ))}
                            </div>
                            
                            <Button asChild size="lg" className="self-start">
                                <Link href="#">{content.products.card.cta}</Link>
                            </Button>
                        </div>
                        <div className="relative min-h-[300px] md:min-h-0">
                            <Image 
                                src="https://picsum.photos/seed/wallet-ui/600/500" 
                                alt="Crypto wallet interface" 
                                fill
                                style={{ objectFit: 'cover' }}
                                data-ai-hint="crypto wallet"
                                className="scale-110 translate-x-10 -translate-y-5"
                            />
                        </div>
                    </div>
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
