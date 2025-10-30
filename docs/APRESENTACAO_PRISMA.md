---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  h1 {
    color: #2D3748;
    border-bottom: 3px solid #4299E1;
    padding-bottom: 10px;
  }
  h2 {
    color: #4A5568;
  }
  code {
    background: #EDF2F7;
    padding: 2px 6px;
    border-radius: 4px;
  }
  pre {
    background: #2D3748;
    color: #fff;
    border-radius: 8px;
    padding: 20px;
  }
  table {
    font-size: 0.9em;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: bold;
    margin: 4px;
  }
  .badge-blue { background: #3182CE; color: white; }
  .badge-green { background: #38A169; color: white; }
  .badge-purple { background: #805AD5; color: white; }
  .badge-orange { background: #DD6B20; color: white; }
---

<!-- _class: lead -->
<!-- _paginate: false -->

# 🚀 Prisma ORM

## **Next-Generation Database Toolkit**

### Desenvolvimento Type-Safe para MongoDB

<br>

**📘 IFMS - Curso Técnico em Informática**
**📅 Outubro 2024**

<div style="text-align: center; margin-top: 40px;">
  <span class="badge badge-blue">Prisma 6.17</span>
  <span class="badge badge-green">MongoDB 7.0</span>
  <span class="badge badge-purple">TypeScript 5.3</span>
  <span class="badge badge-orange">Node.js 22.x</span>
</div>

---

# 📋 Agenda

<div class="columns">
<div>

## Parte I - Fundamentos

1. **O que é Prisma?**
2. **Por que usar ORM?**
3. **Arquitetura do Prisma**
4. **Fluxo de trabalho**

## Parte II - Configuração

5. **Instalação e setup**
6. **Schema.prisma**
7. **Conexão com MongoDB**

</div>
<div>

## Parte III - Prática

8. **Models e tipos**
9. **Operações CRUD**
10. **Seed de dados**
11. **Prisma Studio**

## Parte IV - Avançado

12. **Boas práticas**
13. **Troubleshooting**
14. **Exercícios práticos**

</div>
</div>

---

<!-- _class: lead -->

# 🎯 PARTE I

# **FUNDAMENTOS**

---

# O que é Prisma?

<div class="columns">
<div>

## 📖 Definição

**Prisma** é um ORM moderno que revoluciona a interação com bancos de dados:

- ✅ **Type-Safe** - Zero erros de tipo
- ✅ **Auto-Generated** - Client gerado automaticamente
- ✅ **Schema-First** - Código como documentação
- ✅ **Multi-Database** - PostgreSQL, MySQL, MongoDB, SQLite
- ✅ **Developer Experience** - IntelliSense completo

</div>
<div>

## 🏗️ Arquitetura

```
┌─────────────────────┐
│  schema.prisma      │ ← Define
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  prisma generate    │ ← Gera
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  @prisma/client     │ ← Usa
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  MongoDB/SQL        │ ← Persiste
└─────────────────────┘
```

</div>
</div>

---

# Por que Prisma?

## 🔥 Produtividade em Números

| Métrica             | Sem Prisma  |  Com Prisma  |        Ganho        |
| ------------------- | :---------: | :----------: | :-----------------: |
| ⏱️ **Setup**        |   4 horas   |    30 min    | **87% mais rápido** |
| 🐛 **Bugs de Tipo** |  15-20/mês  |   0-2/mês    |   **90% redução**   |
| 📝 **Código**       | 1000 linhas |  300 linhas  |    **70% menos**    |
| 🚀 **Deploy**       |   Manual    | Automatizado |   **100% seguro**   |

---

# Comparação: SQL vs Prisma

<div class="columns">
<div>

## ❌ SQL Puro

```typescript
// Sem type-safety
const user = await db.query('SELECT * FROM users WHERE id = ?', [userId])

// Erro só em runtime
console.log(user.nmae) // Typo!
// undefined (erro silencioso)

// Sem autocomplete
// Sem validação
// Bugs em produção
```

</div>
<div>

## ✅ Com Prisma

```typescript
// Type-safe total
const user = await prisma.user.findUnique({
  where: { id: userId },
})

// Erro em compilação
console.log(user.nmae) // ❌ ERRO!
// Property 'nmae' does not exist

// Autocomplete completo
// Validação automática
// Zero bugs de tipo
```

</div>
</div>

---

# Componentes do Prisma

| Componente           | Arquivo/Interface       | Função                           | Quando usar                       |
| -------------------- | ----------------------- | -------------------------------- | --------------------------------- |
| 🎨 **Prisma Schema** | `schema.prisma`         | Define estrutura do banco        | Sempre que criar/modificar models |
| 📦 **Prisma Client** | Gerado automaticamente  | Client type-safe para queries    | Em todo código que acessa DB      |
| 🎯 **Prisma Studio** | Interface web (`:5555`) | Visualizar/editar dados (GUI)    | Durante desenvolvimento           |
| 🌱 **Seed**          | `seed.ts`               | Popular banco com dados iniciais | Primeiro setup ou reset           |
| ⚙️ **Prisma CLI**    | `npx prisma`            | Comandos de gerenciamento        | Generate, push, migrate, studio   |

---

# Fluxo de Trabalho Prisma

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

<br>

## 🔄 Ciclo de Desenvolvimento

1. **Definir Schema** → Editar `schema.prisma`
2. **Gerar Client** → `npx prisma generate`
3. **Sincronizar DB** → `npx prisma db push`
4. **Popular DB** → `npx prisma db seed`
5. **Desenvolver** → Usar Prisma Client no código

---

# Prisma vs Alternativas

| Recurso               |    Prisma    |   TypeORM    |  Sequelize   |    Mongoose    |
| --------------------- | :----------: | :----------: | :----------: | :------------: |
| 🔒 **Type-Safety**    | ✅ Completo  |  ⚠️ Parcial  | ❌ Limitado  | ⚠️ Com schemas |
| 💡 **Autocomplete**   |   ✅ 100%    |    ⚠️ 60%    |    ❌ 30%    |     ⚠️ 50%     |
| 🚀 **Performance**    | ✅ Otimizado |    ⚠️ Bom    |   ⚠️ Médio   |     ✅ Bom     |
| 📚 **Documentação**   | ✅ Excelente |    ⚠️ Boa    |  ⚠️ Regular  |     ✅ Boa     |
| 🌐 **Multi-DB**       | ✅ 6+ bancos | ✅ 7+ bancos | ✅ 6+ bancos | ❌ Só MongoDB  |
| 🎯 **Dev Experience** | ✅ Superior  |    ⚠️ Bom    |  ❌ Regular  |     ⚠️ Bom     |

<br>

### 🏆 **Veredito:** Prisma oferece a melhor experiência de desenvolvimento!

---

<!-- _class: lead -->

# 🚀 PARTE II

# **SETUP & CONFIGURAÇÃO**

---

# Instalação - Passo a Passo

## 1️⃣ Criar Projeto Node.js

```bash
# Criar pasta do projeto
mkdir meu-projeto
cd meu-projeto

# Inicializar Node.js
npm init -y
```

## 2️⃣ Instalar Dependências

```bash
# Prisma CLI (dev)
npm install -D prisma typescript ts-node @types/node

# Prisma Client (prod)
npm install @prisma/client
```

---

# Configuração Inicial

## 3️⃣ Inicializar Prisma

```bash
npx prisma init
```

**Cria:**

- `prisma/schema.prisma` → Configuração do Prisma
- `.env` → Variáveis de ambiente

<br>

## 4️⃣ Configurar MongoDB

Editar `.env`:

```env
# Conexão local
DATABASE_URL="mongodb://localhost:27017/meu-banco"

# OU MongoDB Atlas (nuvem)
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/meu-banco"
```

---

# Schema.prisma - Estrutura

```prisma
// ========================================
// CONFIGURAÇÃO
// ========================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// ========================================
// MODELS
// ========================================

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

---

# Schema - Generator & Datasource

<div class="columns">
<div>

## 🔧 Generator

```prisma
generator client {
  provider = "prisma-client-js"
}
```

**O que faz:**

- Define como gerar código
- `prisma-client-js` → TypeScript/JavaScript
- Alternativas: `prisma-client-py`, `prisma-client-go`

</div>
<div>

## 🗄️ Datasource

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

**O que faz:**

- Tipo de banco: `mongodb`
- URL de conexão do `.env`
- Alternativas: `postgresql`, `mysql`, `sqlite`

</div>
</div>

---

# Models - Definindo Estruturas

```prisma
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
```

**Conceitos-chave:**

- `model Student` → Coleção no MongoDB
- `@id` → Chave primária
- `@unique` → Valor único (cria índice)
- `@default()` → Valor padrão
- `@updatedAt` → Atualiza automaticamente
- `@@map()` → Nome da coleção

---

# Tipos de Dados Prisma

| Prisma         | TypeScript | MongoDB    | Exemplo                |
| -------------- | ---------- | ---------- | ---------------------- |
| `String`       | `string`   | `String`   | `"João Silva"`         |
| `Int`          | `number`   | `Int32`    | `42`                   |
| `Float`        | `number`   | `Double`   | `3.14`                 |
| `Boolean`      | `boolean`  | `Boolean`  | `true`                 |
| `DateTime`     | `Date`     | `ISODate`  | `2024-10-23T10:00:00Z` |
| `Json`         | `any`      | `Object`   | `{ "key": "value" }`   |
| `@db.ObjectId` | `string`   | `ObjectId` | ID único MongoDB       |

<br>

### 💡 Campos Opcionais

```prisma
phone  String?  // ? = opcional (pode ser null)
age    Int?     // Opcional
```

---

# Atributos Importantes

## 🔑 Atributos de Campo

| Atributo        | O que faz                | Exemplo                           |
| --------------- | ------------------------ | --------------------------------- |
| `@id`           | Chave primária           | `id String @id`                   |
| `@unique`       | Valor único (índice)     | `email String @unique`            |
| `@default(...)` | Valor padrão             | `isActive Boolean @default(true)` |
| `@updatedAt`    | Atualiza automaticamente | `updatedAt DateTime @updatedAt`   |
| `@map("...")`   | Nome no banco diferente  | `id @map("_id")`                  |

## 📊 Atributos de Model

| Atributo          | O que faz                | Exemplo                      |
| ----------------- | ------------------------ | ---------------------------- |
| `@@map("...")`    | Nome da coleção          | `@@map("students")`          |
| `@@index([...])`  | Criar índice composto    | `@@index([email, name])`     |
| `@@unique([...])` | Restrição única composta | `@@unique([field1, field2])` |

---

# Sincronizar com Banco

## 5️⃣ Gerar Prisma Client

```bash
npx prisma generate
```

**O que faz:**

- Lê `schema.prisma`
- Gera código TypeScript em `node_modules/@prisma/client`
- Cria tipos baseados nos models
- Disponibiliza autocomplete

<br>

## 6️⃣ Aplicar Schema no MongoDB

```bash
npx prisma db push
```

**O que faz:**

- Conecta ao MongoDB
- Cria coleções baseadas nos models
- Cria índices para campos `@unique`
- Atualiza estrutura existente

---

<!-- _class: lead -->

# 💻 PARTE III

# **DESENVOLVIMENTO**

---

# Usar Prisma no Código

## 📦 Criar Instância (Singleton)

```typescript
// src/database.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function connect() {
  try {
    await prisma.$connect()
    console.log('✅ Conectado ao MongoDB!')
  } catch (error) {
    console.error('❌ Erro ao conectar:', error)
    process.exit(1)
  }
}

export async function disconnect() {
  await prisma.$disconnect()
  console.log('✅ Desconectado!')
}

export { prisma }
```

---

# Operações CRUD - CREATE

```typescript
import { prisma } from './database'

// ➕ CRIAR registro
const newUser = await prisma.user.create({
  data: {
    name: 'João Silva',
    email: 'joao@email.com',
    // isActive, createdAt, updatedAt → automáticos
  },
})

console.log('Usuário criado:', newUser)
```

**Saída:**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "João Silva",
  "email": "joao@email.com",
  "isActive": true,
  "createdAt": "2024-10-29T10:00:00.000Z",
  "updatedAt": "2024-10-29T10:00:00.000Z"
}
```

---

# Operações CRUD - READ

<div class="columns">
<div>

## 📋 Buscar Todos

```typescript
const users = await prisma.user.findMany()

// Com filtros
const activeUsers = await prisma.user.findMany({
  where: { isActive: true },
})

// Com ordenação
const sortedUsers = await prisma.user.findMany({
  orderBy: { name: 'asc' },
})
```

</div>
<div>

## 🔍 Buscar por ID

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
})

// Buscar por email
const user = await prisma.user.findUnique({
  where: { email: 'joao@email.com' },
})

// Buscar primeiro
const user = await prisma.user.findFirst({
  where: { course: 'ADS' },
})
```

</div>
</div>

---

# Operações CRUD - UPDATE & DELETE

<div class="columns">
<div>

## ✏️ Atualizar

```typescript
const updated = await prisma.user.update({
  where: { id: userId },
  data: {
    name: 'João Pedro Silva',
  },
})

// updatedAt atualiza automaticamente!
```

## ✏️ Atualizar Vários

```typescript
await prisma.user.updateMany({
  where: { isActive: false },
  data: { isActive: true },
})
```

</div>
<div>

## 🗑️ Deletar

```typescript
await prisma.user.delete({
  where: { id: userId },
})
```

## 🗑️ Deletar Vários

```typescript
await prisma.user.deleteMany({
  where: { isActive: false },
})
```

## 🔢 Contar

```typescript
const total = await prisma.user.count()

const activeCount = await prisma.user.count({
  where: { isActive: true },
})
```

</div>
</div>

---

# Filtros Avançados

```typescript
// Buscar com OR
const users = await prisma.user.findMany({
  where: {
    OR: [{ email: 'joao@email.com' }, { name: 'João Silva' }],
  },
})

// Buscar com AND
const users = await prisma.user.findMany({
  where: {
    AND: [{ course: 'ADS' }, { isActive: true }],
  },
})

// Buscar com NOT
const users = await prisma.user.findMany({
  where: {
    NOT: { course: 'Redes' },
  },
})
```

---

# Seed - Popular Banco

## 🌱 Criar arquivo `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  const user1 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@email.com',
    },
  })

  console.log('✅ Criado:', user1.name)
}

