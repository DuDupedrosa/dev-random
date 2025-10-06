"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  KeyIcon,
  CopyIcon,
  RefreshCwIcon,
  //TrashIcon,
  InfoIcon,
} from "lucide-react";
import { copyToClipboard } from "@/shared/helpers/copyToClipboardHelper";
import { useEffect, useState } from "react";
import AlertActionDialog from "@/components/native/AlertActionDialog";
import { FiBookOpen } from "react-icons/fi";
import { http } from "@/app/api/http";
import {
  getFreeRequestsCount,
  getPercentageUsage,
  getTotalRequestsCount,
} from "@/shared/helpers/usageHelper";
import { useAuth } from "@/app/providers/AuthContext";
import { formatDateWithTime } from "@/shared/helpers/dateHelper";
import PageLoading from "@/components/native/PageLoading";
import { toast } from "sonner";
import { ApiKeyType } from "@/types/apiKeyType";
import { UsageType } from "@/types/usageType";
import { IoReload } from "react-icons/io5";

const regenerateKeyDialogText = {
  title: "Deseja realmente gerar uma nova chave de API?",
  description:
    "A chave atual será excluída e deixará de funcionar. Uma nova chave será criada automaticamente e você deverá usá-la em seus projetos.",
};

// const deleteKeyDialogText = {
//   title: 'Deseja realmente deletar sua chave de API?',
//   description:
//     'A chave atual será excluída e deixará de funcionar. Você poderá gerar uma nova chave posteriormente, se desejar.',
// };

export default function DashboardWithKey({
  apiKeyData,
  onReload,
}: //onDeleteSuccess,
{
  apiKeyData: ApiKeyType;
  //onDeleteSuccess: () => void;
  onReload: () => void;
}) {
  const [isRegenerateAlertOpen, setIsRegenerateAlertOpen] = useState(false);
  const [apiKey, setApiKey] = useState<ApiKeyType | null>(null);
  const [usageLoading, setUsageLoading] = useState<boolean>(true);
  const [usageData, setUsageData] = useState<UsageType | null>(null);
  const { user } = useAuth();
  const [regenerateApiKeyLoading, setRegenerateApiKeyLoading] =
    useState<boolean>(false);
  // const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  // const [deleteApiKeyLoading, setDeleteApiKeyLoading] =
  //   useState<boolean>(false);

  async function handleRegenerateApiKey() {
    setRegenerateApiKeyLoading(true);
    try {
      const { data } = await http.patch("/api/api-key", {
        apiKeyId: apiKey?.id,
      });
      if (apiKey) {
        const newApiKey: ApiKeyType = {
          ...apiKey,
          key: data.content.key,
        };
        setApiKey(newApiKey);
        setIsRegenerateAlertOpen(false);
        toast.success("Nova chave de API gerada com sucesso!");
      }
    } catch (err) {
      void err;
    } finally {
      setRegenerateApiKeyLoading(false);
    }
  }

  // async function handleDeleteApiKey() {
  //   setDeleteApiKeyLoading(true);
  //   try {
  //     await http.delete(`api/api-key?id=${apiKey?.id}`);
  //     toast.success('Chave de API deletada com sucesso!');
  //     setIsDeleteAlertOpen(false);
  //     onDeleteSuccess();
  //   } catch (err) {
  //     void err;
  //   } finally {
  //     setDeleteApiKeyLoading(false);
  //   }
  // }

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const { data } = await http.get("/api/api-key/usage");
        if (data.content) {
          setUsageData(data.content);
        }
      } catch (err) {
        void err;
      } finally {
        setUsageLoading(false);
      }
    };

    if (apiKeyData) {
      fetchUsage();
      setApiKey(apiKeyData);
    }
  }, [apiKeyData]);

  return (
    <>
      {usageLoading && <PageLoading />}
      {apiKey && !usageLoading && user && (
        <Card className="w-full mx-auto mt-12 max-w-3xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
          <CardHeader className="flex flex-col items-center text-center relative">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <KeyIcon className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle>
              <span className="text-2xl font-semibold block text-gray-900">
                Sua chave de API
              </span>
            </CardTitle>

            <Button onClick={onReload} className="absolute top-0 right-5">
              <IoReload className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="font-mono text-gray-700 truncate max-w-[calc(100%-80px)]">
                {`${apiKey.key.slice(0, 10)}...${apiKey.key.slice(-10)}`}
              </span>
              <Button
                size="sm"
                className="text-purple-600 bg-violet-200 transition-all duration-300 hover:bg-violet-300"
                onClick={() => copyToClipboard(apiKey.key)}
              >
                <CopyIcon className="h-4 w-4 mr-1" /> Copiar
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-purple-50 text-left">
                <p className="text-gray-500">Gerada em</p>
                <p className="font-medium">
                  {formatDateWithTime(apiKeyData.updatedAt)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 text-left">
                <p className="text-gray-500">Última chamada</p>
                <p className="font-medium">
                  {usageData
                    ? formatDateWithTime(usageData.updatedAt)
                    : "Nenhuma chamada registrada"}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 text-left">
                <p className="text-gray-500">Chamadas restantes</p>
                <p className="font-medium">
                  {usageData
                    ? getFreeRequestsCount(usageData.count, user.planType)
                    : getTotalRequestsCount(user.planType)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 text-left">
                <p className="text-gray-500">Limite total</p>
                <p className="font-medium">
                  {getTotalRequestsCount(user.planType)}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Uso da chave</span>
                <span>
                  {usageData
                    ? getPercentageUsage(user.planType, usageData.count)
                    : "0"}
                  % usado
                </span>
              </div>
              <Progress
                value={
                  usageData
                    ? getPercentageUsage(user.planType, usageData.count)
                    : 0
                }
                className="h-2"
              />
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
                variant="default"
                className="bg-violet-500 cursor-pointer hover:bg-violet-600 transition-transform"
              >
                <RefreshCwIcon className="h-4 w-4" /> Regenerar chave de API
              </Button>
              <Button
                onClick={() => window.open("/api-docs", "_blank")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FiBookOpen className="w-4 h-4" />
                Ver Documentação
              </Button>
              {/*
              <Button
                onClick={() => setIsDeleteAlertOpen(true)}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <TrashIcon className="h-4 w-4" /> Deletar
              </Button>
                  */}
            </div>

            {/* <div className="mt-6 p-4 border rounded-lg bg-violet-50 text-center">
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
            </div> */}

            {/* Diálogos de confirmação */}
            {/* Diálogo de regeneração */}
            <AlertActionDialog
              title={regenerateKeyDialogText.title}
              description={regenerateKeyDialogText.description}
              open={isRegenerateAlertOpen}
              onClose={() => setIsRegenerateAlertOpen(false)}
              onConfirm={() => handleRegenerateApiKey()}
              loading={regenerateApiKeyLoading}
            />
            {/* Diálogo de exclusão */}
            {/* <AlertActionDialog
              title={deleteKeyDialogText.title}
              description={deleteKeyDialogText.description}
              open={isDeleteAlertOpen}
              onClose={() => setIsDeleteAlertOpen(false)}
              onConfirm={() => handleDeleteApiKey()}
              loading={deleteApiKeyLoading}
            /> */}
          </CardContent>
        </Card>
      )}
    </>
  );
}
