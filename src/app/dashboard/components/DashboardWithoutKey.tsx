import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { KeyIcon, RocketIcon } from 'lucide-react';

export default function DashboardWithoutKey() {
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
          className="bg-gradient-to-r cursor-pointer from-fuchsia-500 via-violet-500 to-indigo-500
                   text-white font-medium text-base sm:text-lg px-6 py-3 rounded-2xl
                   shadow-lg shadow-violet-300
                   hover:scale-110 hover:shadow-xl hover:shadow-violet-400
                   transition-all duration-300 ease-out"
        >
          <KeyIcon className="mr-2 h-5 w-5" /> Gerar chave de API
        </Button>
      </CardContent>
    </Card>
  );
}
