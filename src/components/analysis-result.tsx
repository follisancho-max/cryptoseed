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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

type AnalysisResultProps = {
  data: WalletData;
};

const networkIcons: { [key: string]: React.ReactNode } = {
    "Ethereum": <Landmark className="h-5 w-5 text-gray-400" />,
    "Bitcoin": <Landmark className="h-5 w-5 text-orange-400" />,
    "Solana": <Landmark className="h-5 w-5 text-purple-400" />,
    "Polygon": <Landmark className="h-5 w-5 text-indigo-400" />,
    "BNB Smart Chain": <Landmark className="h-5 w-5 text-yellow-400" />
};

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];


export function AnalysisResult({ data }: AnalysisResultProps) {
  const totalValue = data.assets.reduce((acc, asset) => acc + asset.valueUsd, 0);

  const chartData = data.assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.valueUsd,
    fill: chartColors[index % chartColors.length],
  }));

  const chartConfig = data.assets.reduce((acc, asset, index) => {
    acc[asset.symbol] = {
      label: asset.symbol,
      color: chartColors[index % chartColors.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="w-full bg-card/50 border-primary/20">
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
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex-1 flex justify-center">
                 <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-full max-h-[250px]"
                    >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                            nameKey="value"
                            formatter={(value, name) =>
                                `${name}: $${(value as number).toLocaleString()}`
                            }
                            />
                        }
                        />
                        <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        strokeWidth={5}
                        stroke="hsl(var(--background))"
                        >
                        {chartData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Asset Overview</h3>
                <div className="border rounded-lg border-primary/20">
                    <Table>
                    <TableHeader>
                        <TableRow className="border-primary/20">
                        <TableHead>Asset</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead className="text-right">Value (USD)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.assets.length > 0 ? (
                        data.assets.map((asset, index) => (
                            <TableRow key={index} className="border-primary/10">
                                <TableCell className="flex items-center gap-2 font-medium">
                                    {networkIcons[asset.network] || <Landmark className="h-5 w-5" />}
                                    {asset.symbol}
                                </TableCell>
                                <TableCell className="text-right">{asset.balance.toFixed(4)}</TableCell>
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
        </div>
      </CardContent>
    </Card>
  );
}
