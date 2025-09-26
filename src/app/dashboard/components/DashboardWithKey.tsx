'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  KeyIcon,
  CopyIcon,
  RefreshCwIcon,
  TrashIcon,
  InfoIcon,
} from 'lucide-react';
import { copyToClipboard } from '@/shared/helpers/copyToClipboard';
import { useEffect, useState } from 'react';
import AlertActionDialog from '@/components/native/AlertActionDialog';
import { FiBookOpen } from 'react-icons/fi';
import { http } from '@/app/api/http';

const regenerateKeyDialogText = {
  title: 'Deseja realmente gerar uma nova chave de API?',
  description:
    'A chave atual será excluída e deixará de funcionar. Uma nova chave será criada automaticamente e você deverá usá-la em seus projetos.',
};

const deleteKeyDialogText = {
  title: 'Deseja realmente deletar sua chave de API?',
  description:
    'A chave atual será excluída e deixará de funcionar. Você poderá gerar uma nova chave posteriormente, se desejar.',
};

export default function DashboardWithKey() {
  const [isRegenerateAlertOpen, setIsRegenerateAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await http.get('/api/user');

        console.log('%c⧭', 'color: #733d00', data.content);
      } catch (err) {
        console.log('%c⧭', 'color: #00bf00', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <Card className="w-full mx-auto mt-12 max-w-3xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
      <CardHeader className="flex flex-col items-center text-center">
        <div className="bg-purple-100 p-3 rounded-full mb-3">
          <KeyIcon className="h-8 w-8 text-purple-600" />
        </div>
        <CardTitle>
          <span className="text-2xl font-semibold block text-gray-900">
            Sua chave de API
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="font-mono text-gray-700 truncate">
            sk_live_****************abcd
          </span>
          <Button
            size="sm"
            className="text-purple-600 bg-violet-200 transition-all duration-300
            hover:text-white"
            onClick={() => copyToClipboard('sk_live_****************abcd')}
          >
            <CopyIcon className="h-4 w-4 mr-1" /> Copiar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 rounded-lg bg-purple-50 text-left">
            <p className="text-gray-500">Criada em</p>
            <p className="font-medium">23/09/2025</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-left">
            <p className="text-gray-500">Última chamada</p>
            <p className="font-medium">há 2h</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-left">
            <p className="text-gray-500">Chamadas restantes</p>
            <p className="font-medium">9.870</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-left">
            <p className="text-gray-500">Limite total</p>
            <p className="font-medium">10.000</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Uso da chave</span>
            <span>1.3% usado</span>
          </div>
          <Progress value={13} className="h-2" />
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 text-yellow-700 text-sm">
          <InfoIcon className="h-4 w-4 mt-0.5" />
          <p>
            Em breve você poderá escolher planos com limites maiores de
            chamadas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => setIsRegenerateAlertOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" /> Regenerar
          </Button>
          <Button
            onClick={() => setIsDeleteAlertOpen(true)}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <TrashIcon className="h-4 w-4" /> Desativar
          </Button>
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-violet-50 text-center">
          <div className="mb-3">
            <p className="text-sm text-gray-800">
              Consulte a documentação completa da API no botão abaixo.
            </p>
          </div>
          <Button
            variant="default"
            className="bg-violet-500 cursor-pointer hover:bg-violet-600 transition-transform hover:scale-105"
          >
            <FiBookOpen className="w-4 h-4" />
            Ver Documentação
          </Button>
        </div>

        {/* Diálogos de confirmação */}
        {/* Diálogo de regeneração */}
        <AlertActionDialog
          title={regenerateKeyDialogText.title}
          description={regenerateKeyDialogText.description}
          open={isRegenerateAlertOpen}
          onClose={() => setIsRegenerateAlertOpen(false)}
          onConfirm={() => setIsRegenerateAlertOpen(false)}
        />
        {/* Diálogo de exclusão */}
        <AlertActionDialog
          title={deleteKeyDialogText.title}
          description={deleteKeyDialogText.description}
          open={isDeleteAlertOpen}
          onClose={() => setIsDeleteAlertOpen(false)}
          onConfirm={() => setIsDeleteAlertOpen(false)}
        />
      </CardContent>
    </Card>
  );
}
