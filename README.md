# 🧪 DevRandom

**DevRandom** é uma plataforma para gerar **dados aleatórios para desenvolvedores**, de forma simples, rápida e gratuita.
O projeto conta com:

- ✅ Um **gerador online gratuito** diretamente no navegador.
- 🛠️ Uma **API pronta para uso**, permitindo integração com suas aplicações.

Atualmente, cada usuário possui **limite de 100 chamadas mensais** na API — mas o objetivo é expandir essa capacidade no futuro.

---

## 🚀 Stack Tecnológica

O **DevRandom** é desenvolvido utilizando tecnologias modernas para garantir **performance, segurança e escalabilidade**:

- ⚛️ [Next.js 15 (App Router)](https://nextjs.org/) – Frontend e backend no mesmo projeto
- 🎨 [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) – Componentização e estilização
- 📡 [Axios](https://axios-http.com/) – Consumo da API interna (`/app/api`)
- 🍪 [cookie](https://www.npmjs.com/package/cookie) – Armazenamento seguro do JWT em cookies (nada de localStorage 🚫)
- 🔑 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) – Autenticação JWT
- 📦 [Prisma ORM](https://www.prisma.io/) – ORM com suporte a SQLite e PostgreSQL
- 🪶 [Supabase](https://supabase.com/) – Banco de dados em produção
- 🧪 [Framer Motion](https://www.framer.com/motion/) – Animações fluidas
- 📊 [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) – Exibição de código
- 🔁 [react-hook-form](https://react-hook-form.com/) e [zod](https://zod.dev/) – Manipulação de formulários
- 🔑 [nanoid](https://github.com/ai/nanoid) – Geração de chaves de API
- 🔔 [React Toastify](https://fkhadra.github.io/react-toastify/) – Feedbacks para o usuário
- 🎨 [lucide-react](https://lucide.dev/) e [react-icons](https://react-icons.github.io/react-icons/) – Ícones dinâmicos

---

## 📦 Estrutura do Projeto

O projeto segue uma arquitetura **componentizada e modular**, com separação clara de responsabilidades:

- `/app` – Páginas, rotas e API interna
- `/components` – Componentes reutilizáveis e estilizados
- `/lib` – Helpers e utilitários
- `/prisma` – Configuração do ORM e schema do banco
- `/providers/AuthContext` – Contexto global para autenticação e usuário
- `/tests` – Testes unitários e de integração
- `/cypress` – Testes E2E

---

## 🔐 Autenticação e Segurança

- A autenticação é feita via **JWT**, armazenado **em cookies** para maior segurança (evitando XSS).
- O envio do token JWT é automatizado via interceptor do Axios, com `withCredentials: true`.
  Isso significa que todas as requisições autenticadas já incluem o token de forma automática, sem necessidade de configurar manualmente os headers.
- O **Context API** é utilizado para manter o estado do usuário em memória.
- As rotas da API são protegidas e requerem validação do token.

---

## 🧪 Testes

O projeto conta com duas camadas de testes automatizados: **unitários** (Jest) e **end-to-end (E2E)** (Cypress).

### 🔹 Testes Unitários (Jest)

Os testes unitários foram implementados com **[Jest](https://jestjs.io/)**, cobrindo **todos os helpers e funções utilitárias** da plataforma.
Eles garantem que as funções isoladas do sistema se comportem conforme o esperado.

#### ▶️ Executando os testes unitários:

```bash
npm test
```

O Jest será executado automaticamente e exibirá o relatório de sucesso ou falha dos testes.

---

### 🔹 Testes End-to-End (Cypress)

Os testes E2E foram criados com **[Cypress](https://www.cypress.io/)** para validar **o fluxo completo da aplicação**, simulando a interação de um usuário real.

Antes de executar o Cypress, é necessário criar um arquivo de configuração com as credenciais de um usuário válido da plataforma.

#### 1️⃣ Criar o arquivo `user.json` dentro de `cypress/fixtures/`

```
cypress/fixtures/user.json
```

O conteúdo deve seguir o formato abaixo:

```json
{
  "email": "seu_email@exemplo.com",
  "password": "sua_senha"
}
```

> ⚠️ Certifique-se de que o usuário informado realmente exista na plataforma.

#### 2️⃣ Rodar os testes E2E

Para executar os testes automaticamente (modo headless):

```bash
npx cypress run
```

Ou para abrir o **modo interativo** (útil para visualizar o fluxo no navegador):

```bash
npx cypress open
```

---

## 💻 Executando o Projeto Localmente

### 📋 Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter instalado:

- 🟢 **Node.js v20+**
- 📦 **npm** ou **yarn**
- 🛠️ [Git](https://git-scm.com/)

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/dev-random.git
cd dev-random
```

### 2️⃣ Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3️⃣ Ajustar o `schema.prisma` para usar SQLite localmente

Por padrão, o projeto usa PostgreSQL. Para desenvolvimento local, altere o arquivo **`prisma/schema.prisma`**:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Depois, rode a migration:

```bash
npx prisma migrate dev
```

### 4️⃣ Criar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
NODE_ENV="development"
JWT_SECRET="sua_chave_segura_aqui"
ALLOWED_REGISTER_MANY_API_KEYS=false
```

> 🔑 Crie um valor único e forte para `JWT_SECRET`.

### 5️⃣ Rodar o projeto

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em:
👉 `http://localhost:3000`

---

## 📡 API

A API do **DevRandom** está disponível no endpoint:

```
https://dev-random.vercel.app/api
```

Com ela, você pode gerar dados aleatórios diretamente no seu backend, sem precisar usar a interface web.

---

## ⭐ Sobre o Projeto

O **DevRandom** nasceu com a ideia de **facilitar a vida de desenvolvedores** durante testes, desenvolvimento de features e criação de protótipos.
Totalmente gratuito e com foco em **performance, usabilidade e segurança**, ele evoluirá constantemente com mais recursos e melhorias.