main()
  .catch((e) => console.error('❌ Erro:', e))
  .finally(async () => await prisma.$disconnect())
```

---

# Seed - Evitar Duplicados

```typescript
for (const dados of usuarios) {
  try {
    // Verificar se já existe
    const existente = await prisma.user.findFirst({
      where: {
        OR: [{ email: dados.email }, { registration: dados.registration }],
      },
    })

    if (existente) {
      console.log(`⚠️  Já existe: ${dados.name}`)
    } else {
      await prisma.user.create({ data: dados })
      console.log(`✅ Criado: ${dados.name}`)
    }
  } catch (erro) {
    console.error(`❌ Erro:`, erro.message)
  }
}
```

---

# Seed - Configuração

## 📦 Adicionar ao `package.json`

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

## ▶️ Executar Seed

```bash
npx prisma db seed
```

**Saída:**

```
🌱 Iniciando seed...
✅ Criado: Maria Santos
✅ Criado: Pedro Oliveira
🎉 Seed concluído!
```

---

# Prisma Studio

## 🎨 Interface Visual para Dados

```bash
npx prisma studio
```

**O que faz:**

- Abre navegador em `http://localhost:5555`
- Interface visual tipo "phpMyAdmin"
- Ver todos os dados
- Adicionar/editar/deletar registros
- Filtrar e buscar

