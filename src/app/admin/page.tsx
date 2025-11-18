
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import content from '@/lib/landing-page-content.json';
import { Separator } from '@/components/ui/separator';

const featureItemSchema = z.object({
  icon: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const formSchema = z.object({
  hero: z.object({
    title: z.string().min(1, 'Hero title is required'),
    subtitle: z.string().min(1, 'Hero subtitle is required'),
    cta: z.string().min(1, 'CTA text is required'),
  }),
  features: z.object({
    title: z.string().min(1, 'Features title is required'),
    subtitle: z.string().min(1, 'Features subtitle is required'),
    items: z.array(featureItemSchema),
  }),
});

export default function AdminPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: content,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'features.items',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be a server action that writes to a file or DB.
    // For this demo, we'll just log it and show a toast.
    console.log('Form values submitted:', values);
    toast({
      title: 'Content Saved!',
      description: 'Your landing page content has been updated (simulation).',
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className='mb-6'>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage the content of your landing page here.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Update the main heading, subheading, and call-to-action button on the landing page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="hero.title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter hero title" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="hero.subtitle"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Enter hero subtitle" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="hero.cta"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Call to Action Button Text</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Get Started" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
              <CardTitle>Features Section</CardTitle>
              <CardDescription>Update the title and subtitle for the features section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="features.title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter features section title" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="features.subtitle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Section Subtitle</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter features section subtitle" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
                <CardTitle>Feature Items</CardTitle>
                <CardDescription>Manage the individual feature blocks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg">Feature {index + 1}</h3>
                        <FormField
                        control={form.control}
                        name={`features.items.${index}.icon`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                             <FormDescription>Icon name from lucide-react (e.g., Wallet, ShieldCheck, Zap). This is currently not editable.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={`features.items.${index}.title`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Feature title" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={`features.items.${index}.description`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Feature description" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                ))}
            </CardContent>
          </Card>

          <Button type="submit">Save Content</Button>
        </form>
      </Form>
    </div>
  );
}
