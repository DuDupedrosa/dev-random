'use client';

import Image from 'next/image';
import NoFoundImage from '@/assets/svg/page-not-found.svg';
import OutsideHeader from '@/components/native/OutsideHeader';
import MainFooter from '@/components/native/MainFooter';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      <OutsideHeader onlineGenerator={true} />

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 space-y-6">
        <Image
          src={NoFoundImage}
          alt={'Page not found'}
          className="max-w-xs md:max-w-md"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-600">
          Página não encontrada!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md">
          Parece que a página que você está procurando não existe.
        </p>
        <Button onClick={() => router.push('/')} className="text-xl p-6">
          Voltar para home
        </Button>
      </main>

      <MainFooter />
    </div>
  );
}