<br>

### 🎯 Funcionalidades

✅ Ver todos os models  
✅ CRUD completo via interface  
✅ Filtros e ordenação  
✅ Exportar dados  
✅ Ideal para desenvolvimento

---

# Comandos Prisma - Quick Reference

| Comando               | O que faz                      | Quando usar           |
| --------------------- | ------------------------------ | --------------------- |
| `npx prisma init`     | Cria estrutura inicial         | Iniciar projeto       |
| `npx prisma generate` | Gera Prisma Client             | Após editar schema    |
| `npx prisma db push`  | Aplica schema no banco         | Sincronizar estrutura |
| `npx prisma db seed`  | Executa seed.ts                | Popular dados         |
| `npx prisma studio`   | Abre interface visual          | Ver/editar dados      |
| `npx prisma format`   | Formata schema.prisma          | Organizar código      |
| `npx prisma validate` | Valida sintaxe do schema       | Verificar erros       |
| `npx prisma db pull`  | Gera schema do banco existente | Reverse engineering   |

---

<!-- _class: lead -->

# 🎯 PARTE IV

# **BOAS PRÁTICAS**

---

# Fluxo Completo de Desenvolvimento

```bash
# 1. Editar schema.prisma
code prisma/schema.prisma

# 2. Gerar Client atualizado
npx prisma generate

# 3. Aplicar mudanças no banco
npx prisma db push

# 4. Popular com dados (opcional)
npx prisma db seed

# 5. Visualizar dados (opcional)
npx prisma studio

# 6. Desenvolver com type-safety!
code src/index.ts
```

