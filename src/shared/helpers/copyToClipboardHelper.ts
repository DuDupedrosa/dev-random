import { toast } from 'sonner';

export const copyToClipboard = (value: string) => {
  if (!value) return false;

  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast.success('Copiado para a área de transferência!');
      return true;
    })
    .catch(() => {
      toast.error('Não foi possível copiar. Tente novamente.');
      return false;
    });
};
