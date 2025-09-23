'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import RocketImage from '@/assets/images/rocket.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import {
  IoMenu,
  IoLogOut,
  IoDocumentText,
  IoSettingsSharp,
  IoFlash,
  IoHome,
} from 'react-icons/io5';
import { toast } from 'sonner';

const dropDownMenuItemStyle =
  'flex gap-2 items-center cursor-pointer data-[highlighted]:bg-violet-100 rounded-lg px-3 py-2';

export default function MainHeader({
  onlineGenerator = false,
}: {
  onlineGenerator?: boolean;
}) {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  function handleChangePage() {
    if (onlineGenerator) {
      router.push('/');
      return;
    }

    router.push('/api-docs');
  }

  function handleLogout() {
    // aqui vai a lógica de logout (limpar token, etc)
    toast.warning('Função de logout não implementada.');
  }

  return (
    <div className="h-28 md:h-24 bg-violet-400 shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:max-w-3/4 mx-auto gap-5 items-center h-full px-8">
        <Link href={'/'} className="font-semibold text-2xl text-white">
          DevRandom
        </Link>

        <div className="flex items-center gap-4">
          {isLogged ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                 text-white px-4 py-2 text-lg rounded-xl shadow font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <IoMenu className="w-6 h-6" />
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl shadow-lg p-2">
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard')}
                  className={dropDownMenuItemStyle}
                >
                  <IoHome /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/')}
                  className={dropDownMenuItemStyle}
                >
                  <IoFlash /> Gerador online
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/api-docs')}
                  className={dropDownMenuItemStyle}
                >
                  <IoDocumentText /> Documentação da API
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => router.push('/user/profile')}
                  className={dropDownMenuItemStyle}
                >
                  <IoSettingsSharp /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={dropDownMenuItemStyle}
                >
                  <IoLogOut /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="bg-white text-violet-500 hover:bg-white cursor-pointer font-bold px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform">
                Entrar / Cadastro
              </Button>

              <Button
                onClick={handleChangePage}
                className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                   text-white font-bold text-base sm:text-lg px-6 py-3 rounded-2xl
                   shadow-lg shadow-violet-300
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
