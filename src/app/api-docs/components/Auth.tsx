import AlertError from '@/components/native/AlertError';
import IntroSectionTitle from './IntroSectionTitle';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import AuthExampleApiKey from './AuthExampleApiKey';

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

        <div className="mt-4">
          <h3 className={sectionTitle}>Exemplo de requisição</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Basta incluir o header <code>x-api-key</code> em sua requisição para
            autenticar.
          </p>
          <AuthExampleApiKey />
        </div>
      </div>
    </div>
  );
}
