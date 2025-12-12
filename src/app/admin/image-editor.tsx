
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { updateLandingPageImages } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

// We will manage these specific image IDs from the admin panel
const editableImageIds = [
  'why-choose-us-1',
  'why-choose-us-2',
  'why-choose-us-3',
  'unlocking-the-future',
];

type EditableImage = {
  id: string;
  currentUrl: string;
  description: string;
  file: File | null;
  previewUrl: string | null;
};

const initialImages = PlaceHolderImages.filter(p => editableImageIds.includes(p.id));

export function ImageEditor() {
  const { toast } = useToast();
  const [images, setImages] = useState<EditableImage[]>(
    initialImages.map(img => ({
      id: img.id,
      currentUrl: img.imageUrl,
      description: img.description,
      file: null,
      previewUrl: null,
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (id: string, file: File | null) => {
    setImages(currentImages =>
      currentImages.map(img => {
        if (img.id === id) {
          if (img.previewUrl) {
            URL.revokeObjectURL(img.previewUrl);
          }
          const newPreviewUrl = file ? URL.createObjectURL(file) : null;
          return { ...img, file, previewUrl: newPreviewUrl };
        }
        return img;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    let hasFilesToUpload = false;
    images.forEach(image => {
      if (image.file) {
        formData.append(image.id, image.file);
        hasFilesToUpload = true;
      }
    });

    if (!hasFilesToUpload) {
      toast({
        title: "No Changes",
        description: "You haven't selected any new images to upload.",
      });
      setIsSubmitting(false);
      return;
    }

    const result = await updateLandingPageImages(formData);

    if (result.success && result.updatedUrls) {
      toast({
        title: "Success",
        description: "Images have been updated successfully.",
      });
      // Update current URLs and reset file inputs
      setImages(currentImages =>
        currentImages.map(img => {
          if (result.updatedUrls && result.updatedUrls[img.id]) {
            return {
              ...img,
              currentUrl: result.updatedUrls[img.id],
              file: null,
              previewUrl: null,
            };
          }
          return img;
        })
      );
      // Reset file input fields
      Object.values(fileInputRefs.current).forEach(input => {
        if (input) {
          input.value = '';
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.error || "An unknown error occurred.",
      });
    }

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
                    src={image.previewUrl || image.currentUrl}
                    alt={image.description}
                    fill
                    className="object-contain"
                  />
                </div>
                <Input
                  id={image.id}
                  type="file"
                  accept="image/*"
                  ref={el => (fileInputRefs.current[image.id] = el)}
                  onChange={e => handleFileChange(image.id, e.target.files ? e.target.files[0] : null)}
                  className="file:text-foreground"
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
