'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaCopy, FaLightbulb } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { documentsEnum, DocumentsEnum } from '@/shared/enums/documentsEnum';
import { copyToClipboard } from '@/shared/helpers/copyToClipboardHelper';
import { generateRandomDocument } from '@/shared/helpers/generateRandomDocumentHelper';
import { documentsOptionsList } from '@/shared/data/documents';
import ImageRocket from '@/assets/images/rocket.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AlertInfoSite from '../AlertInfoSite';

function RandomValueValueAndCopyButton({
  value,
  onCopy,
}: {
  value: string;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      <span className="block">{value}</span>
      <Button
        onClick={() => onCopy()}
        title="Copiar"
        className="cursor-pointer transition-transform hover:scale-105"
        size={'icon'}
      >
        <FaCopy />
      </Button>
    </div>
  );
}

export default function DocumentsComponent() {
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentsEnum>(documentsEnum.CPF);
  const [generatedValue, setGeneratedValue] = useState<string>('');
  const [formatOnGenerate, setFormatOnGenerate] = useState<boolean>(true);
  const [showFormatOption, setShowFormatOption] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function handleGenerateValue() {
    setLoading(true);
    try {
      const value = generateRandomDocument(
        selectedDocumentType,
        showFormatOption && formatOnGenerate
      );

      if (value) {
        setTimeout(() => {
          setLoading(false);
          setGeneratedValue(value);
        }, 500);
      }
    } catch (err) {
      void err;
      setLoading(false);
    }
  }

  function handleClean() {
    setFormatOnGenerate(true);
    setGeneratedValue('');
  }

  useEffect(() => {
    setFormatOnGenerate(true);
    const documentsWithoutFormat: DocumentsEnum[] = [
      documentsEnum.CNH,
      documentsEnum.PASSAPORTE,
      documentsEnum.INSCRICAO_ESTADUAL,
    ];

    if (documentsWithoutFormat.includes(selectedDocumentType)) {
      setShowFormatOption(false);
    } else {
      setShowFormatOption(true);
    }
  }, [selectedDocumentType]);

  return (
    <Card className="w-full max-w-3xl shadow-lg rounded-3xl transition-shadow hover:shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold text-gray-900">
          Gerador de Documentos
        </CardTitle>
        <CardDescription className="text-base">
          <p className="mb-1">
            Selecione o tipo de documento abaixo e clique em{' '}
            <span className="font-semibold">{'Gerar'}</span> para criar um valor
            aleatório. <br /> Ideal para testes e prototipação.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid pb-5 border-b border-b-gray-200 grid-cols-1  gap-6">
          <div className="space-y-3">
            <Label className="text-gray-700 text-sm">Tipo de Documento</Label>
            <Select
              defaultValue={String(documentsEnum.CPF)}
              onValueChange={(value) =>
                setSelectedDocumentType(Number(value) as DocumentsEnum)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o documento" />
              </SelectTrigger>
              <SelectContent>
                {documentsOptionsList.map((document, i) => {
                  return (
                    <SelectItem key={i} value={String(document.value)}>
                      {document.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-4">
            <div
              className={`flex items-center transition-all duration-300 cursor ${
                showFormatOption ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Checkbox
                className={`${
                  showFormatOption ? 'cursor-pointer' : 'cursor-default'
                }`}
                checked={formatOnGenerate}
                id="pontuacao"
                onCheckedChange={(value) => setFormatOnGenerate(value === true)}
              />
              <Label
                htmlFor="pontuacao"
                className={`text-sm pl-2 ${
                  showFormatOption ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                Gerar com pontuação
              </Label>
            </div>

            <div className="flex gap-5">
              <Button
                disabled={loading}
                onClick={handleGenerateValue}
                title="Gerar"
                className={`flex-1 bg-violet-500 hover:bg-violet-600 transition-transform hover:scale-105 ${
                  loading ? 'cursor-wait' : 'cursor-pointer'
                }`}
              >
                Gerar
              </Button>
              <Button
                disabled={loading}
                onClick={handleClean}
                title="Limpar"
                variant="outline"
                className={`flex-1 cursor-pointer hover:bg-violet-50 transition-transform hover:scale-105 ${
                  loading ? 'cursor-wait' : 'cursor-pointer'
                }`}
              >
                Limpar
              </Button>
            </div>

            <div className="p-3  min-h-14 border rounded-lg bg-muted/40 text-center text-gray-700 text-lg font-medium">
              {generatedValue && !loading ? (
                <>
                  <RandomValueValueAndCopyButton
                    value={generatedValue}
                    onCopy={() => copyToClipboard(generatedValue)}
                  />
                </>
              ) : (
                <span className="block text-sm">
                  {loading
                    ? 'Gerando...'
                    : '   Nenhum documento foi gerado ainda — clique em Gerar para começar.'}
                </span>
              )}
            </div>
          </div>
        </div>

        <AlertInfoSite />

        <div className="mt-6 p-4 border rounded-lg bg-violet-50 text-center">
          <div className="grid grid-cols-[20px_1fr] mb-3">
            <FaLightbulb className="text-yellow-500 w-5" />
            <p className="text-sm text-gray-800">
              Precisa automatizar a geração de documentos? Use nossa{' '}
              <span className="font-bold">API gratuita</span> para integrar em
              seus testes e projetos.
            </p>
          </div>
          <Button
            onClick={() => router.push('/api-docs')}
            variant="default"
            className="bg-violet-500 cursor-pointer hover:bg-violet-600 transition-transform hover:scale-105"
          >
            <Image src={ImageRocket} alt="rocket" className="max-w-[18px]" />
            Acessar Documentação da API
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
