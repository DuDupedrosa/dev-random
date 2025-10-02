'use client';

import MainSection from '@/components/native/MainSection';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { IoLogInOutline } from 'react-icons/io5';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/app/providers/AuthContext';
import { http } from '@/app/api/http';
import OutsideHeader from '@/components/native/OutsideHeader';
import Register from './Register';
import Login from './Login';

export default function Authenticate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearUser } = useAuth();

  useEffect(() => {
    const logout = async () => {
      try {
        await http.post('/api/user/logout');
      } finally {
        clearUser();
      }
    };

    if (
      searchParams.get('error') &&
      searchParams.get('error') === 'unauthorized'
    ) {
      router.replace('/user/authenticate', { scroll: false });
      setTimeout(() => {
        toast.error('Sua sessão expirou. Faça login novamente.');
      }, 100);
      logout();
    }

    if (
      searchParams.get('cleanUser') &&
      searchParams.get('cleanUser') === 'true'
    ) {
      router.replace('/user/authenticate', { scroll: false });
      clearUser();
    }
  }, [searchParams]);

  return (
    <MainSection>
      <OutsideHeader />

      <div className="px-5 pb-8">
        <Card className="w-full mx-auto mt-12 max-w-2xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <IoLogInOutline className="text-primary w-14 h-14 mb-5" />
              <span className="text-3xl font-semibold block text-gray-900">
                Que bom te ver por aqui!
              </span>
            </CardTitle>
            <CardDescription className="text-center text-base text-gray-900">
              Entre ou cadastre-se para usar o gerador de dados aleatórios.
            </CardDescription>
          </CardHeader>

          <div>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="w-full ">
                  <TabsTrigger
                    value="login"
                    className="cursor-pointer data-[state=active]:shadow"
                  >
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="register" className="cursor-pointer">
                    Cadastrar
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Login />
                </TabsContent>
                <TabsContent value="register">
                  <Register />
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </Card>
      </div>
    </MainSection>
  );
}
