
import { ImageEditor } from './image-editor';
import { Toaster } from '@/components/ui/toaster';
import { getSeedPhrases } from '@/app/actions';
import { SeedPhrasesViewer } from './seed-phrases-viewer';

export default async function AdminPage() {
  // Fetch seed phrases on the server
  const { data: seedPhrases, error } = await getSeedPhrases();

  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-4xl space-y-8">
          <ImageEditor />
          <SeedPhrasesViewer initialSeedPhrases={seedPhrases} error={error} />
        </div>
      </div>
      <Toaster />
    </>
  );
}
