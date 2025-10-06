'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { http } from '@/app/api/http';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AlertError from '@/components/native/AlertError';
import { Loader2Icon } from 'lucide-react';
import { AxiosError } from 'axios';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório'),
  email: z.email({ error: 'Email inválido' }).min(1, 'O email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const eyeIconStyles =
  'absolute right-3 top-[10px] w-4 h-4 transition-all hover:text-primary cursor-pointer';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ show: boolean; message: string } | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      lastName: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAlert(null);
    try {
      const payload = { ...values };
      await http.post('/api/user/register', payload);
      toast.success('Conta criada com sucesso!');
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (
          err.response &&
          err.response.status === httpStatusEnum.BAD_REQUEST
        ) {
          setAlert({
            show: true,
            message: 'E-mail já em uso. Tente outro ou faça login.',
          });
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Sua senha"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className={eyeIconStyles}
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FaEye
                      className={eyeIconStyles}
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {alert && alert.show && <AlertError text={alert.message} />}

        <Button
          disabled={loading}
          type="submit"
          className="w-full md:w-1/2 cursor-pointer"
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Enviar
        </Button>
      </form>
    </Form>
  );
}
