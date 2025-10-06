"use client";

import IntroSectionTitle from "./IntroSectionTitle";
import { FaCopy, FaNodeJs } from "react-icons/fa6";
import { documentsOptionsList } from "@/shared/data/documents";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/shared/helpers/copyToClipboardHelper";
import { SiAxios, SiPython, SiDotnet, SiCurl } from "react-icons/si";
import { JSX, useState } from "react";
import useMedia from "@/components/native/UseMedia";

const listStyle = "flex items-start gap-3 break-all";
const sectionTitle = "text-gray-900 text-2xl font-medium";

const enumExamples = {
  json: JSON.stringify(documentsOptionsList, null, 2),
};

const apiUrl = `${process.env
  .NEXT_PUBLIC_API_BASE_URL!}/generator/documents?documentType={tipo_do_documento}`;

const requestExamples = {
  curl: `curl -X GET "${apiUrl}" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: SUA_CHAVE_AQUI"`,

  node: `fetch("${apiUrl}", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "SUA_CHAVE_AQUI"
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,

  axios: `import axios from "axios";

axios.get("${apiUrl}", {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "SUA_CHAVE_AQUI"
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

  python: `import requests

url = "${apiUrl}"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "SUA_CHAVE_AQUI"
}

response = requests.get(url, headers=headers)
print(response.json())`,

  csharp: `using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("x-api-key", "SUA_CHAVE_AQUI");
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

var response = await client.GetAsync("${apiUrl}");
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`,
};

const requestExamplesMeta: Record<
  string,
  { icon: JSX.Element; lang: string; label: string }
> = {
  curl: {
    icon: <SiCurl className="text-gray-500 text-base" />,
    lang: "bash",
    label: "Curl",
  },
  node: {
    icon: <FaNodeJs className="text-green-600 text-base" />,
    lang: "javascript",
    label: "Node",
  },
  axios: {
    icon: <SiAxios className="text-sky-500 text-base" />,
    lang: "javascript",
    label: "Axios",
  },
  python: {
    icon: <SiPython className="text-yellow-500 text-base" />,
    lang: "python",
    label: "Python",
  },
  csharp: {
    icon: <SiDotnet className="text-blue-600 text-base" />,
    lang: "csharp",
    label: "C#",
  },
};

export default function GeneratorDocument() {
  const isMobile = useMedia("(max-width: 769px)");
  const isMobileSmall = useMedia("(max-width: 480px)");

  const [selected, setSelected] =
    useState<keyof typeof requestExamples>("curl");

  return (
    <div>
      <div className="flex flex-col gap-6">
        <IntroSectionTitle
          title="Gerar documentos"
          description="Para começar a gerar documentos aleatórios, siga os passos abaixo."
        />

        <div>
          <h2 className={sectionTitle}>
            Como chamar o endpoint para gerar documentos
          </h2>

          <div className="flex items-center gap-2 mt-5 flex-wrap pr-5">
            <span className="grid w-12 place-items-center p-0.5 rounded-full bg-green-600 text-white text-xs">
              GET
            </span>
            <span className="block text-base text-gray-600 break-all font-medium">
              {apiUrl}
            </span>
          </div>
        </div>

        <ul className="space-y-4 bg-gray-50 rounded-xl p-6 border border-gray-200 text-gray-800 shadow-sm">
          <li>
            <p className={listStyle}>
              <span className="font-semibold">1.</span>
              <span>
                Certifique-se de já ter sua chave de API. Se ainda não tiver,
                acesse o passo anterior de{" "}
                <span className="font-bold">Autenticação</span> para gerar a
                sua.
              </span>
            </p>
          </li>

          <li>
            <p className={listStyle}>
              <span className="font-semibold">2.</span>
              <span>
                Para gerar um documento, faça uma requisição{" "}
                <span className="font-bold">GET</span> para o endpoint:
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  /api/generator/documents?documentType={"{tipo_documento}"}
                </code>
                . O documento gerado será retornado na propriedade{" "}
                <span className="font-bold">content</span> da resposta.
                <br />
                <br />
                Opcionalmente, você pode incluir a query{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  &mask=false
                </code>{" "}
                para gerar o documento <strong>sem máscara</strong>. Por padrão,
                o valor é <code>true</code>, então você{" "}
                <strong>não precisa enviar</strong> esse parâmetro se quiser que
                a máscara seja aplicada.
                <br />
                <br />
                Lembre-se de conferir se o documento escolhido possui suporte à
                geração com máscara. Abaixo você encontra a lista de tipos
                disponíveis e exemplos de chamadas em diferentes linguagens.
              </span>
            </p>
          </li>
        </ul>

        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2 max-[680px]:flex-col">
            {Object.keys(requestExamples).map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key as keyof typeof requestExamples)}
                className={`
                        w-full sm:w-auto
                        cursor-pointer
                        px-3 py-2 
                        rounded-lg 
                        border 
                        text-sm 
                        font-medium 
                        flex items-center gap-2 
                        transition-colors
                        ${
                          selected === key
                            ? "bg-gray-200 border-gray-400 text-gray-900"
                            : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                        }
                      `}
              >
                {requestExamplesMeta[key].icon} {requestExamplesMeta[key].label}
              </button>
            ))}
          </div>

          {!isMobileSmall && (
            <>
              {isMobile ? (
                <SyntaxHighlighter
                  language={requestExamplesMeta[selected].lang}
                  style={oneDark}
                  customStyle={{
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                    width: "320px",
                    overflowX: "auto",
                    paddingBottom: "20px",
                  }}
                >
                  {requestExamples[selected]}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter
                  language={requestExamplesMeta[selected].lang}
                  style={oneDark}
                  customStyle={{
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                    paddingBottom: "20px",
                    width: "520px",
                  }}
                >
                  {requestExamples[selected]}
                </SyntaxHighlighter>
              )}
            </>
          )}

          {isMobileSmall && (
            <SyntaxHighlighter
              language={requestExamplesMeta[selected].lang}
              style={oneDark}
              customStyle={{
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                padding: "1rem",
                paddingBottom: "20px",
                width: "260px",
              }}
            >
              {requestExamples[selected]}
            </SyntaxHighlighter>
          )}
        </div>

        <div className="mt-4 max-w-[260px] min-[480px]:max-w-max md:max-w-full bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3
            title="Copiar enum"
            className="text-gray-900 font-medium mb-3 flex items-start justify-between"
          >
            Tipos de documentos
            <Button
              onClick={() =>
                copyToClipboard(JSON.stringify(documentsOptionsList, null, 2))
              }
            >
              <FaCopy />
            </Button>
          </h3>
          {!isMobileSmall && (
            <>
              {isMobile ? (
                <SyntaxHighlighter
                  language="json"
                  style={oneDark}
                  customStyle={{
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                    paddingBottom: "20px",
                    height: "300px",
                    width: "320px",
                  }}
                >
                  {enumExamples.json}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter
                  language="json"
                  style={oneDark}
                  customStyle={{
                    borderRadius: "0.75rem",
                    fontSize: "0.875rem",
                    padding: "1rem",
                    paddingBottom: "20px",
                    height: "300px",
                  }}
                >
                  {enumExamples.json}
                </SyntaxHighlighter>
              )}
            </>
          )}

          {isMobileSmall && (
            <SyntaxHighlighter
              language="json"
              style={oneDark}
              customStyle={{
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                padding: "1rem",
                paddingBottom: "20px",
                height: "300px",
                width: "220px",
              }}
            >
              {enumExamples.json}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
}
