'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InfoIcon, Loader2Icon } from 'lucide-react';
import ChangePasswordDialog from './ChangePasswordDialog';
import { useEffect, useState } from 'react';
import AlertActionDialog from '@/components/native/AlertActionDialog';
import { useAuth } from '@/app/providers/AuthContext';
import { http } from '@/app/api/http';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import PageLoading from '@/components/native/PageLoading';
import { motion } from 'framer-motion';

const deleteAccountText = {
  title: 'Excluir conta',
  description:
    'Esta operação é irreversível e resultará na perda definitiva de todos os seus dados. Tem certeza de que deseja prosseguir?',
};

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório'),
});

export default function Profile() {
  const [openDialogChangePassword, setOpenDialogChangePassword] =
    useState(false);
  const [openDialogDeleteAccount, setOpenDialogDeleteAccount] = useState(false);
  const { user, loading, setUser, clearUser } = useAuth();
  const [updateProfileLoading, setUpdateProfileLoading] =
    useState<boolean>(false);
  const [deleteAccountLoading, setDeleteAccountLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUpdateProfileLoading(true);
    try {
      const { data } = await http.patch('/api/user', values);
      setUser(data.content);
      toast.success('Perfil atualizado com sucesso!');
    } catch (err) {
      void err;
    } finally {
      setUpdateProfileLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleteAccountLoading(true);
    try {
      await http.delete('/api/user');
      toast.success('Sua conta foi excluída com sucesso.');
      setTimeout(() => {
        window.location.href = '/user/authenticate';
      }, 1000);
    } catch (err) {
      setDeleteAccountLoading(false);
      void err;
    }
  }

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        lastName: user.lastName ?? '',
      });
    }
  }, [user]);

  return (
    <>
      {loading && <PageLoading />}
      {user && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Card className="w-full mx-auto mt-12 max-w-xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="text-xl font-semibold text-gray-900">
                {`${user.name} ${user.lastName}`}
              </CardTitle>
              <CardDescription>
                Gerencie suas informações de perfil
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="pb-5 border-b border-b-gray-400">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobrenome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu sobrenome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input defaultValue={user.email} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-transparent border border-blue-400  text-blue-400 text-sm">
                      <InfoIcon className="h-4 w-4 mt-0.5" />
                      <p>
                        Para alterar seu email, entre em contato com o suporte.
                      </p>
                    </div>

                    <Button
                      disabled={updateProfileLoading}
                      type="submit"
                      className="w-full"
                    >
                      {updateProfileLoading && (
                        <Loader2Icon className="animate-spin" />
                      )}
                      Salvar
                    </Button>
                  </form>
                </Form>
              </div>

              <div>
                <span className="block text-lg font-medium text-gray-900">
                  Segurança da conta
                </span>
                <div className="flex flex-col gap-5 mt-5">
                  <Button
                    onClick={() => setOpenDialogChangePassword(true)}
                    variant={'outline'}
                    className="border-gray-900 hover:bg-gray-200 hover:border-gray-200 transition-all duration-300"
                  >
                    Alterar senha
                  </Button>
                  <Button
                    onClick={() => setOpenDialogDeleteAccount(true)}
                    variant={'outline'}
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                  >
                    Excluir conta
                  </Button>
                </div>
              </div>

              <ChangePasswordDialog
                onClose={() => setOpenDialogChangePassword(false)}
                open={openDialogChangePassword}
              />
              <AlertActionDialog
                title={deleteAccountText.title}
                description={deleteAccountText.description}
                open={openDialogDeleteAccount}
                onClose={() => setOpenDialogDeleteAccount(false)}
                onConfirm={() => handleDeleteAccount()}
                loading={deleteAccountLoading}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
