# 🎓 Faculdade Avante — Plataforma de Gestão Acadêmica

Uma plataforma web desenvolvida para a **Faculdade Avante**, com o objetivo de apresentar a instituição, divulgar seus cursos e facilitar o processo de matrícula de novos alunos.

O sistema também oferece funcionalidades administrativas para gerenciamento de solicitações de matrícula, além de um sistema de chat que permite a comunicação entre interessados, alunos e a secretaria da instituição.

O projeto foi desenvolvido utilizando **React + Vite**, proporcionando uma aplicação moderna, dinâmica e responsiva.

> 🎓 **Projeto acadêmico desenvolvido por estudantes de Ciência da Computação da UNINASSAU, para a disciplina de Maturidade de Software.**

---

## 📖 Sobre o Projeto

A **Faculdade Avante** é uma plataforma acadêmica desenvolvida com o propósito de simular o ambiente digital de uma instituição de ensino superior.

O sistema permite que visitantes conheçam a faculdade, explorem os cursos oferecidos e consultem informações importantes, como horários, duração, semestres e disciplinas da grade curricular.

Além disso, a aplicação disponibiliza um formulário de matrícula, uma área administrativa para gerenciamento de solicitações e um sistema de chat para comunicação entre usuários e secretaria.

O projeto foi desenvolvido como parte de um **trabalho universitário da disciplina de Maturidade de Software**, no curso de **Ciência da Computação da UNINASSAU**, buscando aplicar conhecimentos de desenvolvimento web, organização de software e trabalho colaborativo.

---

## 🚀 Funcionalidades

### 🏠 Landing Page Institucional

A página inicial apresenta a Faculdade Avante e oferece aos visitantes informações sobre a instituição.

- Apresentação da faculdade.
- Informações sobre a história e a identidade institucional.
- Apresentação da estrutura da faculdade.
- Divulgação dos cursos disponíveis.
- Navegação intuitiva entre as seções.
- Acesso ao processo de matrícula.

### 📚 Catálogo de Cursos

Os visitantes podem explorar os cursos oferecidos pela instituição e consultar informações importantes antes de realizar a matrícula.

Cada curso apresenta informações como:

- Nome do curso.
- Descrição e informações gerais.
- Duração do curso.
- Quantidade de semestres.
- Horários disponíveis.
- Disciplinas que compõem a grade curricular.
- Informações relacionadas à formação acadêmica.

### 📝 Sistema de Matrículas

A plataforma disponibiliza um formulário para que novos alunos possam solicitar sua matrícula de maneira simples e prática.

**Fluxo de matrícula:**

1. O visitante acessa a plataforma.
2. Consulta os cursos disponíveis.
3. Escolhe o curso desejado.
4. Preenche o formulário com seus dados.
5. Clica no botão **"Me Matricular"**.
6. A solicitação é encaminhada ao sistema para gerenciamento administrativo.

### 👨‍💼 Painel Administrativo

O sistema conta com uma área administrativa destinada à gestão das solicitações de matrícula.

Por meio desse painel, os administradores podem:

- Visualizar solicitações de matrícula.
- Consultar informações dos candidatos.
- Acompanhar os interessados nos cursos.
- Gerenciar os registros de matrícula.
- Organizar as informações dos alunos.
- Facilitar o trabalho da secretaria acadêmica.

### 💬 Sistema de Chat

A plataforma possui um sistema de comunicação entre os usuários e a administração da faculdade.

**Funcionalidades:**

- Comunicação entre usuários e secretaria.
- Envio e recebimento de mensagens.
- Atendimento de dúvidas sobre cursos.
- Orientações relacionadas ao processo de matrícula.
- Interação entre interessados e administradores.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| React | Biblioteca JavaScript utilizada na construção das interfaces. |
| Vite | Ferramenta de desenvolvimento e build da aplicação. |
| JavaScript | Linguagem utilizada para implementar as funcionalidades. |
| HTML5 | Estruturação dos elementos da aplicação. |
| CSS3 | Estilização e apresentação visual. |
| React Router DOM | Gerenciamento de rotas e navegação. |
| Supabase | Serviço utilizado na infraestrutura de dados da aplicação. |
| ESLint | Ferramenta para análise e padronização do código. |
| Git e GitHub | Versionamento e hospedagem do código-fonte. |

---

## 💻 Como Executar o Projeto

Para executar o projeto localmente, siga as instruções abaixo.

### 📋 Pré-requisitos

Antes de começar, é necessário ter instalado:

