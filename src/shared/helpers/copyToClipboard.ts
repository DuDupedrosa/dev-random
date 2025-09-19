import { toast } from "sonner";

export const copyToClipboard = (value: string) => {
  if (!value) return;

  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast.success("Copiado para a área de transferência!");
    })
    .catch(() => {
      toast.error("Não foi possível copiar. Tente novamente.");
    });
};
