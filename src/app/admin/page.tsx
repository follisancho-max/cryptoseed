
import { ImageEditor } from './image-editor';
import { Toaster } from '@/components/ui/toaster';

export default function AdminPage() {
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl space-y-8">
          <ImageEditor />
        </div>
      </div>
      <Toaster />
    </>
  );
}
