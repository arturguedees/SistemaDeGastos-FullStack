# 📚 README - Desenvolvimento do Projeto

Este documento reúne informações importantes sobre a estrutura, organização e funcionamento do projeto **Sistema de Controle de Gastos Residenciais**.

---

# 📌 Objetivo

Desenvolver uma aplicação Full Stack para gerenciamento financeiro residencial, permitindo:

* Cadastro de pessoas;
* Cadastro de receitas e despesas;
* Consulta de totais individuais;
* Consulta do saldo geral.

---

# 🏗 Arquitetura

O projeto foi dividido em duas aplicações independentes.

```text
Frontend (React + TypeScript)
            │
            │ HTTP (Axios)
            ▼
Backend (.NET Minimal API)
            │
            ▼
Entity Framework Core
            │
            ▼
SQLite
```

---

# 📂 Organização

## Backend

### Models

Representam as entidades do banco de dados.

* Pessoa
* Transacao

---

### Data

Contém o AppDbContext responsável pela comunicação com o SQLite utilizando Entity Framework Core.

---

### Services

Camada responsável pelas regras de negócio da aplicação.

Exemplos:

* Validação de menor de idade;
* Exclusão em cascata;
* Cálculo de saldo.

---

### Program.cs

Arquivo principal da API.

Responsável por:

* configuração do banco;
* criação dos endpoints;
* injeção de dependência;
* configuração do CORS.

---

# Frontend

## components

Componentes reutilizáveis.

Exemplo:

* Navbar
* Cards
* Botões
* Tabelas
* Inputs

---

## pages

Representam as páginas da aplicação.

* Home
* Pessoas
* Transações
* Resumo Financeiro

---

## services

Responsável pela comunicação com a API utilizando Axios.

---

## types

Interfaces TypeScript utilizadas durante o projeto.

---

# Fluxo da Aplicação

```text
Usuário

↓

React

↓

Axios

↓

API .NET

↓

Entity Framework

↓

SQLite
```

---

# Banco de Dados

O banco utilizado é SQLite.

Arquivo:

```
Backend/gastos.db
```

Caso ele não exista, será criado automaticamente.

---

# Regras de Negócio

## Cadastro de Pessoas

Cada pessoa possui:

* Id
* Nome
* Idade

---

## Cadastro de Transações

Cada transação possui:

* Id
* Descrição
* Valor
* Tipo
* PessoaId

---

## Menores de idade

Caso uma pessoa possua idade inferior a 18 anos, somente poderá cadastrar transações do tipo **Despesa**.

Receitas são bloqueadas pelo sistema.

---

## Exclusão

Ao excluir uma pessoa, todas as transações vinculadas também são removidas automaticamente.

---

# Saldo

Para cada pessoa é calculado:

```
Saldo = Receitas - Despesas
```

Ao final é exibido:

* Total de Receitas
* Total de Despesas
* Saldo Líquido Residencial

---

# Estrutura do Projeto

```text
DesafioControleGastos/

Backend/
│
├── Data/
├── Models/
├── Services/
├── Program.cs
└── gastos.db

Frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx

README.md
README-DEV.md
```

---

# Como Executar

### Backend

```bash
cd Backend

dotnet restore

dotnet run
```

---

### Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# Observações

* O banco de dados é persistente.
* O projeto utiliza arquitetura em camadas para facilitar manutenção.
* A API foi desenvolvida utilizando Minimal APIs do .NET.
* O frontend consome todos os endpoints através do Axios.

---

# Autor

Artur Rollemberg Camboim Guedes
Graduando em Sistemas de Informação
