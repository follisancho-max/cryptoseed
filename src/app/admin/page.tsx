
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';
import { ImageEditor } from './image-editor';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default function AdminPage() {

  const logout = async () => {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/admin/login');
  }

  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl space-y-8">
          <Card className="w-full bg-card/50 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Shield className="h-7 w-7 text-primary" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Manage site content and settings from here.
                </CardDescription>
              </div>
               <form action={logout}>
                <Button variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
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
