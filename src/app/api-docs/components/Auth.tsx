import AlertError from '@/components/native/AlertError';
import IntroSectionTitle from './IntroSectionTitle';
import Link from 'next/link';
import { FaArrowRight, FaCopy } from 'react-icons/fa6';
import AuthExampleApiKey from './AuthExampleApiKey';
import { FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { copyToClipboard } from '@/shared/helpers/copyToClipboardHelper';

const listStyle = 'flex items-start gap-2';
const sectionTitle = 'text-gray-900 text-xl font-medium';

export default function Auth() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <IntroSectionTitle
          title="Autenticação"
          description="Para começar a utilizar a API do DevRandom, você precisa gerar uma chave de acesso (API Key)."
        />

        <h2 className={sectionTitle}>Como gerar minha chave de API?</h2>

        <ul className="space-y-4 bg-gray-100 rounded-xl p-5 border border-gray-300 text-gray-800 shadow-sm">
          <li>
            <p className={listStyle}>
              <span>1.</span>
              <span className="flex items-center gap-2 flex-wrap">
                <span className="block">
                  Crie sua conta em nossa plataforma. O cadastro é gratuito e
                  rápido.
                </span>
                <Link
                  target="_blank"
                  href={'/user/authenticate'}
                  className="underline text-primary text-sm transition-all hover:text-violet-600 flex items-center gap-1"
                >
                  Acessar plataforma
                  <FaArrowRight />
                </Link>
              </span>
            </p>
          </li>
          <li>
            <p className={listStyle}>
              <span>2.</span>
              <span>
                Ao acessar sua conta, você verá a tela inicial. Clique no botão{' '}
                <strong>{`"Gerar chave de API"`}</strong> para criar sua
                primeira chave. Após isso, seu <em>dashboard</em> será
                atualizado com as informações da chave gerada.
              </span>
            </p>
          </li>
          <li>
            <p className={listStyle}>
              <span>3.</span>
              <span>
                Com a chave criada, clique em{' '}
                <span className="font-bold">{`"Copiar chave"`}</span> e use-a no
                cabeçalho (<code>x-api-key</code>) de todas as suas requisições.
                (Logo abaixo você consegue conferir alguns{' '}
                <span className="font-bold">exemplos</span> de como passar essa
                chave no header)
              </span>
            </p>
          </li>
        </ul>
        <AlertError text="Importante: você pode regenerar sua chave de API a qualquer momento no dashboard. Se fizer isso, a chave antiga será excluída e deixará de funcionar. Sempre utilize a chave mais recente para evitar erros 401." />

        <div>
          <h3 className={sectionTitle}>Exemplo de requisição</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Basta incluir o header <code>x-api-key</code> em sua requisição para
            autenticar.
          </p>
          <AuthExampleApiKey />
        </div>

        <div className="p-5 rounded-xl border border-blue-300 bg-blue-50/50 text-blue-700 text-sm leading-relaxed">
          <h4 className="flex items-center gap-2 font-semibold text-blue-800 text-base mb-2">
            <FiSearch className="text-blue-600" size={18} />
            Teste sua configuração (opcional)
          </h4>
          <p>
            Se preferir, antes de integrar a API ao seu projeto, você pode
            testar se o header{' '}
            <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-800">
              x-api-key
            </code>{' '}
            está sendo enviado corretamente. Para isso, basta fazer uma
            requisição{' '}
            <code className="px-1 py-0.5 rounded bg-blue-100 text-blue-800">
              GET
            </code>{' '}
            para o endpoint abaixo (no formato dos exemplos acima):
          </p>

          <code className="bg-white flex items-center gap-5 border border-blue-200 text-blue-800 rounded-md px-3 py-2 mt-3 font-mono text-sm break-all">
            {process.env.NEXT_PUBLIC_API_BASE_URL!}/api-key/is-valid
            <FaCopy
              onClick={() =>
                copyToClipboard(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL!}/api-key/is-valid`
                )
              }
              title="Copiar endpoint"
              className="text-blue-600 cursor-pointer transition-all hover:text-blue-700"
              size={18}
            />
          </code>

          <ul className="mt-4 space-y-2">
            <li className="grid grid-cols-[20px_1fr] items-start gap-2">
              <FiCheckCircle className="text-green-600 mt-0.5" size={18} />
              <span>
                Se tudo estiver configurado corretamente, a API retornará o
                status{' '}
                <code className="px-1 py-0.5 rounded bg-green-100 text-green-700">
                  200
                </code>{' '}
                com o conteúdo{' '}
                <code className="px-1 py-0.5 rounded bg-green-100 text-green-700">
                  {'"Sucesso"'}
                </code>
                .
              </span>
            </li>

            <li className="grid grid-cols-[20px_1fr] gap-2">
              <FiXCircle className="text-red-600 mt-0.5" size={18} />
              <span>
                Caso o header não tenha sido configurado corretamente ou a chave
                seja inválida, a resposta será{' '}
                <code className="px-1 py-0.5 rounded bg-red-100 text-red-700">
                  401
                </code>{' '}
                com a mensagem{' '}
                <code className="px-1 py-0.5 rounded bg-red-100 text-red-700">
                  {'"Invalid API Key"'}
                </code>
                .
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
