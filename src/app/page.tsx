
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ShieldCheck, Wallet, Workflow, Zap, Database, Headset, DollarSign, FileText, Youtube, Twitter, Linkedin, CheckCircle2 } from "lucide-react";
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
  ChainlinkIcon,
  RoninIcon
} from "@/components/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SocialIcons: { [key: string]: React.ReactNode } = {
  Youtube: <Youtube className="h-5 w-5" />,
  X: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.31l5.74-6.57L0 .75h5.063l3.495 4.633L12.602.75zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Discord: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8.2 8.2 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.037c.334 1.425.98 3.23.98 3.23.021.056.075.075.12.075l.007-.005a8.2 8.2 0 0 0 4.505-1.548.05.05 0 0 0 .002-.021A8.7 8.7 0 0 0 12 6.121c.021-.056.075-.075.12-.075l.007.005a8.2 8.2 0 0 0 4.505 1.548.05.05 0 0 0 .12-.075s.646-1.805.98-3.23a.04.04 0 0 0-.021-.037M8 10.435c-.982 0-1.777-.733-1.777-1.635 0-.901.795-1.634 1.777-1.634.982 0 1.777.733 1.777 1.634 0 .902-.795 1.635-1.777 1.635m-3.57 0c-.982 0-1.777-.733-1.777-1.635 0-.901.795-1.634 1.777-1.634.982 0 1.777.733 1.777 1.634 0 .902-.795 1.635-1.777 1.635"/></svg>
};

