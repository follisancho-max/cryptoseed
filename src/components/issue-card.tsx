
'use client';

import Link from 'next/link';
import * as issueIcons from './issue-icons';

type IssueCardProps = {
  title: string;
  description: string;
  iconName: keyof typeof issueIcons;
};

export function IssueCard({ title, description, iconName }: IssueCardProps) {
  const Icon = issueIcons[iconName] as React.ComponentType<{ className?: string }> | undefined;

  return (
    <Link
      href={`/wallet?issue=${encodeURIComponent(title)}`}
      className="block bg-card/50 border-primary/20 border p-6 rounded-lg hover:bg-primary/10 transition-colors group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {Icon && <Icon className="h-10 w-10 text-primary/50 group-hover:text-primary transition-colors" />}
      </div>
    </Link>
  );
}
