import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FiAlertTriangle } from 'react-icons/fi';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';

interface AlertActionDialogProps {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertActionDialog({
  open,
  title,
  description,
  loading,
  onClose,
  onConfirm,
}: AlertActionDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (loading !== undefined) setIsLoading(loading);
  }, [loading]);

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-medium text-center text-xl text-gray-900 flex flex-col items-center gap-3">
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
            <span className="block">{title}</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5">
          <Button disabled={isLoading} onClick={() => onConfirm()}>
            {isLoading && <Loader2Icon className="animate-spin" />}
            Sim, continuar
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