export default function LandingPage() {
  const icons: { [key: string]: React.ReactNode } = {
    Wallet: <Wallet className="h-6 w-6" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6" />,
    Code: <Code className="h-6 w-6" />,
    Headset: <Headset className="h-6 w-6" />,
  };

  const productIcons: { [key: string]: React.ReactNode } = {
    "API": <Zap className="h-4 w-4" />,
    "STREAMS": <Workflow className="h-4 w-4" />,
    "DATASHARE": <Database className="h-4 w-4" />,
    "DATA INDEXER": <Code className="h-4 w-4" />,
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

  const renderBadge = (badge: string | undefined) => {
    if (!badge) return null;
    const badgeStyles = badge === "NEW" 
      ? "bg-green-400/20 text-green-400 border border-green-400/30" 
      : "bg-pink-400/20 text-pink-400 border border-pink-400/30";
    return (
      <span className={cn("ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded", badgeStyles)}>
        {badge}
      </span>
    );
  };

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

                <div className="grid grid-cols-1 gap-8">
                  {content.products.cards.map((card, index) => (
                    <div key={index} className={cn(
                      "rounded-2xl border overflow-hidden",
                      card.bgColorClass
                    )}>
                      <div className="grid md:grid-cols-2">
                          <div className={cn(
                            "p-8 md:p-12 flex flex-col justify-center",
                            index % 2 !== 0 && "md:order-last"
                          )}>
                              <div className="flex items-center gap-2 mb-4">
                                  <span className={cn("flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded-full", card.tagColorClass)}>
                                    {productIcons[card.tag] || <Zap className="h-4 w-4" />}
                                    {card.tag}
                                  </span>
                              </div>
                              <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                              <p className="text-muted-foreground mb-6">{card.description}</p>
                              
                              <p className="text-sm text-muted-foreground mb-4">{card.usedByLabel}</p>
                              <div className="flex items-center gap-8 mb-8 text-muted-foreground">
                                  {card.logos.map((logo, index) => (
                                      <div key={index} className="text-lg font-bold grayscale hover:grayscale-0 transition-all">{logo}</div>
                                  ))}
                              </div>
                              
                              <Button asChild size="lg" className="self-start">
                                  <Link href="#">{card.cta}</Link>
                              </Button>
                          </div>
                          <div className="relative min-h-[300px] md:min-h-0">
                              <Image 
                                  src={card.imageUrl}
                                  alt={card.imageAlt}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  data-ai-hint={card.imageHint}
                                  className={cn("scale-110", card.imageClass)}
                              />
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto rounded-3xl bg-primary text-primary-foreground overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{content.testimonial.title}</h2>
                <div className="flex items-center gap-3 mb-6">
                  <RoninIcon className="w-8 h-8" />
                  <span className="text-2xl font-semibold">{content.testimonial.partner}</span>
                </div>
                <blockquote className="text-lg text-primary-foreground/80 mb-6 border-l-4 border-primary-foreground/50 pl-6 italic">
                  {content.testimonial.quote}
                </blockquote>
                <div className="mb-8">
                    <p className="text-4xl font-bold">{content.testimonial.savings.value}</p>
                    <p className="text-sm uppercase tracking-wider text-primary-foreground/70">{content.testimonial.savings.label}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="lg" className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary border-primary-foreground">{content.testimonial.ctaPrimary}</Button>
                  <Button variant="link" size="lg" className="text-primary-foreground hover:text-primary-foreground/80">{content.testimonial.ctaSecondary}</Button>
                </div>
              </div>
              <div className="relative h-full min-h-[350px] md:min-h-[500px]">
                 <Image 
                    src={content.testimonial.imageUrl}
                    alt={content.testimonial.imageAlt}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={content.testimonial.imageHint}
                    className="scale-125 translate-x-1/4"
                 />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {content.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-card/30 border border-border p-6 rounded-lg">
                          <div className="flex items-center gap-2 mb-4">
                              <p className="font-bold text-lg grayscale">{testimonial.company}</p>
                          </div>
                          <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                          <div className="flex items-center gap-3">
                              <Image 
                                  src={testimonial.avatarUrl}
                                  alt={testimonial.author}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                  data-ai-hint="person photo"
                              />
                              <div>
                                  <p className="font-semibold">{testimonial.author}</p>
                                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">50+ Chains. <br /> 1 Unified Schema.</h2>
                  <div className="flex justify-center gap-4 mb-12">
                      <Button size="lg">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      <Button size="lg" variant="outline">Request Network</Button>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                      {chainIcons.map((icon, index) => (
                          <div key={index} className="bg-card/50 p-3 rounded-xl border border-border">
                              {icon}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{content.useCases.title}</h2>
              <Link href="#" className="text-primary font-medium hover:underline flex items-center justify-center gap-1 mt-2">
                {content.useCases.link} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {content.useCases.cards.map((card, index) => (
                <div key={index} className="bg-card/30 border border-border rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint={card.imageHint}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground mb-4">{card.description}</p>
                    <div className="flex items-center gap-4 text-muted-foreground grayscale">
                      {card.logos.map((logo, i) => (
                        <div key={i} className="text-lg font-semibold">{logo}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{content.enterprise.title}</h2>
                <p className="text-muted-foreground mb-8">{content.enterprise.description}</p>
                <div className="space-y-6">
                  {content.enterprise.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                       <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-1">
                          {icons[feature.icon] || <ShieldCheck className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                 <Image
                    src={content.enterprise.imageUrl}
                    alt={content.enterprise.imageAlt}
                    width={500}
                    height={500}
                    className="rounded-full"
                    data-ai-hint={content.enterprise.imageHint}
                  />
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

        <section className="py-20 px-4 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent -z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-[400px] w-full bg-[url('https://picsum.photos/seed/wave/1200/400')] bg-cover bg-no-repeat bg-bottom opacity-10 -z-20" data-ai-hint="abstract wave" />
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{content.cta.title}</h2>
                        <p className="text-muted-foreground mb-6">{content.cta.description}</p>
                        <Button size="lg">{content.cta.buttonText} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <DollarSign className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold">{content.cta.plan.title}</h3>
                            </div>
                            <p className="text-muted-foreground mb-3">{content.cta.plan.description}</p>
                            <Link href="#" className="text-primary font-medium hover:underline flex items-center gap-1 text-sm">
                                {content.cta.plan.link} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <FileText className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold">{content.cta.pipeline.title}</h3>
                            </div>
                            <p className="text-muted-foreground mb-3">{content.cta.pipeline.description}</p>
                            <Link href="#" className="text-primary font-medium hover:underline flex items-center gap-1 text-sm">
                                {content.cta.pipeline.link} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <footer className="bg-background border-t mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            {content.footer.columns.map((column, index) => (
              <div key={index} className={cn(index > 0 && "col-span-1", index === 0 && "col-span-2 md:col-span-1")}>
                <h3 className="font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-sm">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm flex items-center">
                        {link.text}
                        {renderBadge(link.badge)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 border border-blue-400/30 bg-blue-950/50 rounded-md px-3 py-1.5 text-blue-300">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-semibold">SOC 2</span>
                    <span className="text-blue-300/60">Type II Certified</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                  {content.footer.legal.map((link, index) => (
                    <Link key={index} href="#" className="hover:text-primary transition-colors">
                      {link.text}
                    </Link>
                  ))}
                </div>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
                {content.footer.social.map((social, index) => (
                    <Link key={index} href="#" className="hover:text-primary transition-colors">
                        {SocialIcons[social]}
                    </Link>
                ))}
            </div>
          </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-8">
                © {new Date().getFullYear()} CryptoSeed Wallet. For educational purposes only. Not for use with real funds.
            </p>
        </div>
      </footer>
    </div>
  );
}