- Node.js
- npm
- Git

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/PedroLuckas88/site-facul-maturidade.git
```

### 2️⃣ Acesse a pasta do projeto

```bash
cd site-facul-maturidade
```

### 3️⃣ Instale as dependências

```bash
npm install
```

Ou, de maneira abreviada:

```bash
npm i
```

### 4️⃣ Configure as variáveis de ambiente

O projeto possui um arquivo `.env.example`, que serve como referência para a configuração das variáveis de ambiente.

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias de acordo com o exemplo disponibilizado.

> **Importante:** algumas funcionalidades podem depender da configuração correta dos serviços externos utilizados pela aplicação.

### 5️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 6️⃣ Acesse a aplicação

Após iniciar o servidor, o terminal exibirá o endereço local da aplicação.

Normalmente, o Vite utiliza:

```text
http://localhost:5173
```

Abra esse endereço no navegador para visualizar o projeto.

---

## 👥 Perfis de Usuário

A plataforma foi desenvolvida considerando diferentes tipos de usuários.

| Perfil | Funcionalidades |
|---|---|
| Visitante | Visualizar a instituição, consultar cursos e solicitar matrícula. |
| Aluno / Interessado | Preencher o formulário de matrícula e entrar em contato com a secretaria. |
| Administrador / Secretaria | Gerenciar solicitações de matrícula, consultar informações e atender usuários pelo chat. |

---

## 🎯 Objetivo do Projeto

O principal objetivo da plataforma é **digitalizar e simplificar o processo de apresentação institucional e matrícula acadêmica**.

A aplicação busca oferecer uma experiência acessível aos interessados em ingressar na Faculdade Avante, permitindo que encontrem informações sobre os cursos e iniciem o processo de matrícula pela internet.

Além disso, o sistema oferece ferramentas que auxiliam a equipe administrativa na organização dos registros e no atendimento aos candidatos.

Do ponto de vista acadêmico, o desenvolvimento do projeto também teve como objetivos:

- Aplicar conceitos de engenharia e maturidade de software.
- Desenvolver uma aplicação web utilizando React e Vite.
- Trabalhar com organização e estruturação de código.
- Implementar funcionalidades baseadas em necessidades reais.
- Exercitar o desenvolvimento colaborativo em equipe.
- Utilizar ferramentas de versionamento de código.
- Integrar diferentes funcionalidades em uma única aplicação.

---

## 📌 Principais Recursos

✅ Landing page institucional.

✅ Apresentação da estrutura da faculdade.

✅ Catálogo de cursos disponíveis.

✅ Informações sobre horários, semestres e disciplinas.

✅ Formulário de solicitação de matrícula.

✅ Painel administrativo para gestão de alunos e solicitações.

✅ Sistema de chat entre usuários e secretaria.

✅ Navegação entre páginas com React Router.

✅ Interface desenvolvida com React e Vite.

---

## 🎓 Sobre o Projeto Acadêmico

O projeto **Faculdade Avante — Plataforma de Gestão Acadêmica** foi desenvolvido como parte de um trabalho universitário do curso de **Ciência da Computação**, na **UNINASSAU**, para a disciplina de **Maturidade de Software**.

O trabalho teve como objetivo aplicar, na prática, conhecimentos adquiridos durante a formação acadêmica, envolvendo desenvolvimento de aplicações web, organização de código, implementação de funcionalidades e boas práticas de engenharia de software.

A plataforma foi idealizada e desenvolvida em equipe, buscando simular um ambiente institucional real, com funcionalidades voltadas à apresentação de cursos, solicitação de matrículas, gerenciamento administrativo e comunicação entre usuários e secretaria.

### 👨‍💻 Equipe de Desenvolvimento

O projeto foi desenvolvido pelos universitários:

- **Caio Gabriel**
- **Pedro Luckas**
- **Victor Alves**
- **Caio Marcos**

### 🏫 Informações Acadêmicas

| Informação | Descrição |
|---|---|
| **Instituição** | Centro Universitário Maurício de Nassau — UNINASSAU |
| **Curso** | Ciência da Computação |
| **Disciplina** | Maturidade de Software |
| **Projeto** | Faculdade Avante — Plataforma de Gestão Acadêmica |
| **Tipo** | Trabalho acadêmico em equipe |
| **Ano** | 2026 |

---

## 📄 Considerações Finais

A **Faculdade Avante** é um projeto acadêmico desenvolvido com o propósito de colocar em prática os conhecimentos de desenvolvimento de software adquiridos durante a graduação.

A aplicação reúne funcionalidades de apresentação institucional, catálogo de cursos, solicitação de matrículas, gerenciamento administrativo e comunicação entre usuários e secretaria.

O desenvolvimento do projeto proporcionou à equipe experiência prática na construção de uma aplicação web, no trabalho colaborativo e na utilização de tecnologias como **React e Vite**.

---

**🎓 Desenvolvido por Caio Gabriel, Pedro Luckas, Victor Alves e Caio Marcos — UNINASSAU | Maturidade de Software | 2026.**
