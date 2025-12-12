
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// We will manage these specific image IDs from the admin panel
const editableImageIds = [
  'why-choose-us-1',
  'why-choose-us-2',
  'why-choose-us-3',
  'unlocking-the-future',
];

const initialImages = PlaceHolderImages.filter(p => editableImageIds.includes(p.id));

export function ImageEditor() {
  const [images, setImages] = useState<ImagePlaceholder[]>(initialImages);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUrlChange = (id: string, newUrl: string) => {
    setImages(currentImages =>
      currentImages.map(img =>
        img.id === id ? { ...img, imageUrl: newUrl } : img
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In the next step, we will implement the server action to save this data.
    console.log('Saving images:', images);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsSubmitting(false);
  };

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle>Edit Landing Page Images</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.map(image => (
              <div key={image.id} className="space-y-3">
                <Label htmlFor={image.id} className="capitalize text-lg">
                  {image.id.replace(/-/g, ' ')}
                </Label>
                <div className="relative aspect-video w-full overflow-hidden rounded-md border border-primary/20">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-contain"
                  />
                </div>
                <Input
                  id={image.id}
                  value={image.imageUrl}
                  onChange={e => handleUrlChange(image.id, e.target.value)}
                  placeholder="Enter new image URL"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
