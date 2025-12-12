
'use client';

export default function WalletPage() {
  return (
    <div className="container flex-1 w-full flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Wallet Connected
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-lg mx-auto">
            This is a placeholder page for after the wallet is connected.
          </p>
        </div>
      </div>
    </div>
  );
}
