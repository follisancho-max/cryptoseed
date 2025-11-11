"use client";

import type { AnalyzeSeedPhraseForRiskOutput } from "@/ai/flows/analyze-seed-phrase-for-risk";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldAlert, CheckCircle, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type AnalysisResultProps = {
  data: AnalyzeSeedPhraseForRiskOutput;
};

export function AnalysisResult({ data }: AnalysisResultProps) {
  const hasCompromisedAddresses =
    data.compromisedAddresses && data.compromisedAddresses.length > 0;
  const hasUnusualPatterns =
    data.unusualTransactionPatterns && data.unusualTransactionPatterns.trim() !== "";
  
  const isHighRisk = hasCompromisedAddresses || hasUnusualPatterns;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {isHighRisk ? (
             <ShieldAlert className="h-7 w-7 text-destructive" />
          ) : (
            <CheckCircle className="h-7 w-7 text-green-600" />
          )}
         
          Security Analysis Report
        </CardTitle>
        <CardDescription>
            {isHighRisk 
              ? "Potential risks have been identified. Please review carefully."
              : "No critical risks were identified based on our analysis."
            }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            AI Risk Assessment
          </h3>
          <p className="text-muted-foreground">{data.riskAssessment}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
            {hasCompromisedAddresses ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            Known Compromised Addresses
          </h3>
          {hasCompromisedAddresses ? (
            <div className="space-y-2">
              <p className="text-sm text-destructive">
                The following addresses derived from your seed phrase are flagged
                as potentially compromised:
              </p>
              <div className="flex flex-wrap gap-2">
                {data.compromisedAddresses?.map((address, index) => (
                  <Badge key={index} variant="destructive">
                    {address}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No known compromised addresses were found linked to this seed
              phrase.
            </p>
          )}
        </div>

        {hasUnusualPatterns && (
            <>
                <Separator />
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                        Unusual Transaction Patterns
                    </h3>
                    <p className="text-muted-foreground">
                        {data.unusualTransactionPatterns}
                    </p>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
