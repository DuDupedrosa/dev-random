'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IoMenu,
  IoLogOut,
  IoDocumentText,
  IoSettingsSharp,
  IoFlash,
  IoHome,
} from 'react-icons/io5';
import { useAuth } from '@/app/providers/AuthContext';
import { http } from '@/app/api/http';
import LogoLink from './Logo';

const dropDownMenuItemStyle =
  'flex gap-2 items-center cursor-pointer data-[highlighted]:bg-violet-100 rounded-lg px-3 py-2';

export default function MainHeader() {
  const router = useRouter();
  const { clearUser } = useAuth();

  async function handleLogout() {
    try {
      await http.post('/api/user/logout');
    } finally {
      clearUser();
      router.push('/user/authenticate');
    }
  }

  return (
    <div className="h-28 md:h-24 bg-violet-400 shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:max-w-3/4 mx-auto gap-5 items-center h-full px-8">
        <LogoLink authenticate={true} />

        <div className="flex items-center gap-4">
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
                onClick={() => window.open('/api-docs', '_blank')}
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
        </div>
      </div>
    </div>
  );
}
