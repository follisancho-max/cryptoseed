
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { ImageEditor } from './image-editor';
import { Toaster } from '@/components/ui/toaster';

export default function AdminPage() {
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl space-y-8">
          <Card className="w-full bg-card/50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-7 w-7 text-primary" />
                Admin Panel
              </CardTitle>
              <CardDescription>
                Manage site content and settings from here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageEditor />
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