---

# Boas Práticas - Schema

## ✅ Faça

```prisma
// ✅ Nomes em inglês, PascalCase
model Student { }

// ✅ Plural para coleções
@@map("students")

// ✅ Campos obrigatórios com defaults
isActive Boolean @default(true)

// ✅ Timestamps automáticos
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

// ✅ Índices para campos de busca
email String @unique
@@index([course, isActive])
```

## ❌ Evite

```prisma
// ❌ Nomes em português
model Estudante { }

// ❌ Singular para coleções
@@map("student")

// ❌ Campos sem defaults
isActive Boolean

// ❌ Timestamps manuais
updatedAt DateTime

// ❌ Sem índices em buscas frequentes
email String
```

---

# Boas Práticas - Código

<div class="columns">
<div>

## ✅ Faça

```typescript
// ✅ Singleton para Prisma Client
const prisma = new PrismaClient()

// ✅ Try-catch em operações
try {
  await prisma.user.create({ ... })
} catch (error) {
  console.error(error)
}

// ✅ Desconectar ao final
finally {
  await prisma.$disconnect()
}

// ✅ Validar antes de inserir
const exists = await prisma.user.findFirst({
  where: { email }
})
if (!exists) { ... }
```

</div>
<div>

## ❌ Evite

```typescript
// ❌ Múltiplas instâncias
const prisma1 = new PrismaClient()
const prisma2 = new PrismaClient()

// ❌ Sem tratamento de erro
await prisma.user.create({ ... })

// ❌ Não desconectar
// Vaza conexões!

// ❌ Inserir sem validar
await prisma.user.create({
  data: { email } // Pode duplicar!
})
```

