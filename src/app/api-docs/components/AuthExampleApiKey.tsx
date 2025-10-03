'use client';

import { JSX, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaNodeJs } from 'react-icons/fa6';
import { SiAxios, SiPython, SiDotnet, SiCurl } from 'react-icons/si';
import useMedia from '@/components/native/UseMedia';

const codeExamples = {
  curl: `curl -X GET "https://dev-random.vercel.app/rota_example" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: SUA_CHAVE_AQUI"`,

  node: `fetch("https://dev-random.vercel.app/rota_example", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "SUA_CHAVE_AQUI"
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,

  axios: `import axios from "axios";

axios.get("https://dev-random.vercel.app/rota_example", {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "SUA_CHAVE_AQUI"
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

  python: `import requests

url = "https://dev-random.vercel.app/rota_example"
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

var response = await client.GetAsync("https://dev-random.vercel.app/rota_example");
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`,
};

const examplesMeta: Record<
  string,
  { icon: JSX.Element; lang: string; label: string }
> = {
  curl: {
    icon: <SiCurl className="text-gray-500 text-base" />,
    lang: 'bash',
    label: 'Curl',
  },
  node: {
    icon: <FaNodeJs className="text-green-600 text-base" />,
    lang: 'javascript',
    label: 'Node',
  },
  axios: {
    icon: <SiAxios className="text-sky-500 text-base" />,
    lang: 'javascript',
    label: 'Axios',
  },
  python: {
    icon: <SiPython className="text-yellow-500 text-base" />,
    lang: 'python',
    label: 'Python',
  },
  csharp: {
    icon: <SiDotnet className="text-blue-600 text-base" />,
    lang: 'csharp',
    label: 'C#',
  },
};

export default function AuthExampleApiKey() {
  const [selected, setSelected] = useState<keyof typeof codeExamples>('curl');
  const isMobile = useMedia('(max-width: 768px)');
  const isMobileSmall = useMedia('(max-width: 480px)');

  return (
    <div className="mt-5 space-y-4">
      <div className="flex flex-wrap gap-2 max-[680px]:flex-col">
        {Object.keys(codeExamples).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key as keyof typeof codeExamples)}
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
                  ? 'bg-gray-200 border-gray-400 text-gray-900'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {examplesMeta[key].icon} {examplesMeta[key].label}
          </button>
        ))}
      </div>

      {!isMobileSmall && (
        <>
          {isMobile ? (
            <SyntaxHighlighter
              language={examplesMeta[selected].lang}
              style={oneDark}
              customStyle={{
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                padding: '1rem',
                maxWidth: '320px',
                overflowX: 'auto',
                paddingBottom: '20px',
              }}
            >
              {codeExamples[selected]}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter
              language={examplesMeta[selected].lang}
              style={oneDark}
              customStyle={{
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                padding: '1rem',
                paddingBottom: '20px',
              }}
            >
              {codeExamples[selected]}
            </SyntaxHighlighter>
          )}
        </>
      )}

      {isMobileSmall && (
        <SyntaxHighlighter
          language={examplesMeta[selected].lang}
          style={oneDark}
          customStyle={{
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            padding: '1rem',
            paddingBottom: '20px',
            width: '260px',
          }}
        >
          {codeExamples[selected]}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
