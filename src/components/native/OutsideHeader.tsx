'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import RocketImage from '@/assets/images/rocket.png';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { userHasValidToken } from '@/shared/helpers/userHelper';
import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';

export default function OutsideHeader({
  onlineGenerator = false,
}: {
  onlineGenerator?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [redirectToLoginLoading, setRedirectToLoginLoading] =
    useState<boolean>(false);

  function handleChangePage() {
    if (onlineGenerator) {
      router.push('/');
      return;
    }

    router.push('/api-docs');
  }

  async function handleRedirectToLogin() {
    if (redirectToLoginLoading) return;
    setRedirectToLoginLoading(true);
    await userHasValidToken(true);
  }

  return (
    <div className="h-28 md:h-24 bg-violet-400 shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:max-w-3/4 mx-auto gap-5 items-center h-full px-8">
        <Link href={'/'} className="font-semibold text-2xl text-white">
          DevRandom
        </Link>

        <div className="flex items-center gap-4">
          {!pathname.includes('authenticate') && (
            <>
              <Button
                onClick={handleRedirectToLogin}
                className={`bg-gradient-to-r from-violet-500 to-indigo-500 text-white 
                      font-bold px-5 py-2 text-base rounded-xl shadow hover:scale-105 transition ${
                        redirectToLoginLoading ? 'opacity-80' : 'opacity-100'
                      }`}
              >
                {redirectToLoginLoading && (
                  <Loader2Icon className="animate-spin" />
                )}
                Entrar
              </Button>

              <Button
                onClick={handleChangePage}
                className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                   text-white font-bold text-base sm:text-lg px-6 py-3 rounded-2xl
                   hover:scale-110 hover:shadow-xl hover:shadow-violet-400
                   transition-all duration-300 ease-out"
              >
                <Image
                  className="max-w-[20px] sm:max-w-[24px]"
                  alt="Rocket-Icon"
                  src={RocketImage}
                />{' '}
                {onlineGenerator ? 'Gerador online' : 'Utilizar API'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
