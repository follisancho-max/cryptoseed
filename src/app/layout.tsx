
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import Link from "next/link";
import { LayoutDashboard, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CryptoSeed Wallet",
  description: "View your crypto assets from a single seed phrase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased")}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                 <Button variant="ghost" size="icon" className="md:hidden">
                    <SidebarTrigger />
                 </Button>
                 <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                  <Logo className="w-7 h-7" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    CryptoSeed
                  </span>
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/">
                      <LayoutDashboard />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Wallet">
                    <Link href="/wallet">
                      <Wallet />
                      <span>Wallet</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex items-center justify-between p-2 border-b">
                <Button variant="ghost" size="icon">
                    <SidebarTrigger />
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">
                    CryptoSeed Wallet
                </h1>
                <div className="w-7 h-7" />
            </header>
            <main className="flex-1 p-4 md:p-6">
                {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