</div>
</div>

---

# Troubleshooting Comum

| Erro                                                | Causa                       | Solução                                              |
| --------------------------------------------------- | --------------------------- | ---------------------------------------------------- |
| **"Environment variable not found: DATABASE_URL"**  | `.env` ausente ou incorreto | Verificar arquivo `.env` na raiz                     |
| **"Cannot find module '@prisma/client'"**           | Client não instalado/gerado | `npm install @prisma/client` + `npx prisma generate` |
| **"MongoServerError: E11000 duplicate key"**        | Violação de `@unique`       | Verificar se valor já existe antes de inserir        |
| **"Schema mudou mas código não reconhece"**         | Client desatualizado        | `npx prisma generate`                                |
| **"Connection refused"**                            | MongoDB não iniciado        | Iniciar MongoDB: `mongod` ou verificar Atlas         |
| **"Invalid `prisma.model.operation()` invocation"** | Parâmetros incorretos       | Verificar tipagem TypeScript                         |

---

# Exercícios Práticos

## 🎯 Exercício 1: Adicionar Campo Opcional

Adicionar campo `phone` (opcional) ao Student:

```prisma
phone String?
```

## 🎯 Exercício 2: Criar Model Course

Criar model para cursos com: `name`, `code`, `duration`

## 🎯 Exercício 3: Índice Composto

Criar índice para buscar por `course` + `isActive`

## 🎯 Exercício 4: Expandir Seed

Adicionar 6 novos estudantes ao seed (total 10)

## 🎯 Exercício 5: Seed Condicional

Modificar seed para popular apenas se banco estiver vazio

---

# Recursos de Aprendizado

<div class="columns">
<div>

## 📖 Documentação

