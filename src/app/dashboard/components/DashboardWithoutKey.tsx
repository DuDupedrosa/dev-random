import { http } from '@/app/api/http';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ApiKeyType } from '@/types/apiKeyType';
import { UserType } from '@/types/userType';
import { KeyIcon, Loader2Icon, RocketIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DashboardWithoutKey({
  onAddApiKey,
  user,
}: {
  onAddApiKey: (data: ApiKeyType) => void;
  user: UserType;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGenerateApiKey() {
    setLoading(true);
    try {
      const { data } = await http.post('/api/api-key');
      toast.success('Sua chave de API foi criada com sucesso!');
      onAddApiKey(data.content);
    } catch (err) {
      void err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full mx-auto mt-12 max-w-3xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
      <CardHeader className="flex flex-col items-center text-center">
        <div className="bg-purple-100 p-3 rounded-full mb-3">
          <RocketIcon className="h-8 w-8 text-purple-600" />
        </div>
        <CardTitle>
          <span className="text-2xl font-semibold block text-gray-900">
            Olá, Eduardo!
          </span>
        </CardTitle>
        <CardDescription className="text-base text-gray-700">
          Bem-vindo ao seu dashboard! Aqui você pode gerenciar suas chaves de
          API e conferir os detalhes de uso.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        {/* Alerta para conta apagada recentemente */}
        {user.recentlyDeleteAccount && (
          <div className="flex mb-5 transition-all fade-in duration-300 items-start gap-2 p-3 rounded-lg bg-yellow-100 text-yellow-700 text-sm">
            <p>
              Percebemos que você recriou sua conta recentemente. Como seus
              dados da conta anterior ainda são mantidos por{' '}
              <span className="font-bold">31 dias</span> após a exclusão,
              algumas informações podem aparecer na dashboard se você criar uma
              nova chave de API nesse período.
            </p>
          </div>
        )}

        <Alert className="mb-4">
          <AlertTitle>
            Você ainda não tem uma chave de API registrada.
          </AlertTitle>
          <AlertDescription>
            <span className="block text-center mx-auto">
              Para começar, crie sua primeira chave de API clicando abaixo.
            </span>
          </AlertDescription>
        </Alert>

        <Button
          disabled={loading}
          onClick={handleGenerateApiKey}
          className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                   text-white font-medium text-base sm:text-lg px-6 py-3 rounded-2xl
                   shadow-lg shadow-violet-300
                   hover:scale-110 hover:shadow-xl hover:shadow-violet-400
                   transition-all duration-300 ease-out"
        >
          {loading && <Loader2Icon className="animate-spin" />}
          <KeyIcon className="mr-2 h-5 w-5" /> Gerar chave de API
        </Button>
      </CardContent>
    </Card>
  );
}
