
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import Link from 'next/link';

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
            asChild
            onClick={onConnect}
          >
            <Link href="/wallet">
              <Wallet className="mr-4 h-6 w-6 text-primary" />
              {wallet}
            </Link>
          </Button>
        ))}
      </div>
    </DialogContent>
  );
}
