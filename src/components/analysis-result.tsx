"use client";

import type { WalletData, Asset } from "@/app/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Landmark } from "lucide-react";

type AnalysisResultProps = {
  data: WalletData;
};

const networkIcons: { [key: string]: React.ReactNode } = {
    "Ethereum": <Landmark className="h-5 w-5 text-gray-500" />,
    "Bitcoin": <Landmark className="h-5 w-5 text-orange-500" />,
    "Solana": <Landmark className="h-5 w-5 text-purple-500" />,
    "Polygon": <Landmark className="h-5 w-5 text-indigo-500" />,
    "BNB Smart Chain": <Landmark className="h-5 w-5 text-yellow-500" />
};

export function AnalysisResult({ data }: AnalysisResultProps) {
  const totalValue = data.assets.reduce((acc, asset) => acc + asset.valueUsd, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Wallet className="h-7 w-7 text-primary" />
          My Wallet
        </CardTitle>
        <CardDescription>
          Total estimated value:{" "}
          <span className="font-bold text-foreground">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Asset Overview</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Network</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Value (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.assets.length > 0 ? (
                  data.assets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-2">
                        {networkIcons[asset.network] || <Landmark className="h-5 w-5" />}
                        {asset.network}
                      </TableCell>
                      <TableCell className="font-medium">{asset.symbol}</TableCell>
                      <TableCell className="text-right">{asset.balance.toFixed(6)}</TableCell>
                      <TableCell className="text-right">
                        ${asset.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                      No assets found for this seed phrase.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
