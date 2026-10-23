# MindBoard

Frontend do MindBoard, uma aplicação para organizar ideias e colaborar em
quadros.

## Aplicação online

Aceda ao frontend publicado em [mindboard-frontend-rouge.vercel.app](https://mindboard-frontend-rouge.vercel.app/).

## Principais tecnologias

- **Next.js 15 (App Router)** — framework React utilizado para páginas,
  navegação e estrutura da aplicação.
- **React 19** — biblioteca para construção das interfaces e componentes.
- **TypeScript** — adiciona tipagem estática ao código JavaScript.
- **Tailwind CSS 4** — ferramenta utilitária para estilização da interface.
- **Flowbite React** — componentes de interface integrados com Tailwind CSS.
- **React Hook Form e Zod** — gestão de formulários e validação dos dados.
- **dnd-kit** — suporte a interações de arrastar e soltar, como a organização
  de itens nos quadros.
- **Socket.IO Client** — comunicação em tempo real com o backend.
- **Notistack** — apresentação de notificações na aplicação.
- **React Icons** — biblioteca de ícones.

## Requisitos

- Node.js e npm
- Backend do MindBoard em execução

## Configuração e execução

Instale as dependências:

```bash
npm install
```

Crie um ficheiro `.env.local` na raiz do projeto e defina o endereço da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Comandos disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run build` — cria a versão de produção.
- `npm run start` — inicia a versão de produção já compilada.
- `npm run format:check` — verifica a formatação dos ficheiros.
