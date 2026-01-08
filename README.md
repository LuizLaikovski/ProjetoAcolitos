# Projeto Acólitos

Este repositório contém o código-fonte de uma aplicação para gerenciamento de acólitos, desenvolvida com um backend em Node.js (Express.js) e um frontend em React (Vite, TypeScript, TailwindCSS). O sistema permite o cadastro, consulta, atualização e exclusão de acólitos, além de funcionalidades de busca e autenticação de usuários.

## Sobre

O Projeto Acólitos é uma ferramenta desenvolvida para auxiliar na organização e gestão de grupos de acólitos. Ele oferece uma interface intuitiva para gerenciar informações de acólitos, como dados pessoais, disponibilidade para missas, comunidades e se são cerimonialistas. A aplicação é dividida em duas partes principais: um **backend robusto** que expõe uma API RESTful e um **frontend dinâmico** que consome essa API para fornecer uma experiência de usuário rica.

### Tecnologias Utilizadas

**Backend (API):**
- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework web para Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT (JSON Web Tokens)**: Para autenticação e autorização.
- **Bcrypt.js**: Para hash de senhas.
- **CORS**: Para permitir requisições de diferentes origens.
- **Nodemon**: Para desenvolvimento, reinicia o servidor automaticamente.

**Frontend:**
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápido para projetos web.
- **TailwindCSS**: Framework CSS utilitário para estilização rápida.
- **React Router DOM**: Para roteamento no lado do cliente.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **React Query**: Para gerenciamento de estado assíncrono e cache de dados.

## Como Usar

Para configurar e executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- Node.js (versão 18 ou superior recomendada)
- npm ou pnpm (gerenciador de pacotes)
- MySQL (servidor de banco de dados)

### Configuração do Backend (API)

1.  **Navegue até o diretório `api`:**
    ```bash
    cd projeto_acolitos/api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Crie um arquivo `.env`** na raiz do diretório `api` com as seguintes variáveis de ambiente:
    ```
    SECRET_KEY=sua_chave_secreta_jwt
    HOST=localhost
    USER=seu_usuario_mysql
    PASSWORD=sua_senha_mysql
    DATABASE=seu_banco_de_dados
    PORT=8800
    ```
    *Substitua os valores pelos dados do seu ambiente MySQL.*

4.  **Configure seu banco de dados MySQL** com as tabelas necessárias para o projeto. As queries para criação das tabelas e `views` podem ser encontradas na pasta `querys` ou deduzidas a partir do código nos `controllers`.

5.  **Inicie o servidor backend:**
    ```bash
    npm start
    # ou
    pnpm start
    ```
    O servidor estará rodando em `http://localhost:8800` (ou na porta especificada no `.env`).

### Configuração do Frontend

1.  **Navegue até o diretório `frontend`:**
    ```bash
    cd ../frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    pnpm install
    ```

3.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    # ou
    pnpm run dev
    ```
    A aplicação frontend estará disponível em `http://localhost:5173` (ou na porta indicada pelo Vite).

## Rotas da Aplicação

### Rotas do Backend (API)

Todas as rotas da API são prefixadas por `/`. As rotas que exigem autenticação utilizam um middleware `verificarToken`.

| Método | Rota                               | Descrição                                                                | Autenticação |
| :----- | :--------------------------------- | :----------------------------------------------------------------------- | :----------- |
| `POST` | `/login`                           | Autentica um usuário e retorna um token JWT.                             | Não          |
| `GET`  | `/`                                | Retorna todos os acólitos cadastrados.                                  | Sim          |
| `GET`  | `/search`                          | Busca acólitos por idade, sexo, missas, comunidades e cerimonialista.    | Sim          |
| `GET`  | `/:id`                             | Retorna um acólito específico pelo ID.                                  | Sim          |
| `GET`  | `/idade/:idadeMinima`              | Retorna acólitos com idade igual ou superior à idade mínima especificada. | Sim          |
| `GET`  | `/sexo/:sexo`                      | Retorna acólitos de um sexo específico.                                  | Sim          |
| `GET`  | `/acolitosDisponivelMissa/:idMissa`| Retorna acólitos disponíveis para uma missa específica.                  | Sim          |
| `GET`  | `/cerimonialistas`                 | Retorna todos os acólitos que são cerimonialistas.                      | Sim          |
| `DELETE`| `/delete/:id`                     | Exclui um acólito pelo ID.                                              | Sim          |
| `PUT`  | `/update/:id`                     | Atualiza informações de um acólito pelo ID.                              | Sim          |
| `POST` | `/newAcolito`                      | Cria um novo acólito.                                                    | Sim          |

### Rotas do Frontend

| Rota        | Componente           | Descrição                                         | Protegida |
| :---------- | :------------------- | :------------------------------------------------ | :-------- |
| `/`         | `LoginScreen`        | Página de login da aplicação.                     | Não       |
| `/home`     | `App`                | Página principal da aplicação, exibe a lista de acólitos e funcionalidades de edição. | Sim       |
| `/visitors` | `VisitorsPage`       | Página para visitantes, exibe a lista de acólitos sem funcionalidades de edição. | Sim       |
| `*`         | `ErrorPage`          | Página exibida para rotas não encontradas.        | Não       |

## Estrutura da Aplicação

O projeto é organizado em dois diretórios principais: `api` para o backend e `frontend` para o frontend, além de uma pasta `docs` para documentação.

```
projeto_acolitos/
├── api/                     # Backend da aplicação (Node.js, Express.js)
│   ├── controllers/         # Lógica de negócio e manipulação de dados
│   │   └── acolitos.js
│   ├── routes/              # Definição das rotas da API
│   │   └── acolitos.js
│   ├── db.js                # Configuração da conexão com o banco de dados
│   ├── querys/              # Queries SQL utilizadas
│   │   └── querys.js
│   ├── dto/                 # Data Transfer Objects e funções auxiliares
│   │   └── acolitosDTO.js
│   ├── package.json         # Dependências e scripts do backend
│   └── index.js             # Ponto de entrada do servidor backend
├── frontend/                # Frontend da aplicação (React, TypeScript, Vite)
│   ├── public/              # Arquivos estáticos (ícones, etc.)
│   ├── src/                 # Código fonte do frontend
│   │   ├── assets/          # Imagens e outros recursos
│   │   ├── components/      # Componentes React reutilizáveis
│   │   │   ├── css/         # Estilos específicos de componentes
│   │   │   └── ...
│   │   ├── data/            # Lógica de requisição e manipulação de dados para o frontend
│   │   ├── interfaces/      # Definições de interfaces TypeScript
│   │   ├── routes/          # Componentes de rota (páginas)
│   │   │   └── ...
│   │   ├── App.tsx          # Componente principal da aplicação
│   │   ├── main.tsx         # Ponto de entrada do React (configuração de rotas)
│   │   └── index.css        # Estilos globais
│   ├── package.json         # Dependências e scripts do frontend
│   └── vite.config.ts       # Configuração do Vite
├── docs/                    # Documentação do projeto
│   ├── ERS.docx             # Especificação de Requisitos de Software
│   └── MDL.mdj              # Modelo de Dados Lógicos (ferramenta StarUML)
└── README.md                # Este arquivo
```
