'use client';

import MainFooter from '@/components/native/MainFooter';
import OutsideHeader from '@/components/native/OutsideHeader';
import { useRouter } from 'next/navigation';
import { TbArrowBackUp } from 'react-icons/tb';

export default function PoliticaPrivacidadePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OutsideHeader onlineGenerator={true} />

      <main className="flex-grow px-6 py-10 max-w-3xl mx-auto text-sm text-gray-700 space-y-6">
        <span
          onClick={() => router.back()}
          className="flex items-center gap-2 max-w-max p-2 text-lg text-violet-600 hover:underline cursor-pointer transition"
        >
          <TbArrowBackUp className="w-6 h-6" />
          <span>Voltar</span>
        </span>

        <h1 className="text-2xl font-bold text-gray-900">
          Política de Privacidade
        </h1>
        <p>
          Esta Política de Privacidade descreve como suas informações são
          coletadas, utilizadas e protegidas ao utilizar a plataforma{' '}
          <strong>DevRandom</strong>.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          1. Informações Coletadas
        </h2>
        <p>
          Coletamos apenas as informações necessárias para o funcionamento da
          plataforma: <strong>nome, sobrenome, e-mail e senha</strong>. Essas
          informações são fornecidas diretamente por você no momento do cadastro
          e são utilizadas exclusivamente para autenticação e manutenção da sua
          conta.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          2. Uso das Informações
        </h2>
        <p>
          As informações coletadas são utilizadas para oferecer e melhorar os
          serviços do <strong>DevRandom</strong>, autenticar seu acesso à
          plataforma, enviar comunicações importantes (como confirmação de
          cadastro ou recuperação de senha) e garantir a segurança e o bom
          funcionamento do sistema.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          3. Compartilhamento de Dados
        </h2>
        <p>
          Não compartilhamos suas informações pessoais com terceiros, exceto
          quando exigido por lei ou mediante sua autorização explícita. Seus
          dados nunca são vendidos, cedidos ou utilizados para fins de marketing
          externo.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">4. Cookies</h2>
        <p>
          Utilizamos cookies e tecnologias semelhantes para melhorar sua
          experiência de navegação, manter você autenticado durante a sessão e
          coletar estatísticas anônimas de uso que nos ajudam a aprimorar a
          plataforma.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          5. Armazenamento e Segurança
        </h2>
        <p>
          Seus dados são armazenados com segurança e protegidos por medidas
          técnicas e organizacionais para evitar acesso não autorizado, perda,
          alteração ou divulgação indevida. Trabalhamos continuamente para
          manter a segurança e a integridade das informações fornecidas.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          6. Exclusão de Conta
        </h2>
        <p>
          Você pode solicitar a exclusão da sua conta e dos seus dados a
          qualquer momento por meio das configurações da plataforma ou entrando
          em contato conosco.
        </p>
        <p>
          Após a solicitação, suas informações permanecerão armazenadas por{' '}
          <strong>31 dias</strong> por motivos de segurança e prevenção de
          fraudes. Durante esse período, elas não serão utilizadas nem
          compartilhadas, mas poderão ser recuperadas caso você opte por criar
          uma nova conta com o mesmo e-mail.
        </p>
        <p>
          Passados os 31 dias, todos os seus dados serão{' '}
          <strong>definitivamente removidos</strong> dos nossos sistemas.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">
          7. Alterações nesta Política
        </h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente para
          refletir mudanças na forma como tratamos suas informações ou para
          cumprir requisitos legais. A versão mais recente estará sempre
          disponível nesta página.
        </p>

        <h2 className="text-lg font-semibold text-gray-800">8. Contato</h2>
        <p>
          Em caso de dúvidas, solicitações ou preocupações relacionadas à sua
          privacidade, entre em contato conosco pelo e-mail:{' '}
          <a
            href="mailto:contato@devrandom.com"
            className="text-violet-600 hover:underline ml-1"
          >
            contato@devrandom.com
          </a>
        </p>
      </main>

      <MainFooter />
    </div>
  );
}
