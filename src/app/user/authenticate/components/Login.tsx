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
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { http } from '@/app/api/http';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import AlertError from '@/components/native/AlertError';
import { Loader2Icon } from 'lucide-react';

const formSchema = z.object({
  email: z.email({ error: 'Email inválido' }).min(1, 'O email é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

const eyeIconStyles =
  'absolute right-3 top-[10px] w-4 h-4 transition-all hover:text-primary cursor-pointer';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [alert, setAlert] = useState<{ show: boolean; message: string } | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAlert(null);

    try {
      await http.post('/api/user/login', values);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        if (status === httpStatusEnum.NOT_FOUND) {
          setAlert({
            show: true,
            message: 'Não encontramos nenhuma conta com este e-mail.',
          });
        } else if (status === httpStatusEnum.BAD_REQUEST) {
          setAlert({ show: true, message: 'E-mail ou senha incorretos.' });
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  data-test="Login:Email"
                  placeholder="Seu email"
                  {...field}
                />
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
                    data-test="Login:Password"
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
          data-test="Login:Submit"
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
