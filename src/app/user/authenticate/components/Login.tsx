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

const formSchema = z.object({
  email: z.email({ error: 'Email inválido' }).min(1, 'O email é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
});

const eyeIconStyles =
  'absolute right-3 top-[10px] w-4 h-4 transition-all hover:text-primary cursor-pointer';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <Input placeholder="email@example.com" {...field} />
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
                    placeholder="********"
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
        <Button type="submit" className="w-full md:w-1/2 cursor-pointer">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
