
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WalletConnectDialog } from '@/components/wallet-connect-dialog';
import content from "@/lib/issues-content.json";
import { IssueCard } from '@/components/issue-card';

function WalletPageContent() {
  const searchParams = useSearchParams();
  const issue = searchParams.get('issue');

  return (
    <div className="container flex-1 w-full flex flex-col items-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Make Your <span className="text-primary">Selection</span> Below:
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the Issue Affecting Your Wallet for Quick Assistance!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.issues.map((issue) => (
            <IssueCard 
              key={issue.id}
              title={issue.title}
              description={issue.description}
              iconName={issue.iconName}
            />
          ))}
        </div>
      </div>
      <WalletConnectDialog issue={issue} />
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletPageContent />
    </Suspense>
  );
}

