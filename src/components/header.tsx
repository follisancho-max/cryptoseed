
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Wallet } from 'lucide-react';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/wallet', label: 'Validate Wallet', icon: Wallet },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">
              CryptoSeed
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/'
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              Home
            </Link>
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
               <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsSheetOpen(false)}
              >
                <Logo className="w-6 h-6 mr-2" />
                <span className="font-bold">CryptoSeed</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                   {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                            'flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-accent',
                            pathname === item.href ? 'bg-accent' : 'transparent'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Title */}
         <div className="flex flex-1 items-center justify-start space-x-2 md:hidden">
          <div className="font-bold">
            <Link href="/" className="flex items-center space-x-2">
               <Logo className="w-6 h-6" />
               <span>CryptoSeed</span>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden md:flex items-center">
                 <Link
                    href="/wallet"
                    className={cn(
                        'transition-colors hover:text-foreground/80 text-sm font-medium',
                        pathname === "/wallet"
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    )}
                    >
                    Validate Wallet
                </Link>
            </nav>
        </div>

      </div>
    </header>
  );
}