- [Prisma Docs](https://prisma.io/docs)
- [Schema Reference](https://prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [MongoDB Guide](https://prisma.io/docs/concepts/database-connectors/mongodb)

## 🎓 Tutoriais

- [Prisma Quickstart](https://prisma.io/docs/getting-started/quickstart)
- [Prisma YouTube Channel](https://youtube.com/c/PrismaData)
- [freeCodeCamp Tutorial](https://freecodecamp.org)

</div>
<div>

## 🛠️ Ferramentas

- [Prisma Studio](https://prisma.io/studio)
- [Prisma Data Platform](https://prisma.io/dataplatform)
- [ERD Generator](https://prisma-erd.simonknott.de/)

## 👥 Comunidade

- [Discord Prisma](https://pris.ly/discord)
- [GitHub Discussions](https://github.com/prisma/prisma/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/prisma)

</div>
</div>

---

# Checklist de Conhecimento

<div class="columns">
<div>

## 📖 Fundamentos

- [ ] O que é ORM
- [ ] Componentes do Prisma
- [ ] Fluxo de trabalho
- [ ] Prisma vs outros ORMs

## 🛠️ Configuração

- [ ] Instalar dependências
- [ ] Inicializar Prisma
- [ ] Configurar DATABASE_URL
- [ ] Escolher provider

## 📝 Schema

- [ ] Criar models
- [ ] Tipos de dados
- [ ] Atributos de campo
- [ ] Atributos de model
- [ ] Mapeamento MongoDB

</div>
<div>

## ⚙️ Comandos

- [ ] `prisma generate`
- [ ] `prisma db push`
- [ ] `prisma db seed`
- [ ] `prisma studio`

## 💻 Código

- [ ] Importar PrismaClient
- [ ] Criar instância Singleton
- [ ] CRUD completo
- [ ] Filtros e ordenação
- [ ] Tratamento de erros

## 🌱 Seed

- [ ] Criar arquivo seed.ts
- [ ] Configurar package.json
- [ ] Verificar duplicados
- [ ] Popular múltiplas entidades

</div>
</div>

---

<!-- _class: lead -->

# 🎉 Parabéns!

## Você domina os fundamentos do Prisma ORM!

<br>

### 🏆 Próximos Passos

**🎯 Iniciante** → Projeto Biblioteca  
**🚀 Intermediário** → API REST Completa  
**💪 Avançado** → Sistema E-commerce  
**🏆 Expert** → SaaS Multi-tenant

<br>

### 📧 Dúvidas?

Entre em contato com seu professor!

---

<!-- _class: lead -->
<!-- _paginate: false -->

# 🙏 Obrigado!

<br>

**📚 Material Didático IFMS**
**Curso Técnico em Informática**

<br>

<div style="text-align: center;">
  <span class="badge badge-green">Prisma ORM</span>
  <span class="badge badge-blue">MongoDB</span>
  <span class="badge badge-purple">TypeScript</span>
  <span class="badge badge-orange">Node.js</span>
</div>

<br>

**⭐ Compartilhe este conhecimento com seus colegas! ⭐**

---

<!-- _paginate: false -->

# 📑 Referências

## Documentação Oficial

- **Prisma Documentation:** https://www.prisma.io/docs
- **Prisma Schema Reference:** https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- **Prisma with MongoDB:** https://www.prisma.io/docs/concepts/database-connectors/mongodb

## Comunidade

- **Discord Prisma:** https://pris.ly/discord
- **GitHub Prisma:** https://github.com/prisma/prisma
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/prisma

## Ferramentas

- **Prisma Studio:** https://www.prisma.io/studio
- **MongoDB Atlas:** https://www.mongodb.com/atlas
- **VS Code:** https://code.visualstudio.com

---

<!-- _paginate: false -->

# 📝 Notas Adicionais

## Configuração do Projeto

```bash
# Clonar repositório (exemplo)
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
# Editar DATABASE_URL no .env

# Gerar Prisma Client
npx prisma generate

# Aplicar schema no banco
npx prisma db push

# Popular dados iniciais
npx prisma db seed
```

---

<!-- _paginate: false -->

# 🎓 Créditos

<br>

**Desenvolvido com ❤️ para os alunos do IFMS**

<br>

**Autor:** Material Didático - IFMS  
**Curso:** Técnico em Informática  
**Data:** Outubro 2024  
**Versão:** 1.0

<br>

**Tecnologias:**

- Prisma ORM 6.17
- MongoDB 7.0
- TypeScript 5.3
- Node.js 22.x

<br>

**Licença:** Material educacional de uso livre para fins acadêmicos
