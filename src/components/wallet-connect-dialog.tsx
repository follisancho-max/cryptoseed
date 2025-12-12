
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Wallet, ArrowLeft } from 'lucide-react';

const wallets = [
  'Metamask', 'Coinbase', 'WalletConnect', 'Trust', 'Xumm', 'Cardano',
  'Daedalus', 'Yoroi', 'CCVault', 'Gero', 'Nami', 'Solana', 'Phantom',
  'Solflare', 'Sollet', 'Solong', 'Exodus', 'Avalanche', 'Velas',
  'crypto.com', 'Blockchain', 'Binance Smart Chain', 'Safepal', 'Argent',
  'Fortmatic', 'Aktionariat', 'Keyring Pro', 'BitKeep', 'SparkPoint', 'OwnBit',
  'Infinity Wallet', 'Wallet.io', 'Infinito', 'Torus', 'Nash', 'BitPay',
  'imToken', 'Ambire', 'Apollox', 'Bitski', 'Bobablocks', 'Crossmint',
  'Defiant', 'Fireblocks', 'Kryptogo', 'Ledger', 'Now', 'Nufinetes',
  'Onekey', 'Paper', 'Pier', 'Prema', 'Rice', 'Safemoon', 'Secux',
  'Sequence', 'Tokenary', 'Unipass', 'Venly', 'Verso', 'Wallet3',
  'Polkadot', 'Filecoin', 'IOST', 'Qtum', 'Waves', 'Algorand', 'Zcash',
  'Vechain', 'Tezos', 'Stellar', 'Tron', 'Terra', 'Cosmos', 'Metis',
  'Optimism', 'Injective', 'Other Wallet'
];

type WalletConnectDialogProps = {
  onConnect: () => void;
};

export function WalletConnectDialog({ onConnect }: WalletConnectDialogProps) {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (selectedWallet) {
            const timer = setTimeout(() => {
                onConnect();
                router.push('/wallet');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [selectedWallet, router, onConnect]);


    if (selectedWallet) {
        return (
             <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="sr-only">Initializing Connection</DialogTitle>
                     <div className="flex items-center gap-2 text-green-400 font-semibold">
                        Initializing
                        <span className="animate-pulse-dot-1">.</span>
                        <span className="animate-pulse-dot-2">.</span>
                        <span className="animate-pulse-dot-3">.</span>
                    </div>
                </DialogHeader>
                <div className="py-8">
                    <div className='flex justify-between items-center bg-card/50 p-4 rounded-lg border border-primary/20'>
                        <div>
                            <h3 className="font-bold text-lg">{selectedWallet}</h3>
                            <p className="text-sm text-muted-foreground">Easy-to-use browser extension</p>
                        </div>
                         <Wallet className="h-8 w-8 text-primary" />
                    </div>
                </div>
                 <Button variant="ghost" onClick={() => setSelectedWallet(null)} className="absolute top-4 left-4 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </DialogContent>
        )
    }

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">
          Connection page
        </DialogTitle>
        <DialogDescription className="text-center">
          Connect with one of our available providers
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 max-h-[70vh] overflow-y-auto">
        {wallets.map((wallet) => (
          <Button
            key={wallet}
            variant="outline"
            className="w-full h-16 justify-start text-lg bg-card/50 hover:bg-primary/10 border-primary/20"
            onClick={() => setSelectedWallet(wallet)}
          >
            <Wallet className="mr-4 h-6 w-6 text-primary" />
            {wallet}
          </Button>
        ))}
      </div>
    </DialogContent>
  );
}
