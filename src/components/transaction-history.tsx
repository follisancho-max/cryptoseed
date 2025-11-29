
"use client";

import type { Transaction } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type TransactionHistoryProps = {
  transactions: Transaction[];
};

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card className="w-full bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <History className="h-7 w-7 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Here are the most recent transactions from your wallet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg border-primary/20">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20">
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right hidden sm:table-cell">
                  Value (USD)
                </TableHead>
                <TableHead className="text-right hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-primary/10">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
                        {tx.type === "in" ? (
                          <ArrowDownLeft className="h-4 w-4 text-accent" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {tx.type === "in" ? "Received" : "Sent"} {tx.asset}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tx.type === "in" ? `From: ${tx.from}` : `To: ${tx.to}`}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${tx.type === 'in' ? 'text-accent' : 'text-destructive'}`}>
                      {tx.type === 'in' ? '+' : '-'}
                      {tx.amount.toFixed(4)} {tx.asset}
                    </span>
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    ${tx.valueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                   <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                    {formatDistanceToNow(new Date(tx.date), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
