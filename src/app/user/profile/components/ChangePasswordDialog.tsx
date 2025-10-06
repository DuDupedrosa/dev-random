import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { http } from '@/app/api/http';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { httpStatusEnum } from '@/shared/enums/httpStatusEnum';
import AlertError from '@/components/native/AlertError';
import AlertSuccess from '@/components/native/AlertSuccess';
import { Loader2Icon } from 'lucide-react';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const eyeIconStyles =
  'absolute right-3 top-[10px] w-4 h-4 transition-all hover:text-primary cursor-pointer';

const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'], // erro vai aparecer no campo de nova senha
  });

export default function ChangePasswordDialog({
  open,
  onClose,
}: ChangePasswordDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<{
    show: boolean;
    text: string;
  } | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAlertError(null);
    try {
      await http.post('/api/user/change-password', values);
      await http.post('/api/user/logout');
      setShowSuccessAlert(true);
      setTimeout(() => {
        router.push('/user/authenticate');
      }, 3000);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (
          err.response &&
          err.response.status === httpStatusEnum.BAD_REQUEST
        ) {
          setAlertError({ show: true, text: 'A senha atual está incorreta.' });
        }
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="gap-1">
          <DialogTitle className="font-semibold text-xl text-gray-900 mb-0">
            Alterar senha
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            preencha os campos abaixo para alterar sua senha
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-5"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Sua senha atual"
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...field}
                      />
                      {showCurrentPassword ? (
                        <FaEyeSlash
                          className={eyeIconStyles}
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        />
                      ) : (
                        <FaEye
                          className={eyeIconStyles}
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Sua nova senha"
                        type={showNewPassword ? 'text' : 'password'}
                        {...field}
                      />
                      {showNewPassword ? (
                        <FaEyeSlash
                          className={eyeIconStyles}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      ) : (
                        <FaEye
                          className={eyeIconStyles}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {alertError && alertError.show && (
              <AlertError text={alertError.text} />
            )}

            {showSuccessAlert && (
              <AlertSuccess text="Senha alterada com sucesso! Aguarde, você será redirecionado para realizar login com a nova senha." />
            )}

            <div className="grid grid-cols-2 gap-5">
              <Button
                disabled={loading || showSuccessAlert}
                type="submit"
                className="w-full"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Alterar senha
              </Button>
              <Button
                disabled={loading || showSuccessAlert}
                type="button"
                onClick={() => onClose()}
                className="w-full"
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
