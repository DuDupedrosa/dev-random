'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AuthenticatedHeader() {
  const router = useRouter();

  function handleLogout() {
    // aqui vai a lógica de logout (limpar token, etc)
    router.push('/user/authenticate');
  }

  return (
    <div className="h-20 bg-violet-400 shadow-md w-full">
      <div className="flex justify-between items-center md:max-w-3/4 mx-auto h-full px-6">
        {/* Logo */}
        <Link href="/dashboard" className="font-semibold text-2xl text-white">
          DevRandom
        </Link>

        {/* Navegação */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-white font-medium hover:underline"
          >
            Dashboard
          </Link>
          <Link
            href="/user/profile"
            className="text-white font-medium hover:underline"
          >
            Perfil
          </Link>
          <Link href="/api-docs">
            <Button className="bg-white text-violet-500 hover:bg-white shadow px-4 py-2 rounded-xl font-bold">
              API Docs
            </Button>
          </Link>

          {/* Avatar do usuário */}
          <div className="flex items-center gap-2">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.png" alt="user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
