import IntroSectionTitle from './IntroSectionTitle';
import Image from 'next/image';
import ImageRocket from '@/assets/images/rocket.png';
import AlertInfoSite from '@/components/native/AlertInfoSite';

export default function Overview() {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <IntroSectionTitle
          title="Bem-vindo ao DevRandom"
          description="O DevRandom é uma plataforma simples e poderosa para gerar dados aleatórios. Ideal para desenvolvedores que precisam de informações fictícias para testes e prototipagem."
        />
        <IntroSectionTitle
          title="Nossa missão"
          description="Facilitar a vida de desenvolvedores fornecendo uma API intuitiva para gerar documentos e, futuramente, diversos outros tipos de dados de teste de forma rápida e segura."
        />
      </div>

      <div className="mt-12 pb-5 border-b border-b-gray-300">
        <h1 className="text-gray-900 text-2xl font-medium">
          Visão geral da API
        </h1>

        <div className="mt-4 bg-gray-100 border border-gray-300 rounded-xl p-5 text-sm font-mono text-gray-800 shadow-sm">
          <p>
            <strong>Fluxo básico:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Cadastre-se gratuitamente no site.</li>
            <li>Crie sua chave de API no painel do usuário.</li>
            <li>
              Envie a chave no header da sua requisição (ex:{' '}
              <code>x-api-key</code>).
            </li>
            <li>Chame o endpoint correspondente ao dado que deseja gerar.</li>
          </ul>
          <p className="mt-3 text-gray-600 flex items-center gap-1">
            <Image
              alt="rocket-img"
              src={ImageRocket}
              className="max-w-[16px]"
            />
            Em poucos passos você estará gerando documentos aleatórios para seus
            testes!
          </p>
        </div>
      </div>

      <AlertInfoSite />
    </div>
  );
}
