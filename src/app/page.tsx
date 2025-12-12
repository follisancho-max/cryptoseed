
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getLandingPageImages() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Supabase environment variables are not set. Using placeholder images.');
    return null;
  }

  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { data, error } = await supabaseAdmin
      .from('editable_content')
      .select('content')
      .eq('id', 'landing-page-images')
      .single();

    if (error) {
      console.error('Error fetching images from Supabase:', error.message);
      return null;
    }
    return data.content as Record<string, string>;
  } catch (error) {
    console.error('Unexpected error fetching images:', error);
    return null;
  }
}

export default async function LandingPage() {
  const dynamicImages = await getLandingPageImages();

  const getImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    return {
      url: dynamicImages?.[id] || placeholder?.imageUrl || '',
      alt: placeholder?.description || 'Feature image',
      hint: placeholder?.imageHint || '',
    };
  };

  const whyChooseUsFeatures = [
    {
      title: "User-Friendly Platform",
      description: "Built with you in mind, our intuitive platform makes navigating and solving issues straightforward and stress-free.",
      image: getImage("why-choose-us-1"),
    },
    {
      title: "24/7 Support",
      description: "Our dedicated team is always available, around the clock, to provide you with expert assistance whenever you need it.",
      image: getImage("why-choose-us-2"),
    },
    {
      title: "Trusted & Secure",
      description: "We prioritize your safety by offering a secure and reliable platform that you can trust for all your needs.",
      image: getImage("why-choose-us-3"),
    }
  ];

  const unlockingTheFutureImage = getImage("unlocking-the-future");

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-br from-background via-background/80 to-blue-900/20 -z-10" />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
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

        <section className="w-full max-w-6xl mx-auto py-16 sm:py-24 px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUsFeatures.map((feature) => (
              <Card key={feature.title} className="bg-card/50 border-primary/20 text-center">
                <CardHeader>
                  {feature.image.url && (
                     <div className="relative h-40 w-full mb-4">
                        <Image
                          src={feature.image.url}
                          alt={feature.image.alt}
                          fill
                          className="object-contain"
                          data-ai-hint={feature.image.hint}
                        />
                      </div>
                  )}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto py-16 sm:py-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-full w-full">
              {unlockingTheFutureImage.url && (
                <Image
                  src={unlockingTheFutureImage.url}
                  alt={unlockingTheFutureImage.alt}
                  fill
                  className="object-contain"
                  data-ai-hint={unlockingTheFutureImage.hint}
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Unlocking <span className="text-primary">the Future</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                We are your trusted partner in crypto wealth restoration and wallet recovery services, offering an open and decentralized protocol designed to resolve various wallet issues on a secure server. This is not an app but a protocol that facilitates remote resolution between all noncustodial wallets by connecting you to the appropriate wallet representatives, ensuring effective communication and issue rectification.
              </p>
            </div>
          </div>
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
