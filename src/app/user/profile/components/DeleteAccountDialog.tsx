import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FiAlertTriangle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { http } from '@/app/api/http';
import { toast } from 'sonner';

interface AlertActionDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountDialog({
  open,
  onClose,
}: AlertActionDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) {
      setReason('');
    }
    setIsOpen(open);
  }, [open]);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await http.post('/api/user/delete-account', {
        reason: reason ?? null,
      });
      toast.success('Sua conta foi excluída com sucesso.');
      setTimeout(() => {
        window.location.href = '/user/authenticate';
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      void err;
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-medium text-center text-xl text-gray-900 flex flex-col items-center gap-3">
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
            <span className="block">Excluir conta</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 text-sm space-y-3">
            <p>
              Esta operação é <strong>irreversível</strong>. Ao excluir sua
              conta:
            </p>
            <ul className="text-left list-disc list-inside space-y-1">
              <li>
                Sua conta será removida imediatamente e você perderá acesso ao
                sistema.
              </li>
              <li>
                Por motivos de <strong>segurança</strong>, seus dados
                permanecerão armazenados por <strong>31 dias</strong>.
              </li>
              <li>
                Caso você crie uma nova conta dentro desse período, algumas
                informações anteriores <strong>podem ser exibidas</strong>{' '}
                novamente.
              </li>
              <li>
                Após os 31 dias, todos os dados serão{' '}
                <strong>apagados permanentemente</strong> e não poderão ser
                recuperados.
              </li>
            </ul>
            <p>
              Nenhuma informação é <strong>compartilhada</strong> ou{' '}
              <strong>divulgada</strong> durante esse período. Se decidir voltar
              depois, será necessário{' '}
              <strong>criar uma nova conta do zero</strong>.
            </p>
            <p className="mt-2">
              Além disso, <strong>nenhum contato será realizado</strong> por
              nossa equipe após a exclusão da sua conta, a menos que você opte
              por criar sua conta novamente dentro do prazo de 31 dias.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Motivo da exclusão (opcional)
          </label>
          <Textarea
            placeholder="Nos ajude a entender por que você está excluindo sua conta..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            disabled={isLoading}
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading && <Loader2Icon className="animate-spin mr-2" />}
            Sim, excluir conta
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
