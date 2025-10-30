# 📚 Apostila: Entendendo a Pasta Prisma

<div align="center">

![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

### 🎓 Material Didático - IFMS

### 📘 Curso Técnico em Informática

---

**versão 1.0** | **Outubro 2024** | **Português �🇷**

</div>

---

## �🎯 Objetivo desta Apostila

Esta apostila explica **de forma sucinta e objetiva** cada arquivo da pasta `prisma`. Aqui você aprenderá como funciona o **Prisma ORM**, que gerencia a conexão com o MongoDB e define a estrutura do banco de dados.

### 🎁 O que você vai aprender

| Módulo             | Tópicos                               | Duração  |
| ------------------ | ------------------------------------- | -------- |
| 📖 **Fundamentos** | O que é Prisma, ORM, Type-Safety      | 30 min   |
| 🚀 **Instalação**  | Setup, configuração, primeiro projeto | 45 min   |
| 🗂️ **Schema**      | Models, campos, relacionamentos       | 1h       |
| 🌱 **Seed**        | Popular dados, scripts, automação     | 45 min   |
| 🛠️ **Comandos**    | CLI, Studio, desenvolvimento          | 30 min   |
| 💪 **Prática**     | 5 exercícios progressivos             | 1h 30min |

**⏱️ Carga horária total:** 5 horas

### 🎯 Pré-requisitos

- ✅ Conhecimentos básicos de JavaScript/TypeScript
- ✅ Node.js instalado (versão 18+)
- ✅ MongoDB instalado ou acesso ao MongoDB Atlas
- ✅ VS Code ou editor de código
- ✅ Terminal/linha de comando

### 📊 Nível de Dificuldade

```
Iniciante    ████░░░░░░ 40%
Intermediário ██████░░░░ 60%
```

### 🏆 Competências Desenvolvidas

Ao final desta apostila, você será capaz de:

- ✨ Configurar Prisma ORM em projetos TypeScript
- ✨ Modelar banco de dados usando Prisma Schema
- ✨ Gerar código TypeScript type-safe automaticamente
- ✨ Realizar operações CRUD com MongoDB
- ✨ Popular banco de dados com dados iniciais
- ✨ Usar Prisma Studio para gerenciamento visual
- ✨ Aplicar boas práticas de desenvolvimento com ORM

---

## 📋 Sumário

1. [O que é Prisma?](#1-o-que-é-prisma)
2. [Como Usar o Prisma - Passo a Passo](#2-como-usar-o-prisma---passo-a-passo)
3. [Arquivo: schema.prisma](#3-arquivo-schemaprisma)
4. [Arquivo: seed.ts](#4-arquivo-seedts)
5. [Comandos Prisma Úteis](#5-comandos-prisma-úteis)
6. [Exercícios Práticos](#6-exercícios-práticos)

---

<div align="center">

## 🌟 PARTE I: FUNDAMENTOS

</div>

---

## 1. O que é Prisma?

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🎯 PRISMA ORM - Next-Generation Database Toolkit      ║
║                                                          ║
║   📝 Schema-First Development                           ║
║   🔒 Type-Safe Database Access                          ║
║   🚀 Auto-Generated Client                              ║
║   🌍 Multi-Database Support                             ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

</div>

### 1.1 Definição

**Prisma** é um ORM (Object-Relational Mapping) moderno que revoluciona a forma como interagimos com bancos de dados:

| Característica              | Descrição                             | Benefício                |
| --------------------------- | ------------------------------------- | ------------------------ |
| 🎨 **Schema-First**         | Define estrutura em arquivo `.prisma` | Código como documentação |
| 🔒 **Type-Safe**            | TypeScript end-to-end                 | Zero erros de runtime    |
| ⚡ **Auto-Generated**       | Client gerado automaticamente         | Produtividade máxima     |
| 🌐 **Multi-DB**             | PostgreSQL, MySQL, MongoDB, SQLite    | Flexibilidade total      |
| 🔄 **Migrations**           | Versionamento de schema               | Deploy confiável         |
| 🎯 **Developer Experience** | IntelliSense completo                 | Desenvolvimento ágil     |

### 💡 Por que Prisma?

<table>
<tr>
<td width="50%">

#### ❌ Sem Prisma (SQL Puro)

```typescript
// Sem type-safety
const user = await db.query('SELECT * FROM users WHERE id = ?', [userId])

// Erros só em runtime
console.log(user.nmae) // Typo!
// undefined (erro silencioso)
```

</td>
<td width="50%">

#### ✅ Com Prisma

```typescript
// Com type-safety total
const user = await prisma.user.findUnique({
  where: { id: userId },
})

// Erro em tempo de compilação
console.log(user.nmae) // ❌ Erro!
// Property 'nmae' does not exist
```

</td>
</tr>
</table>

### 1.2 Componentes do Prisma

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    🏗️ ARQUITETURA PRISMA                    │
└─────────────────────────────────────────────────────────────┘

  📄 schema.prisma              ← Define estrutura de dados
       ↓
  🔧 npx prisma generate        ← Gera código TypeScript
       ↓
  📦 @prisma/client             ← Client type-safe gerado
       ↓
  💻 Seu código TypeScript      ← Use o client nas funções
       ↓
  🗄️ MongoDB/PostgreSQL/MySQL    ← Dados persistidos
```

</div>

| Componente           | Arquivo                 | Função                           | Quando usar                       |
| -------------------- | ----------------------- | -------------------------------- | --------------------------------- |
| 🎨 **Prisma Schema** | `schema.prisma`         | Define estrutura do banco        | Sempre que criar/modificar models |
| 📦 **Prisma Client** | Gerado automaticamente  | Client type-safe para queries    | Em todo código que acessa DB      |
| 🎯 **Prisma Studio** | Interface web (`:5555`) | Visualizar/editar dados (GUI)    | Durante desenvolvimento           |
| 🌱 **Seed**          | `seed.ts`               | Popular banco com dados iniciais | Primeiro setup ou reset           |
| ⚙️ **Prisma CLI**    | `npx prisma`            | Comandos de gerenciamento        | Generate, push, migrate, studio   |

### 1.3 Fluxo de Trabalho com Prisma

<div align="center">

### 🔄 Ciclo de Desenvolvimento Prisma

```mermaid
graph LR
    A[📝 Editar Schema] --> B[🔧 Generate]
    B --> C[🚀 Push DB]
    C --> D[🌱 Seed]
    D --> E[💻 Desenvolver]
    E --> F{Mudar Schema?}
    F -->|Sim| A
    F -->|Não| E
```

</div>

| Etapa                 | Comando                   | O que faz                         | Frequência                     |
| --------------------- | ------------------------- | --------------------------------- | ------------------------------ |
| 1️⃣ **Definir Schema** | Editar `schema.prisma`    | Definir models (tabelas/coleções) | 🔄 Sempre que mudar estrutura  |
| 2️⃣ **Gerar Client**   | `npx prisma generate`     | Criar Prisma Client tipado        | 🔄 Após cada mudança no schema |
| 3️⃣ **Sincronizar DB** | `npx prisma db push`      | Aplicar schema no MongoDB         | 🔄 Após generate               |
| 4️⃣ **Popular DB**     | `npx prisma db seed`      | Executar seed.ts                  | 🔁 Primeira vez ou reset       |
| 5️⃣ **Usar no Código** | `import { PrismaClient }` | Acessar banco com type-safety     | ✅ Sempre no código            |
| 6️⃣ **Visualizar**     | `npx prisma studio`       | Interface visual de dados         | 🔍 Durante desenvolvimento     |

### 📈 Produtividade em Números

<div align="center">

| Métrica                  | Sem Prisma        | Com Prisma           | Ganho                |
| ------------------------ | ----------------- | -------------------- | -------------------- |
| ⏱️ **Tempo de Setup**    | ~4 horas          | ~30 minutos          | **87% mais rápido**  |
| 🐛 **Bugs de Tipo**      | 15-20 por mês     | 0-2 por mês          | **90% redução**      |
| 📝 **Linhas de Código**  | 1000 linhas       | 300 linhas           | **70% menos código** |
| 🚀 **Velocidade Deploy** | Manual, arriscado | Automatizado, seguro | **100% confiável**   |

</div>

### 1.4 Por que usar Prisma?

<div align="center">

### 🌟 Benefícios que Transformam o Desenvolvimento

</div>

<table>
<tr>
<td width="33%">

#### 🔒 Type-Safety

```typescript
// ✅ Erro detectado
// ANTES de executar
const user = await prisma.user.findUnique({
  where: { edad: 18 },
  //      ^^^^
  // ❌ Erro: 'edad' não existe
})
```

**Benefício:** Zero bugs de typo

</td>
<td width="33%">

#### 💡 Autocomplete

```typescript
// IntelliSense completo
prisma.user.
//          ↓
//          • findUnique()
//          • findMany()
//          • create()
//          • update()
//          • delete()
```

**Benefício:** Produtividade 10x

</td>
<td width="33%">

#### 🔄 Migrations

```bash
# Versionamento automático
npx prisma migrate dev

# Histórico completo
001_init
002_add_users
003_add_posts
```

**Benefício:** Deploy seguro

</td>
</tr>
</table>

### 🎯 Prisma vs Alternativas

| Recurso               |    Prisma    |   TypeORM    |  Sequelize   |    Mongoose    |
| --------------------- | :----------: | :----------: | :----------: | :------------: |
| 🔒 **Type-Safety**    | ✅ Completo  |  ⚠️ Parcial  | ❌ Limitado  | ⚠️ Com schemas |
| 💡 **Autocomplete**   |   ✅ 100%    |    ⚠️ 60%    |    ❌ 30%    |     ⚠️ 50%     |
| 🚀 **Performance**    | ✅ Otimizado |    ⚠️ Bom    |   ⚠️ Médio   |     ✅ Bom     |
| 📚 **Documentação**   | ✅ Excelente |    ⚠️ Boa    |  ⚠️ Regular  |     ✅ Boa     |
| 🌐 **Multi-DB**       | ✅ 6+ bancos | ✅ 7+ bancos | ✅ 6+ bancos | ❌ Só MongoDB  |
| 🎯 **Dev Experience** | ✅ Superior  |    ⚠️ Bom    |  ❌ Regular  |     ⚠️ Bom     |
| 📊 **Adoção**         | 🔥 Crescendo |  ⭐ Popular  |  ⭐ Popular  |   ⭐ Popular   |

### 💼 Casos de Uso Ideais

| Cenário                      | Prisma é ideal? | Por quê?                             |
| ---------------------------- | :-------------: | ------------------------------------ |
| 🎓 **Projetos Educacionais** |   ⭐⭐⭐⭐⭐    | Sintaxe clara, fácil de aprender     |
| 🚀 **Startups/MVPs**         |   ⭐⭐⭐⭐⭐    | Setup rápido, produtividade alta     |
| 🏢 **Aplicações Enterprise** |   ⭐⭐⭐⭐⭐    | Type-safety, migrations confiáveis   |
| 📱 **APIs REST/GraphQL**     |   ⭐⭐⭐⭐⭐    | Perfeito para backends modernos      |
| 🎮 **Apps Real-time**        |    ⭐⭐⭐⭐     | Bom, mas considere WebSockets extras |
| 📊 **Big Data/Analytics**    |     ⭐⭐⭐      | Bom, mas otimize queries complexas   |

---

<div align="center">

### 🎬 Pronto para Começar?

**Vamos do zero ao primeiro projeto Prisma em 13 passos!**

</div>

---

<div align="center">

## 🚀 PARTE II: TUTORIAL PRÁTICO

### Do Zero ao Primeiro CRUD com Prisma

</div>

---

## 2. Como Usar o Prisma - Passo a Passo

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║          🎯 13 PASSOS PARA DOMINAR PRISMA               ║
║                                                          ║
║   Do setup inicial até operações CRUD completas         ║
║   ⏱️ Tempo estimado: 45 minutos                         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

</div>

### 📋 Roadmap do Tutorial

| Fase          | Passos | O que você vai fazer         | Status |
| ------------- | ------ | ---------------------------- | ------ |
| 🏗️ **Setup**  | 1-4    | Instalar e configurar Prisma | ⬜     |
| 📝 **Schema** | 5-7    | Definir models e sincronizar | ⬜     |
| 💻 **Código** | 8-9    | Implementar CRUD operations  | ⬜     |
| 🌱 **Dados**  | 10-12  | Popular banco e visualizar   | ⬜     |
| 🎯 **Deploy** | 13     | Preparar para produção       | ⬜     |

---

### 2.1 Instalação Inicial

<div align="center">

#### 🎬 Fase 1: Preparando o Ambiente

</div>

#### **Passo 1: Criar Projeto Node.js**

```bash
# Criar pasta do projeto
mkdir meu-projeto
cd meu-projeto

# Inicializar projeto Node.js
npm init -y
```

#### **Passo 2: Instalar Dependências**

```bash
# Instalar Prisma CLI como dependência de desenvolvimento
npm install -D prisma

# Instalar Prisma Client para usar no código
npm install @prisma/client

# Instalar TypeScript e ts-node (se for projeto TypeScript)
npm install -D typescript ts-node @types/node
```

**O que cada pacote faz:**

| Pacote           | Tipo | Propósito                                  |
| ---------------- | ---- | ------------------------------------------ |
| `prisma`         | Dev  | CLI para comandos (generate, push, studio) |
| `@prisma/client` | Prod | Biblioteca para acessar banco no código    |
| `typescript`     | Dev  | Compilador TypeScript                      |
| `ts-node`        | Dev  | Executar TypeScript diretamente            |

---

### 2.2 Configuração do Prisma

#### **Passo 3: Inicializar Prisma**

```bash
npx prisma init
```

**O que este comando cria:**

```
meu-projeto/
├── prisma/
│   └── schema.prisma    ← Arquivo de configuração
├── .env                 ← Variáveis de ambiente
└── package.json
```

**Conteúdo do `.env` criado:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

#### **Passo 4: Configurar MongoDB**

Editar `.env` para usar MongoDB:

```env
# Conexão local
DATABASE_URL="mongodb://localhost:27017/meu-banco"

# OU conexão MongoDB Atlas (nuvem)
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/meu-banco"
```

---

### 2.3 Definir o Schema

#### **Passo 5: Editar schema.prisma**

Abrir `prisma/schema.prisma` e configurar:

```prisma
// Configuração do gerador
generator client {
  provider = "prisma-client-js"
}

// Configuração do banco de dados
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// Definir seus models
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

**Dicas:**

- Um model = uma coleção no MongoDB
- Use `@unique` para campos únicos
- Use `@default(now())` para timestamps automáticos
- Use `@@map("nome")` para definir nome da coleção

---

### 2.4 Gerar Prisma Client

#### **Passo 6: Gerar o Client**

```bash
npx prisma generate
```

**O que acontece:**

1. Prisma lê o `schema.prisma`
2. Gera código TypeScript em `node_modules/@prisma/client`
3. Cria tipos baseados nos seus models
4. Disponibiliza autocomplete no VS Code

**Quando executar este comando:**

- Toda vez que modificar o `schema.prisma`
- Adicionar/remover campos
- Criar novos models
- Alterar tipos de dados

---

### 2.5 Sincronizar com o Banco

#### **Passo 7: Aplicar Schema no MongoDB**

```bash
npx prisma db push
```

**O que este comando faz:**

| Ação                  | Descrição                    |
| --------------------- | ---------------------------- |
| 1️⃣ Conecta ao MongoDB | Usa URL do `.env`            |
| 2️⃣ Cria coleções      | Baseado nos models do schema |
| 3️⃣ Cria índices       | Para campos `@unique`        |
| 4️⃣ Atualiza estrutura | Adiciona/remove campos       |

**⚠️ Atenção:**

- `db push` NÃO cria migrations
- Ideal para desenvolvimento
- Em produção, use `prisma migrate`

---

### 2.6 Usar Prisma no Código

#### **Passo 8: Criar arquivo para usar o Prisma**

Criar arquivo `src/database.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

// Criar instância do Prisma Client
export const prisma = new PrismaClient()

// Função para conectar
export async function connect() {
  try {
    await prisma.$connect()
    console.log('✅ Conectado ao MongoDB!')
  } catch (error) {
    console.error('❌ Erro ao conectar:', error)
    process.exit(1)
  }
}

// Função para desconectar
export async function disconnect() {
  await prisma.$disconnect()
  console.log('✅ Desconectado do MongoDB!')
}
```

#### **Passo 9: Usar Prisma nas suas funções**

Criar arquivo `src/index.ts`:

```typescript
import { prisma, connect, disconnect } from './database'

async function main() {
  // Conectar ao banco
  await connect()

  // CRIAR registro
  const newUser = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@email.com',
    },
  })
  console.log('Usuário criado:', newUser)

  // BUSCAR todos os registros
  const users = await prisma.user.findMany()
  console.log('Todos os usuários:', users)

  // BUSCAR por ID
  const user = await prisma.user.findUnique({
    where: { id: newUser.id },
  })
  console.log('Usuário encontrado:', user)

  // ATUALIZAR registro
  const updated = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: 'João Pedro Silva' },
  })
  console.log('Usuário atualizado:', updated)

  // DELETAR registro
  await prisma.user.delete({
    where: { id: newUser.id },
  })
  console.log('Usuário deletado!')

  // Desconectar
  await disconnect()
}

main()
```

---

### 2.7 Popular Banco com Dados (Seed)

#### **Passo 10: Criar arquivo seed**

Criar arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Criar usuários de exemplo
  const user1 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@email.com',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
    },
  })

  console.log('✅ Seed concluído!')
  console.log('Criados:', user1.name, 'e', user2.name)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

#### **Passo 11: Configurar seed no package.json**

Adicionar no `package.json`:

```json
{
  "name": "meu-projeto",
  "scripts": {
    "seed": "ts-node prisma/seed.ts"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

#### **Passo 12: Executar seed**

```bash
npx prisma db seed
```

---

### 2.8 Visualizar Dados (Prisma Studio)

#### **Passo 13: Abrir Prisma Studio**

```bash
npx prisma studio
```

**O que acontece:**

1. Abre navegador em `http://localhost:5555`
2. Interface visual para ver/editar dados
3. Funciona como um "phpMyAdmin" para Prisma

**Funcionalidades:**

- ✅ Ver todos os registros de cada model
- ✅ Adicionar novos registros
- ✅ Editar registros existentes
- ✅ Deletar registros
- ✅ Filtrar e buscar

---

### 2.9 Fluxo Completo de Desenvolvimento

**Resumo dos passos em ordem:**

```bash
# 1. Instalar dependências
npm install -D prisma typescript ts-node @types/node
npm install @prisma/client

# 2. Inicializar Prisma
npx prisma init

# 3. Configurar .env
# Editar DATABASE_URL no arquivo .env

# 4. Definir models
# Editar prisma/schema.prisma

# 5. Gerar Client
npx prisma generate

# 6. Sincronizar com banco
npx prisma db push

# 7. (Opcional) Popular dados
npx prisma db seed

# 8. (Opcional) Visualizar dados
npx prisma studio
```

---

### 2.10 Diagrama do Fluxo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Instalar Prisma                             ****             │
│    npm install prisma @prisma/client                        │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Inicializar                                              │
│    npx prisma init                                          │
│    Cria: prisma/schema.prisma e .env                        │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Configurar DATABASE_URL no .env                          │
│    DATABASE_URL="mongodb://..."                             │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Definir Models no schema.prisma                          │
│    model User { ... }                                       │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Gerar Prisma Client                                      │
│    npx prisma generate                                      │
│    Cria código TypeScript em node_modules/@prisma/client    │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Aplicar no Banco                                         │
│    npx prisma db push                                       │
│    Cria coleções e índices no MongoDB                       │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Usar no Código                                           │
│    import { PrismaClient } from '@prisma/client'            │
│    const prisma = new PrismaClient()                        │
│    await prisma.user.create({ ... })                        │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.11 Comandos Quick Reference

| Comando               | Quando usar                  |
| --------------------- | ---------------------------- |
| `npx prisma init`     | Iniciar novo projeto Prisma  |
| `npx prisma generate` | Após modificar schema.prisma |
| `npx prisma db push`  | Aplicar mudanças no banco    |
| `npx prisma db seed`  | Popular banco com dados      |
| `npx prisma studio`   | Ver/editar dados visualmente |
| `npx prisma format`   | Formatar schema.prisma       |
| `npx prisma validate` | Validar sintaxe do schema    |

---

### 2.12 Troubleshooting Comum

#### **Erro: "Environment variable not found: DATABASE_URL"**

**Solução:**

1. Verificar se arquivo `.env` existe na raiz do projeto
2. Verificar se há `DATABASE_URL="..."` no `.env`
3. Reiniciar terminal/editor

#### **Erro: "Cannot find module '@prisma/client'"**

**Solução:**

```bash
npm install @prisma/client
npx prisma generate
```

#### **Erro: "MongoServerError: E11000 duplicate key error"**

**Causa:** Tentou inserir valor duplicado em campo `@unique`

**Solução:**

- Verificar se email/registration já existe antes de criar
- Usar `findFirst()` ou `findUnique()` para checar

#### **Schema mudou mas código não reconhece**

**Solução:**

```bash
npx prisma generate
```

---

<div align="center">

## 📖 PARTE III: ANATOMIA DO SCHEMA

### Desvendando o schema.prisma

</div>

---

## 3. Arquivo: schema.prisma

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║          📄 SCHEMA.PRISMA - CORAÇÃO DO PRISMA           ║
║                                                          ║
║   O arquivo que define toda a estrutura do seu banco    ║
║   Schema-first approach: Code as Documentation          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

</div>

**Propósito:** Define a estrutura do banco de dados (models, campos, relacionamentos).

### 🎯 O que é o schema.prisma?

<table>
<tr>
<td width="50%">

#### Conceito

O `schema.prisma` é o **arquivo fonte da verdade** do seu banco de dados:

- 📝 Linguagem declarativa própria
- 🎨 Sintaxe limpa e legível
- 🔄 Gera código TypeScript automaticamente
- 📚 Serve como documentação viva
- 🔒 Garante consistência de dados

</td>
<td width="50%">

#### Analogia

Pense no schema.prisma como a **planta arquitetônica** de um edifício:

```
┌─────────────────────────┐
│  🏗️ PLANTA (Schema)     │
│  ↓                      │
│  🏢 EDIFÍCIO (Database) │
│  ↓                      │
│  🚪 ACESSO (Client)     │
└─────────────────────────┘
```

Sem a planta, não há construção!

</td>
</tr>
</table>

### 3.1 Código Completo (45 linhas)

```prisma
// ========================================
// CONFIGURAÇÃO DO PRISMA PARA MONGODB
// ========================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// ========================================
// MODELO DE ESTUDANTE
// ========================================

model Student {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  email        String   @unique
  registration String   @unique
  course       String
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("students")
}

// ========================================
// MODELO DE PROFESSOR
// ========================================

model Teacher {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  subject   String   // Disciplina que leciona
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("teachers")
}
```

---

### 3.2 Seção: Configuração

#### **Linhas 5-7: Generator Client**

```prisma
generator client {
  provider = "prisma-client-js"
}
```

**O que faz:**

| Elemento                        | Explicação                            |
| ------------------------------- | ------------------------------------- |
| `generator client`              | Bloco que define como gerar código    |
| `provider = "prisma-client-js"` | Gera cliente em JavaScript/TypeScript |

**Quando é usado:**

- Comando `npx prisma generate` lê esta configuração
- Gera pasta `node_modules/@prisma/client` com código tipado

**Alternativas:**

- `prisma-client-py` → Cliente Python
- `prisma-client-go` → Cliente Go

---

#### **Linhas 9-12: Datasource**

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

**O que faz:**

| Linha                       | Explicação                                    |
| --------------------------- | --------------------------------------------- |
| `datasource db`             | Define conexão com banco de dados             |
| `provider = "mongodb"`      | Tipo de banco (MongoDB)                       |
| `url = env("DATABASE_URL")` | URL de conexão (lida de variável de ambiente) |

**Variável de Ambiente:**

```bash
# No arquivo .env
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

**Outros providers:**

- `postgresql` → PostgreSQL
- `mysql` → MySQL/MariaDB
- `sqlite` → SQLite
- `sqlserver` → SQL Server

---

### 3.3 Model: Student

#### **Linha 18: Declaração do Model**

```prisma
model Student {
```

**O que faz:**

- Define model `Student` (equivale a uma coleção no MongoDB)
- Nome em PascalCase (singular)
- Prisma cria collection `students` (plural, minúscula) automaticamente

---

#### **Linha 19: Campo id**

```prisma
id String @id @default(auto()) @map("_id") @db.ObjectId
```

**Explicação detalhada:**

| Parte              | O que faz                                    |
| ------------------ | -------------------------------------------- |
| `id`               | Nome do campo no TypeScript                  |
| `String`           | Tipo no TypeScript                           |
| `@id`              | Marca como chave primária                    |
| `@default(auto())` | Gera automaticamente (MongoDB cria ObjectId) |
| `@map("_id")`      | No MongoDB, o campo se chama `_id`           |
| `@db.ObjectId`     | Tipo nativo do MongoDB (ObjectId)            |

**Por que `@map("_id")`?**

- MongoDB usa `_id` como padrão para chave primária
- No código TypeScript, usamos `id` (mais limpo)
- Prisma faz a conversão automaticamente

**Exemplo de uso:**

```typescript
const student = await prisma.student.findUnique({
  where: { id: '507f1f77bcf86cd799439011' }, // Usa 'id' no TS
})
// MongoDB busca por { _id: ObjectId("507f...") }
```

---

#### **Linhas 20-23: Campos Básicos**

```prisma
name         String
email        String   @unique
registration String   @unique
course       String
```

**Explicação:**

| Campo          | Tipo     | Atributos | Significado                     |
| -------------- | -------- | --------- | ------------------------------- |
| `name`         | `String` | -         | Nome do estudante               |
| `email`        | `String` | `@unique` | Email único (índice no MongoDB) |
| `registration` | `String` | `@unique` | Matrícula única                 |
| `course`       | `String` | -         | Curso matriculado               |

**Atributo `@unique`:**

- Cria índice único no MongoDB
- Garante que não existem valores duplicados
- Se tentar inserir email duplicado → Erro

**Exemplo de erro:**

```typescript
// Primeiro estudante
await prisma.student.create({
  data: { email: "joao@email.com", ... }
}) // ✅ OK

// Segundo estudante com mesmo email
await prisma.student.create({
  data: { email: "joao@email.com", ... }
}) // ❌ Erro: Unique constraint failed on email
```

---

#### **Linhas 24-26: Campos com Defaults**

```prisma
isActive  Boolean  @default(true)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

**Explicação:**

| Campo       | Tipo       | Atributo          | O que faz                               |
| ----------- | ---------- | ----------------- | --------------------------------------- |
| `isActive`  | `Boolean`  | `@default(true)`  | Se não fornecido, usa `true`            |
| `createdAt` | `DateTime` | `@default(now())` | Data/hora atual na criação              |
| `updatedAt` | `DateTime` | `@updatedAt`      | Atualiza automaticamente em cada update |

**Atributo `@updatedAt`:**

- Campo especial do Prisma
- Atualizado automaticamente toda vez que o registro é modificado
- Não precisa passar valor manualmente

**Exemplo de uso:**

```typescript
// Criar estudante (não precisa passar isActive, createdAt, updatedAt)
const student = await prisma.student.create({
  data: {
    name: 'João',
    email: 'joao@email.com',
    registration: '2024001',
    course: 'ADS',
    // isActive = true (automático)
    // createdAt = now() (automático)
    // updatedAt = now() (automático)
  },
})

// Atualizar estudante (updatedAt muda automaticamente)
await prisma.student.update({
  where: { id: student.id },
  data: { course: 'Informática' },
  // updatedAt é atualizado automaticamente!
})
```

---

#### **Linha 28: Mapeamento de Coleção**

```prisma
@@map("students")
```

**O que faz:**

- `@@map()` → Atributo de nível de model (duas @@)
- Define nome da coleção no MongoDB: `students`
- Sem `@@map`, cria coleção com nome do model: `Student`

**Convenção:**

- Model: Singular, PascalCase (`Student`)
- Collection: Plural, minúscula (`students`)

---

### 3.4 Model: Teacher

```prisma
model Teacher {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  subject   String   // Disciplina que leciona
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("teachers")
}
```

**Diferenças de Student:**

| Aspecto         | Student                     | Teacher            |
| --------------- | --------------------------- | ------------------ |
| Campos únicos   | `registration`, `course`    | `subject`          |
| Validação       | Email + registration únicos | Apenas email único |
| Collection      | `students`                  | `teachers`         |
| Estrutura geral | Idêntica                    | Idêntica           |

---

### 3.5 Tipos de Dados no Prisma

#### **Tipos Básicos**

| Prisma     | TypeScript | MongoDB   | Exemplo                |
| ---------- | ---------- | --------- | ---------------------- |
| `String`   | `string`   | `String`  | `"João Silva"`         |
| `Int`      | `number`   | `Int32`   | `42`                   |
| `Float`    | `number`   | `Double`  | `3.14`                 |
| `Boolean`  | `boolean`  | `Boolean` | `true`                 |
| `DateTime` | `Date`     | `ISODate` | `2024-10-23T10:00:00Z` |
| `Json`     | `any`      | `Object`  | `{ "key": "value" }`   |

#### **Tipos Especiais MongoDB**

| Prisma         | MongoDB  | Uso            |
| -------------- | -------- | -------------- |
| `@db.ObjectId` | ObjectId | IDs únicos     |
| `Bytes`        | BinData  | Dados binários |

---

### 3.6 Atributos de Campo

| Atributo          | Nível | O que faz                | Exemplo                           |
| ----------------- | ----- | ------------------------ | --------------------------------- |
| `@id`             | Campo | Chave primária           | `id String @id`                   |
| `@unique`         | Campo | Valor único (índice)     | `email String @unique`            |
| `@default(...)`   | Campo | Valor padrão             | `isActive Boolean @default(true)` |
| `@updatedAt`      | Campo | Atualiza automaticamente | `updatedAt DateTime @updatedAt`   |
| `@map("...")`     | Campo | Nome no banco diferente  | `id @map("_id")`                  |
| `@@map("...")`    | Model | Nome da coleção/tabela   | `@@map("students")`               |
| `@@index([...])`  | Model | Criar índice composto    | `@@index([email, name])`          |
| `@@unique([...])` | Model | Restrição única composta | `@@unique([field1, field2])`      |

---

### 3.7 Resumo: schema.prisma

**Estrutura do arquivo:**

| Seção             | Linhas | Conteúdo                           |
| ----------------- | ------ | ---------------------------------- |
| **Generator**     | 5-7    | Configura geração do Prisma Client |
| **Datasource**    | 9-12   | Configura conexão com MongoDB      |
| **Model Student** | 18-28  | Define estrutura de estudantes     |
| **Model Teacher** | 34-44  | Define estrutura de professores    |

**Campos gerados automaticamente:**

- `id` → ObjectId único
- `createdAt` → Data de criação
- `updatedAt` → Data da última modificação

---

<div align="center">

## 🌱 PARTE IV: POPULANDO O BANCO

### Seed - Plantando os Dados Iniciais

</div>

---

## 4. Arquivo: seed.ts

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║             🌱 SEED.TS - PLANTANDO DADOS                ║
║                                                          ║
║   Automatize a criação de dados iniciais               ║
║   Perfeito para desenvolvimento e demonstrações         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

</div>

**Propósito:** Popular banco de dados com dados iniciais (seed = semente, popular).

### 🎯 Por que usar Seed?

<table>
<tr>
<td width="33%">

#### 🚀 **Desenvolvimento**

```typescript
// Dados de teste sempre
// disponíveis

✅ 4 estudantes
✅ 5 professores
✅ 3 cursos
✅ 10 matrículas
```

**Ganho:** Setup instantâneo

</td>
<td width="33%">

#### 🎭 **Demonstrações**

```typescript
// Apresentar sistema
// com dados realistas

✅ Interface populada
✅ Casos de uso claros
✅ Fluxos completos
✅ Impressão profissional
```

**Ganho:** Credibilidade

</td>
<td width="33%">

#### 🧪 **Testes**

```typescript
// Ambiente consistente
// para testes

✅ Dados previsíveis
✅ Reset rápido
✅ CI/CD friendly
✅ Testes confiáveis
```

**Ganho:** Qualidade

</td>
</tr>
</table>

### 4.1 Estrutura (165 linhas)

| Seção            | Linhas  | Conteúdo                         |
| ---------------- | ------- | -------------------------------- |
| Imports e Setup  | 1-3     | Importar Prisma, criar instância |
| Função main()    | 5-155   | Lógica principal do seed         |
| Seed Estudantes  | 12-75   | Popular 4 estudantes             |
| Seed Professores | 80-145  | Popular 5 professores            |
| Resumo           | 150-154 | Estatísticas do seed             |
| Execução         | 157-165 | Executar main() e tratar erros   |

---

### 4.2 Setup Inicial

#### **Linhas 1-3: Imports**

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

**O que faz:**

| Linha                               | Explicação                        |
| ----------------------------------- | --------------------------------- |
| `import { PrismaClient }`           | Importa classe gerada pelo Prisma |
| `const prisma = new PrismaClient()` | Cria instância do cliente         |

**Diferença do database.service.ts:**

- **database.service**: Usa Singleton (1 instância compartilhada)
- **seed.ts**: Cria nova instância (script executado 1 vez)

---

### 4.3 Função main()

#### **Linhas 5-8: Início da Função**

```typescript
async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')
  console.log('')
```

**O que faz:**

- Declara função assíncrona `main()`
- Imprime mensagem inicial
- `console.log('')` → Linha em branco para organização

---

### 4.4 Seed de Estudantes

#### **Linhas 14-43: Array de Dados**

```typescript
const estudantes = [
  {
    name: 'João Silva',
    email: 'joao.silva@estudante.com',
    registration: '2024001',
    course: 'ADS',
    isActive: true,
  },
  // ... mais 3 estudantes
]
```

**Estrutura:**

- Array de objetos com dados dos estudantes
- Cada objeto tem os campos definidos no `schema.prisma`
- Não inclui `id`, `createdAt`, `updatedAt` (gerados automaticamente)

---

#### **Linhas 45-46: Contadores**

```typescript
let criados = 0
let jaExistentes = 0
```

**O que faz:**

- Variáveis para contar quantos registros foram criados vs já existentes
- Usado no resumo final

---

#### **Linhas 48-67: Loop de Inserção**

```typescript
for (const dados of estudantes) {
  try {
    const existente = await prisma.student.findFirst({
      where: {
        OR: [{ email: dados.email }, { registration: dados.registration }],
      },
    })

    if (existente) {
      console.log(`⚠️  Já existe: ${dados.name} - ${dados.registration}`)
      jaExistentes++
    } else {
      await prisma.student.create({
        data: dados,
      })
      console.log(`✅ Criado: ${dados.name} - ${dados.registration}`)
      criados++
    }
  } catch (erro: any) {
    console.error(`❌ Erro ao processar ${dados.name}:`, erro.message)
  }
}
```

**Fluxo detalhado:**

| Passo | Código                              | O que faz                          |
| ----- | ----------------------------------- | ---------------------------------- |
| 1️⃣    | `for (const dados of estudantes)`   | Itera cada estudante               |
| 2️⃣    | `prisma.student.findFirst()`        | Busca se já existe no banco        |
| 3️⃣    | `OR: [{ email }, { registration }]` | Busca por email OU matrícula       |
| 4️⃣    | `if (existente)`                    | Se encontrou, incrementa contador  |
| 5️⃣    | `else prisma.student.create()`      | Se não existe, cria                |
| 6️⃣    | `try...catch`                       | Captura erros (ex: conexão falhou) |

**Por que verificar se existe?**

- Seed pode ser executado múltiplas vezes
- Evita erros de duplicação (email/registration únicos)
- Permite reexecutar sem limpar banco

**Operador OR:**

```typescript
where: {
  OR: [
    { email: dados.email }, // Busca por email
    { registration: dados.registration }, // OU busca por matrícula
  ]
}
// Retorna registro se email OU matrícula coincidirem
```

---

#### **Linhas 69-74: Resumo Parcial**

```typescript
console.log('')
console.log('📊 Estudantes:')
console.log(`   ✅ Criados: ${criados}`)
console.log(`   ⚠️  Já existiam: ${jaExistentes}`)
console.log('')
```

**O que faz:**

- Imprime estatísticas da inserção de estudantes
- Template literals (`${}`) para interpolação de variáveis

---

### 4.5 Seed de Professores

#### **Linhas 80-115: Array de Professores**

```typescript
const professores = [
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes@ifms.edu.br',
    subject: 'Programação Web',
    isActive: true,
  },
  // ... mais 4 professores
]
```

**Estrutura idêntica aos estudantes**, mas:

- Campo `subject` ao invés de `registration` e `course`
- Emails com domínio `@ifms.edu.br` (instituição)

---

#### **Linhas 120-139: Loop de Inserção**

```typescript
for (const dados of professores) {
  try {
    const existente = await prisma.teacher.findFirst({
      where: { email: dados.email },
    })

    if (existente) {
      console.log(`⚠️  Já existe: ${dados.name} - ${dados.subject}`)
      professoresExistentes++
    } else {
      await prisma.teacher.create({
        data: dados,
      })
      console.log(`✅ Criado: ${dados.name} - ${dados.subject}`)
      professoresCriados++
    }
  } catch (erro: any) {
    console.error(`❌ Erro ao processar ${dados.name}:`, erro.message)
  }
}
```

**Diferenças de Student:**

- Verifica apenas `email` (não há `registration` em Teacher)
- Usa `prisma.teacher` ao invés de `prisma.student`
- Mostra `subject` no log

---

### 4.6 Resultado Final

#### **Linhas 148-154: Resumo Geral**

```typescript
console.log('========================================')
console.log('📈 RESUMO GERAL:')
console.log(`   Estudantes: ${criados} criados, ${jaExistentes} existentes`)
console.log(`   Professores: ${professoresCriados} criados, ${professoresExistentes} existentes`)
console.log('========================================')
console.log('')
console.log('🎉 Seed concluído com sucesso!')
```

**Saída exemplo:**

```
========================================
📈 RESUMO GERAL:
   Estudantes: 4 criados, 0 existentes
   Professores: 5 criados, 0 existentes
========================================

🎉 Seed concluído com sucesso!
```

---

### 4.7 Execução e Tratamento de Erros

#### **Linhas 157-165: Bloco de Execução**

```typescript
main()
  .catch((erro) => {
    console.error('❌ Erro no seed:', erro)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Explicação:**

| Linha                        | O que faz                            |
| ---------------------------- | ------------------------------------ |
| `main()`                     | Chama função main()                  |
| `.catch((erro) => ...)`      | Captura erros não tratados           |
| `console.error(...)`         | Imprime erro no console              |
| `process.exit(1)`            | Encerra processo com código 1 (erro) |
| `.finally(async () => ...)`  | Executa sempre, com erro ou sem      |
| `await prisma.$disconnect()` | Desconecta do banco                  |

**Por que `finally`?**

- Garante que desconecta do banco mesmo se houver erro
- Libera recursos (conexões)
- Boas práticas de cleanup

**Códigos de saída:**

- `process.exit(0)` → Sucesso
- `process.exit(1)` → Erro

---

### 4.8 Resumo: seed.ts

**Fluxo completo:**

```
1. Criar instância do Prisma
2. Para cada estudante:
   - Verificar se email ou matrícula já existem
   - Se não existe, criar
   - Se existe, pular
3. Para cada professor:
   - Verificar se email já existe
   - Se não existe, criar
   - Se existe, pular
4. Imprimir estatísticas
5. Desconectar do banco
```

**Estrutura de dados:**

| Entity   | Quantidade | Campos Únicos       |
| -------- | ---------- | ------------------- |
| Students | 4          | email, registration |
| Teachers | 5          | email               |

---

## 5. Comandos Prisma Úteis

### 5.1 Comandos Básicos

| Comando               | O que faz                            | Quando usar                   |
| --------------------- | ------------------------------------ | ----------------------------- |
| `npx prisma init`     | Cria pasta prisma/ e arquivo .env    | Iniciar projeto               |
| `npx prisma generate` | Gera Prisma Client baseado no schema | Após editar schema.prisma     |
| `npx prisma db push`  | Sincroniza schema com MongoDB        | Aplicar mudanças no banco     |
| `npx prisma db seed`  | Executa seed.ts                      | Popular banco com dados       |
| `npx prisma studio`   | Abre interface visual                | Ver/editar dados no navegador |

---

### 5.2 Comandos de Desenvolvimento

| Comando               | O que faz                                 |
| --------------------- | ----------------------------------------- |
| `npx prisma format`   | Formata schema.prisma (indentação, ordem) |
| `npx prisma validate` | Valida sintaxe do schema.prisma           |
| `npx prisma db pull`  | Gera schema baseado no banco existente    |

---

### 5.3 Fluxo Típico de Desenvolvimento

```bash
# 1. Editar schema.prisma (adicionar campo, model, etc.)
code prisma/schema.prisma

# 2. Gerar Prisma Client atualizado
npx prisma generate

# 3. Aplicar mudanças no MongoDB
npx prisma db push

# 4. (Opcional) Popular com dados de teste
npx prisma db seed

# 5. (Opcional) Ver dados no Prisma Studio
npx prisma studio
```

---

### 5.4 Configuração do Seed no package.json

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

**O que faz:**

- Define comando para executar seed
- `ts-node` executa TypeScript diretamente
- Permite rodar com `npx prisma db seed`

---

## 6. Exercícios Práticos

### 6.1 Exercício 1: Adicionar Campo ao Student

**Objetivo:** Adicionar campo `phone` (telefone opcional) ao model Student.

**Passos:**

1. Editar `schema.prisma`:

```prisma
model Student {
  // ... campos existentes
  phone     String?  // ? = opcional
  // ... restante
}
```

2. Gerar Client:

```bash
npx prisma generate
```

3. Aplicar no banco:

```bash
npx prisma db push
```

4. Atualizar seed.ts (opcional):

```typescript
const estudantes = [
  {
    name: 'João Silva',
    email: 'joao.silva@estudante.com',
    registration: '2024001',
    course: 'ADS',
    phone: '(67) 99999-9999', // Novo campo
    isActive: true,
  },
  // ...
]
```

---

### 6.2 Exercício 2: Criar Model Course

**Objetivo:** Criar novo model para cursos.

**Código:**

```prisma
model Course {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String   @unique
  code      String   @unique
  duration  Int      // Duração em semestres
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("courses")
}
```

**Não esqueça:**

1. `npx prisma generate`
2. `npx prisma db push`
3. Adicionar seed de cursos em `seed.ts`

---

### 6.3 Exercício 3: Adicionar Índice Composto

**Objetivo:** Criar índice para buscar estudantes por curso e status ativo.

**Código:**

```prisma
model Student {
  // ... campos existentes

  @@map("students")
  @@index([course, isActive]) // Índice composto
}
```

**Por que índice composto?**

- Otimiza queries do tipo: `WHERE course = 'ADS' AND isActive = true`
- Melhora performance em buscas frequentes

---

### 6.4 Exercício 4: Modificar Seed com Mais Dados

**Objetivo:** Adicionar 6 estudantes ao seed (total de 10).

**Dica:**

```typescript
const estudantes = [
  // ... 4 estudantes existentes
  {
    name: 'Carlos Pereira',
    email: 'carlos.pereira@estudante.com',
    registration: '2024005',
    course: 'Redes',
    isActive: true,
  },
  // ... adicione mais 5
]
```

---

### 6.5 Exercício 5: Seed Condicional

**Objetivo:** Popular seed apenas se o banco estiver vazio.

**Código:**

```typescript
async function main() {
  // Verificar se já existem estudantes
  const totalStudents = await prisma.student.count()

  if (totalStudents > 0) {
    console.log('⚠️  Banco já possui dados. Seed cancelado.')
    return
  }

  console.log('🌱 Banco vazio. Iniciando seed...')

  // ... resto do código de seed
}
```

---

<div align="center">

## 🎓 AVALIAÇÃO DE APRENDIZADO

</div>

---

## 📚 Conceitos-Chave Aprendidos

<div align="center">

### 🎯 Checkpoint de Conhecimento

**Marque os itens que você domina completamente**

</div>

### ✅ Checklist de Conhecimentos

<table>
<tr>
<td width="50%">

#### 📖 Fundamentos

- [ ] O que é ORM e por que usar
- [ ] Diferença entre Prisma e outros ORMs
- [ ] Componentes do Prisma (Schema, Client, Studio)
- [ ] Fluxo de trabalho com Prisma
- [ ] Quando usar Prisma vs SQL puro

#### 🛠️ Configuração

- [ ] Instalar dependências (`prisma`, `@prisma/client`)
- [ ] Comando `npx prisma init`
- [ ] Configurar `DATABASE_URL` no `.env`
- [ ] Escolher provider correto (mongodb, postgresql)

#### 📝 Schema

- [ ] Sintaxe do schema.prisma
- [ ] Criar models (Student, Teacher)
- [ ] Tipos de dados (String, Int, Boolean, DateTime)
- [ ] Atributos de campo (`@id`, `@unique`, `@default`)
- [ ] Atributos de model (`@@map`, `@@index`)
- [ ] Mapeamento MongoDB (`@map("_id")`, `@db.ObjectId`)

</td>
<td width="50%">

#### ⚙️ Comandos

- [ ] `npx prisma generate` (gerar client)
- [ ] `npx prisma db push` (sincronizar schema)
- [ ] `npx prisma db seed` (popular dados)
- [ ] `npx prisma studio` (interface visual)
- [ ] `npx prisma format` (formatar schema)
- [ ] `npx prisma validate` (validar sintaxe)

#### 💻 Código

- [ ] Importar `PrismaClient`
- [ ] Criar instância (Singleton pattern)
- [ ] CRUD: `create()`, `findMany()`, `findUnique()`
- [ ] CRUD: `update()`, `delete()`
- [ ] Filtros com `where`
- [ ] Ordenação com `orderBy`
- [ ] Tratamento de erros

#### 🌱 Seed

- [ ] Criar arquivo `seed.ts`
- [ ] Configurar em `package.json`
- [ ] Verificar duplicados (OR queries)
- [ ] Popular múltiplas entidades
- [ ] Desconectar corretamente (`finally`)

</td>
</tr>
</table>

### 📊 Seu Progresso

Conte quantos itens você marcou:

| Itens Marcados | Nível            | Próximo Passo          |
| -------------- | ---------------- | ---------------------- |
| 0-8            | 🌱 Iniciante     | Revisar Parte I e II   |
| 9-16           | 🌿 Aprendiz      | Fazer exercícios 1-3   |
| 17-24          | 🌳 Intermediário | Fazer exercícios 4-5   |
| 25-30          | 🏆 Avançado      | Criar projeto próprio  |
| 31+            | ⭐ Expert        | Ensinar outros alunos! |

| Conceito                              | Entendi? |
| ------------------------------------- | -------- |
| O que é Prisma ORM                    | ☐        |
| Estrutura do schema.prisma            | ☐        |
| Generator e Datasource                | ☐        |
| Models e campos                       | ☐        |
| Atributos (@id, @unique, @default)    | ☐        |
| Mapeamento (@@map)                    | ☐        |
| Tipos de dados Prisma                 | ☐        |
| Propósito do seed.ts                  | ☐        |
| Verificar duplicados antes de inserir | ☐        |
| Comandos Prisma CLI                   | ☐        |

---

## 🎯 Resumo Final

### Arquivos e Propósitos

| Arquivo           | Linhas | Propósito                                                       |
| ----------------- | ------ | --------------------------------------------------------------- |
| **schema.prisma** | 45     | Define estrutura do banco (models, campos, índices)             |
| **seed.ts**       | 165    | Popular banco com dados iniciais (4 estudantes + 5 professores) |

### Models Definidos

| Model       | Collection | Campos Únicos       | Campos Opcionais |
| ----------- | ---------- | ------------------- | ---------------- |
| **Student** | `students` | email, registration | Nenhum           |
| **Teacher** | `teachers` | email               | Nenhum           |

### Campos Automáticos

Todos os models têm:

- `id` → ObjectId gerado automaticamente
- `createdAt` → Data de criação
- `updatedAt` → Atualiza a cada modificação

### Comandos Essenciais

```bash
# Gerar Cliente
npx prisma generate

# Sincronizar com banco
npx prisma db push

# Popular dados
npx prisma db seed

# Interface visual
npx prisma studio
```

---

## 👨‍🏫 Para o Professor

### Sugestão de Plano de Aula (3 horas)

**Aula 1 (1h): Introdução ao Prisma**

- O que é ORM
- Prisma vs SQL puro
- Estrutura do schema.prisma
- Prática: Adicionar campo phone

**Aula 2 (1h): Models e Schema**

- Tipos de dados
- Atributos (@id, @unique, @default, @updatedAt)
- Mapeamento (@@map)
- Prática: Criar model Course

**Aula 3 (1h): Seed e Comandos**

- Propósito do seed
- Estrutura do seed.ts
- Comandos Prisma CLI
- Prática: Adicionar 6 estudantes ao seed

### Avaliação Sugerida (10 pontos)

1. Adicionar campo opcional ao Student - 2 pts
2. Criar model Course completo - 3 pts
3. Criar seed para Course (5 cursos) - 3 pts
4. Adicionar índice composto - 1 pt
5. Explicar diferença entre @map e @@map - 1 pt

### Demonstração Prática

**Mostrar Prisma Studio:**

```bash
npx prisma studio
```

- Abrir navegador em `http://localhost:5555`
- Mostrar dados dos estudantes e professores
- Editar registro diretamente na interface
- Demonstrar filtros e busca

**Mostrar Geração de Client:**

```bash
npx prisma generate
```

- Abrir `node_modules/@prisma/client`
- Mostrar código TypeScript gerado
- Demonstrar autocomplete no VS Code

---

## 📖 Recursos Adicionais

### Documentação Oficial

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma with MongoDB](https://www.prisma.io/docs/concepts/database-connectors/mongodb)

### Ferramentas

- [Prisma Studio](https://www.prisma.io/studio) - Interface visual
- [Prisma Data Platform](https://www.prisma.io/dataplatform) - Plataforma em nuvem
- [ERD Generator](https://prisma-erd.simonknott.de/) - Gerar diagramas do schema

### Tutoriais Recomendados

- [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [Prisma + MongoDB Tutorial](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)

---

---

<div align="center">

## 🎉 PARABÉNS!

### Você completou a Apostila de Prisma ORM

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🏆 CERTIFICADO DE CONCLUSÃO                           ║
║                                                          ║
║   Você agora domina os fundamentos do Prisma ORM       ║
║   e está pronto para criar aplicações modernas         ║
║   com banco de dados type-safe!                        ║
║                                                          ║
║   ⭐⭐⭐⭐⭐                                                ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

### 🚀 Próximos Passos

| Nível                | Desafio            | Descrição                                  |
| -------------------- | ------------------ | ------------------------------------------ |
| 🎯 **Iniciante**     | Projeto Biblioteca | Sistema de empréstimo de livros com Prisma |
| 🚀 **Intermediário** | API REST Completa  | CRUD + autenticação + relacionamentos      |
| 💪 **Avançado**      | Sistema E-commerce | Produtos, pedidos, pagamentos              |
| 🏆 **Expert**        | SaaS Multi-tenant  | Aplicação com múltiplos clientes isolados  |

### 📚 Recursos Complementares

<table>
<tr>
<td width="33%">

#### 📖 Documentação

- [Prisma Docs](https://prisma.io/docs)
- [Schema Reference](https://prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [MongoDB Guide](https://prisma.io/docs/concepts/database-connectors/mongodb)

</td>
<td width="33%">

#### 🎓 Aprendizado

- [Prisma YouTube](https://youtube.com/c/PrismaData)
- [freeCodeCamp Tutorial](https://freecodecamp.org)
- [Prisma Blog](https://prisma.io/blog)

</td>
<td width="33%">

#### 👥 Comunidade

- [Discord Prisma](https://pris.ly/discord)
- [GitHub Discussions](https://github.com/prisma/prisma/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/prisma)

</td>
</tr>
</table>

### 💬 Feedback

Esta apostila foi útil? Deixe seu feedback:

- 🌟🌟🌟🌟🌟 Excelente
- 🌟🌟🌟🌟 Muito Bom
- 🌟🌟🌟 Bom
- 🌟🌟 Regular
- 🌟 Precisa Melhorar

**Sugestões?** Entre em contato com seu professor!

---

### 📜 Créditos e Licença

**📅 Última atualização:** Outubro/2024  
**✍️ Autor:** Material didático IFMS - Curso Técnico em Informática  
**📧 Dúvidas:** Consulte seu professor  
**📄 Licença:** Material educacional de uso livre para fins acadêmicos  
**🔗 Tecnologias:** Prisma ORM | MongoDB | TypeScript | Node.js

<div align="center">

---

**Desenvolvido com ❤️ para os alunos do IFMS**

![IFMS](https://img.shields.io/badge/IFMS-Instituto_Federal-green?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**⭐ Se este material foi útil, compartilhe com seus colegas! ⭐**

</div>
