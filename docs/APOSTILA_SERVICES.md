# 📚 Apostila: Entendendo a Pasta Services

## 🎯 Objetivo desta Apostila

Esta apostila explica **de forma sucinta e objetiva** cada arquivo da pasta `src/services`. Aqui você aprenderá como funciona a **camada de serviços**, responsável pela lógica de negócios e comunicação com o banco de dados.

---

## 📋 Sumário

1. [O que é a Camada de Services?](#1-o-que-é-a-camada-de-services)
2. [Arquivo: database.service.ts](#2-arquivo-databaseservicets)
3. [Arquivo: persistence.service.ts](#3-arquivo-persistenceservicets)
4. [Arquivo: student.service.ts](#4-arquivo-studentservicets)
5. [Arquivo: teacher.service.ts](#5-arquivo-teacherservicets)
6. [Arquivo: index.ts](#6-arquivo-indexts)
7. [Fluxo de Dados Completo](#7-fluxo-de-dados-completo)
8. [Exercícios Práticos](#8-exercícios-práticos)

---

## 1. O que é a Camada de Services?

### 1.1 Arquitetura em 3 Camadas

### 1.1 Arquitetura em 3 Camadas

| Fluxo de Dados                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CONTROLLER** (Recebe requisições HTTP)<br>⬇️ <br> **SERVICE** (Valida e executa regras de negócio) <br> ⬇️ <br> **PERSISTENCE** (Comunica com o banco de dados) <br> ⬇️ <br> **DATABASE** (MongoDB via Prisma) |

### 1.2 Responsabilidades de Cada Camada

| Camada          | Responsabilidade          | Exemplo                              |
| --------------- | ------------------------- | ------------------------------------ |
| **Controller**  | Receber/enviar dados HTTP | Ler `req.body`, enviar `res.json()`  |
| **Service**     | Validar regras de negócio | "Email já existe?", "Dados válidos?" |
| **Persistence** | Operações no banco        | `create()`, `findAll()`, `update()`  |
| **Database**    | Conexão com MongoDB       | Prisma Client                        |

### 1.3 Por que Separar em Camadas?

✅ **Organização**: Cada arquivo tem uma responsabilidade clara  
✅ **Reutilização**: Services podem ser usados por múltiplos controllers  
✅ **Testabilidade**: Fácil testar cada camada separadamente  
✅ **Manutenção**: Mudanças isoladas não quebram todo o sistema

---

## 2. Arquivo: database.service.ts

**Propósito:** Gerenciar a conexão com o MongoDB via Prisma.

### 2.1 Código Completo (79 linhas)

```typescript
import { PrismaClient } from '@prisma/client'

// ========================================
// SINGLETON DO PRISMA CLIENT
// ========================================

let prisma: PrismaClient

function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
  return prisma
}

export const db = getPrismaClient()

// ========================================
// FUNÇÕES DE CONEXÃO
// ========================================

export async function conectar(): Promise<void> {
  try {
    await db.$connect()
    console.log('✅ Conectado ao MongoDB com sucesso!')
  } catch (erro) {
    console.error('❌ Erro ao conectar ao MongoDB:', erro)
    throw erro
  }
}

export async function desconectar(): Promise<void> {
  try {
    await db.$disconnect()
    console.log('✅ Desconectado do MongoDB com sucesso!')
  } catch (erro) {
    console.error('❌ Erro ao desconectar do MongoDB:', erro)
    throw erro
  }
}

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

process.on('beforeExit', async () => {
  await desconectar()
})

process.on('SIGINT', async () => {
  await desconectar()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await desconectar()
  process.exit(0)
})
```

---

### 2.2 Explicação Linha por Linha

#### **Linha 1: Importação do Prisma**

```typescript
import { PrismaClient } from '@prisma/client'
```

- Importa a classe `PrismaClient` do Prisma
- Prisma é um ORM (Object-Relational Mapping) que facilita comunicação com o banco

---

#### **Linhas 7-8: Variável do Singleton**

```typescript
let prisma: PrismaClient
```

- Declara variável que armazenará a instância única do Prisma
- **Singleton**: Padrão de design que garante apenas 1 instância da classe

**Por que Singleton?**

- Evita criar múltiplas conexões com o banco
- Economiza recursos (memória, conexões)
- Em desenvolvimento, evita problemas com hot-reload

---

#### **Linhas 10-16: Função getPrismaClient()**

```typescript
function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
  return prisma
}
```

**Linha por linha:**

| Linha                     | O que faz                       | Por que?                                |
| ------------------------- | ------------------------------- | --------------------------------------- |
| `if (!prisma)`            | Verifica se já existe instância | Evita criar múltiplas vezes             |
| `new PrismaClient({...})` | Cria nova instância             | Só na primeira vez                      |
| `log: process.env...`     | Configura logs                  | Em dev mostra queries, em prod só erros |
| `return prisma`           | Retorna instância               | Sempre a mesma                          |

---

#### **Linha 18: Exportação do db**

```typescript
export const db = getPrismaClient()
```

- Exporta instância do Prisma com nome `db`
- Outros arquivos usam: `import { db } from './database.service'`
- Acesso aos models: `db.student`, `db.teacher`, etc.

---

#### **Linhas 24-32: Função conectar()**

```typescript
export async function conectar(): Promise<void> {
  try {
    await db.$connect()
    console.log('✅ Conectado ao MongoDB com sucesso!')
  } catch (erro) {
    console.error('❌ Erro ao conectar ao MongoDB:', erro)
    throw erro
  }
}
```

**Conceitos:**

| Elemento              | Explicação                               |
| --------------------- | ---------------------------------------- |
| `async function`      | Função assíncrona (pode usar `await`)    |
| `Promise<void>`       | Retorna Promise sem valor (void = vazio) |
| `await db.$connect()` | Espera conexão com MongoDB               |
| `try...catch`         | Captura erros se conexão falhar          |
| `throw erro`          | Repassa erro para quem chamou a função   |

**Uso típico:**

```typescript
// Em src/index.ts
import { conectar } from './services/database.service'

conectar() // Conecta ao iniciar servidor
```

---

#### **Linhas 34-42: Função desconectar()**

```typescript
export async function desconectar(): Promise<void> {
  try {
    await db.$disconnect()
    console.log('✅ Desconectado do MongoDB com sucesso!')
  } catch (erro) {
    console.error('❌ Erro ao desconectar do MongoDB:', erro)
    throw erro
  }
}
```

- Mesma estrutura da função `conectar()`
- `$disconnect()`: Fecha conexão com MongoDB
- Importante: Libera recursos ao encerrar aplicação

---

#### **Linhas 48-62: Graceful Shutdown**

```typescript
process.on('beforeExit', async () => {
  await desconectar()
})

process.on('SIGINT', async () => {
  await desconectar()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await desconectar()
  process.exit(0)
})
```

**O que é Graceful Shutdown?**

- Encerramento "elegante" da aplicação
- Desconecta do banco antes de fechar
- Evita perda de dados ou conexões abertas

**Sinais do Sistema:**

| Sinal        | Quando ocorre          | O que faz                                 |
| ------------ | ---------------------- | ----------------------------------------- |
| `beforeExit` | Aplicação vai encerrar | Desconecta do banco                       |
| `SIGINT`     | Ctrl+C no terminal     | Desconecta e encerra (código 0 = sucesso) |
| `SIGTERM`    | Comando `kill`         | Desconecta e encerra                      |

---

### 2.3 Resumo: database.service.ts

| Componente          | Função                                          |
| ------------------- | ----------------------------------------------- |
| `prisma`            | Variável que armazena instância única           |
| `getPrismaClient()` | Cria/retorna instância do Prisma (Singleton)    |
| `db`                | Instância exportada para uso em outros arquivos |
| `conectar()`        | Conecta ao MongoDB                              |
| `desconectar()`     | Desconecta do MongoDB                           |
| Event listeners     | Garante desconexão ao encerrar app              |

---

## 3. Arquivo: persistence.service.ts

**Propósito:** Camada genérica de persistência (CRUD) para qualquer entidade.

### 3.1 Estrutura do Arquivo (142 linhas)

| Seção                | Linhas  | Conteúdo               |
| -------------------- | ------- | ---------------------- |
| Imports              | 1       | Importa `db`           |
| Types                | 5-27    | Define tipos genéricos |
| CRUD Functions       | 30-105  | 5 funções CRUD         |
| Validation Functions | 108-142 | 2 funções de validação |

---

### 3.2 Tipos Genéricos

#### **Linhas 13-17: BaseEntity**

```typescript
export type BaseEntity = {
  id: string
  createdAt: Date
  updatedAt: Date
}
```

- Define campos comuns a todas as entidades
- Todo registro tem `id`, `createdAt`, `updatedAt`

---

#### **Linhas 22-23: CreateData**

```typescript
export type CreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
```

- Tipo genérico para dados de criação
- `Omit<T, ...>`: Remove campos que não precisam ser fornecidos
- **Exemplo:**
  ```typescript
  // Student tem: id, name, email, createdAt, updatedAt
  // CreateData<Student> = {name, email} apenas
  ```

---

#### **Linhas 28: UpdateData**

```typescript
export type UpdateData<T> = Partial<CreateData<T>>
```

- Tipo genérico para dados de atualização
- `Partial<T>`: Torna todos os campos opcionais
- **Exemplo:**
  ```typescript
  // UpdateData<Student> = {name?, email?}
  // Pode atualizar só name, só email, ou ambos
  ```

---

### 3.3 Funções CRUD

#### **Linhas 36-43: findAll()**

```typescript
export async function findAll<T>(model: any, orderBy: string = 'name'): Promise<T[]> {
  const records = await model.findMany({
    orderBy: { [orderBy]: 'asc' },
  })
  return records
}
```

**Explicação:**

| Elemento                      | O que faz                                    |
| ----------------------------- | -------------------------------------------- |
| `findAll<T>`                  | Função genérica (T = Student, Teacher, etc.) |
| `model: any`                  | Modelo do Prisma (db.student, db.teacher)    |
| `orderBy = 'name'`            | Campo padrão para ordenação                  |
| `Promise<T[]>`                | Retorna array de registros                   |
| `model.findMany()`            | Busca todos os registros no banco            |
| `orderBy: {[orderBy]: 'asc'}` | Ordena em ordem crescente                    |

**Uso:**

```typescript
// Em student.service.ts
const students = await persistence.findAll<Student>(db.student, 'name')
```

---

#### **Linhas 50-60: findById()**

```typescript
export async function findById<T>(model: any, id: string): Promise<T | null> {
  try {
    const record = await model.findUnique({
      where: { id },
    })
    return record
  } catch (error) {
    return null // Returns null if ID is invalid
  }
}
```

**Explicação:**

| Linha                | O que faz                                   |
| -------------------- | ------------------------------------------- |
| `findById<T>`        | Função genérica para buscar por ID          |
| `id: string`         | ID do registro a buscar                     |
| `Promise<T \| null>` | Retorna registro ou `null` se não encontrar |
| `model.findUnique()` | Busca registro único por critério           |
| `where: { id }`      | Filtra por ID                               |
| `catch (error)`      | Se ID inválido, retorna `null`              |

**Uso:**

```typescript
const student = await persistence.findById<Student>(db.student, '507f...')
if (student) {
  console.log(student.name)
} else {
  console.log('Estudante não encontrado')
}
```

---

#### **Linhas 67-73: create()**

```typescript
export async function create<T>(model: any, data: any): Promise<T> {
  const newRecord = await model.create({
    data: data,
  })
  return newRecord
}
```

**Explicação:**

| Elemento         | O que faz                           |
| ---------------- | ----------------------------------- |
| `create<T>`      | Função genérica para criar registro |
| `data: any`      | Dados do novo registro              |
| `Promise<T>`     | Retorna o registro criado           |
| `model.create()` | Cria registro no banco              |

**Uso:**

```typescript
const newStudent = await persistence.create<Student>(db.student, {
  name: 'João Silva',
  email: 'joao@email.com',
  registration: '2024001',
  course: 'Informática',
  isActive: true,
})
```

---

#### **Linhas 80-92: update()**

```typescript
export async function update<T>(model: any, id: string, data: any): Promise<T | null> {
  try {
    const updatedRecord = await model.update({
      where: { id },
      data: data,
    })
    return updatedRecord
  } catch (error) {
    return null // Returns null if record doesn't exist
  }
}
```

**Explicação:**

| Elemento             | O que faz                             |
| -------------------- | ------------------------------------- |
| `update<T>`          | Função genérica para atualizar        |
| `id: string`         | ID do registro a atualizar            |
| `data: any`          | Dados a atualizar                     |
| `Promise<T \| null>` | Retorna registro atualizado ou `null` |
| `where: { id }`      | Filtra qual registro atualizar        |
| `catch (error)`      | Se não existir, retorna `null`        |

**Uso:**

```typescript
const updated = await persistence.update<Student>(db.student, '507f...', {
  email: 'novo@email.com',
})
```

---

#### **Linhas 99-109: remove()**

```typescript
export async function remove(model: any, id: string): Promise<boolean> {
  try {
    await model.delete({
      where: { id },
    })
    return true
  } catch (error) {
    return false // Returns false if record doesn't exist
  }
}
```

**Explicação:**

| Elemento           | O que faz                                               |
| ------------------ | ------------------------------------------------------- |
| `remove()`         | Deleta registro (não é genérica porque retorna boolean) |
| `Promise<boolean>` | `true` se deletou, `false` se não encontrou             |
| `model.delete()`   | Deleta registro do banco                                |

**Uso:**

```typescript
const deleted = await persistence.remove(db.student, '507f...')
if (deleted) {
  console.log('Deletado com sucesso')
} else {
  console.log('Estudante não encontrado')
}
```

---

### 3.4 Funções de Validação

#### **Linhas 116-123: fieldExists()**

```typescript
export async function fieldExists(model: any, field: string, value: any): Promise<boolean> {
  const record = await model.findFirst({
    where: { [field]: value },
  })
  return record !== null
}
```

**Explicação:**

| Elemento                  | O que faz                                   |
| ------------------------- | ------------------------------------------- |
| `fieldExists()`           | Verifica se valor já existe em um campo     |
| `field: string`           | Nome do campo ('email', 'registration')     |
| `value: any`              | Valor a verificar                           |
| `Promise<boolean>`        | `true` se existe, `false` se não            |
| `model.findFirst()`       | Busca primeiro registro que atende critério |
| `where: {[field]: value}` | Sintaxe dinâmica: campo é variável          |

**Uso:**

```typescript
// Verifica se email já existe antes de criar
const emailExists = await persistence.fieldExists(db.student, 'email', 'joao@email.com')
if (emailExists) {
  throw new Error('Email já existe!')
}
```

---

#### **Linhas 131-142: fieldExistsExcludingId()**

```typescript
export async function fieldExistsExcludingId(
  model: any,
  field: string,
  value: any,
  excludeId: string,
): Promise<boolean> {
  const record = await model.findFirst({
    where: {
      [field]: value,
      id: { not: excludeId },
    },
  })
  return record !== null
}
```

**Explicação:**

| Elemento                   | O que faz                                 |
| -------------------------- | ----------------------------------------- |
| `fieldExistsExcludingId()` | Verifica se valor existe, excluindo um ID |
| `excludeId: string`        | ID a ignorar na busca                     |
| `id: { not: excludeId }`   | Filtro: "ID diferente de excludeId"       |

**Quando usar?**

- Ao **atualizar** um registro
- Verificar se novo email já existe **em outro registro**

**Exemplo:**

```typescript
// Atualizando email do estudante ID=123
// Precisa verificar se novo email existe em OUTRO estudante
const emailExists = await persistence.fieldExistsExcludingId(
  db.student,
  'email',
  'novo@email.com',
  '123', // Exclui o próprio estudante da busca
)
```

---

### 3.5 Resumo: persistence.service.ts

| Função                     | Parâmetros                     | Retorno     | Uso                      |
| -------------------------- | ------------------------------ | ----------- | ------------------------ |
| `findAll<T>()`             | model, orderBy                 | `T[]`       | Buscar todos             |
| `findById<T>()`            | model, id                      | `T \| null` | Buscar por ID            |
| `create<T>()`              | model, data                    | `T`         | Criar registro           |
| `update<T>()`              | model, id, data                | `T \| null` | Atualizar                |
| `remove()`                 | model, id                      | `boolean`   | Deletar                  |
| `fieldExists()`            | model, field, value            | `boolean`   | Verificar existência     |
| `fieldExistsExcludingId()` | model, field, value, excludeId | `boolean`   | Verificar (excluindo ID) |

---

## 4. Arquivo: student.service.ts

**Propósito:** Lógica de negócios específica para **Estudantes**.

### 4.1 Estrutura (101 linhas)

| Função       | Linhas  | O que faz                                        |
| ------------ | ------- | ------------------------------------------------ |
| `create()`   | 15-47   | Cria estudante (valida email e matrícula únicos) |
| `findAll()`  | 52-54   | Busca todos os estudantes                        |
| `findById()` | 59-61   | Busca estudante por ID                           |
| `update()`   | 68-95   | Atualiza estudante (valida email único)          |
| `remove()`   | 100-102 | Deleta estudante                                 |

---

### 4.2 Função create()

```typescript
export async function create(data: {
  name: string
  email: string
  registration: string
  course: string
  isActive?: boolean
}): Promise<Student> {
  // Validate if registration already exists
  const registrationExists = await persistence.fieldExists(
    db.student,
    'registration',
    data.registration,
  )
  if (registrationExists) {
    throw new Error('Registration already exists')
  }

  // Validate if email already exists
  const emailExists = await persistence.fieldExists(db.student, 'email', data.email)
  if (emailExists) {
    throw new Error('Email already exists')
  }

  // Create student with isActive = true by default
  const newStudent = await persistence.create<Student>(db.student, {
    name: data.name,
    email: data.email,
    registration: data.registration,
    course: data.course,
    isActive: data.isActive ?? true,
  })

  return newStudent
}
```

**Fluxo de execução:**

| Passo | O que faz                                 | Por que?                           |
| ----- | ----------------------------------------- | ---------------------------------- |
| 1️⃣    | Verifica se matrícula existe              | Matrícula deve ser única           |
| 2️⃣    | Se existe, lança erro                     | Para execução e retorna mensagem   |
| 3️⃣    | Verifica se email existe                  | Email deve ser único               |
| 4️⃣    | Se existe, lança erro                     | Para execução                      |
| 5️⃣    | Cria estudante no banco                   | Se passou nas validações           |
| 6️⃣    | Define `isActive = true` se não fornecido | Operador `??` (nullish coalescing) |
| 7️⃣    | Retorna estudante criado                  | Com ID gerado pelo banco           |

**Conceito: Nullish Coalescing (`??`)**

```typescript
isActive: data.isActive ?? true
// Se data.isActive for undefined ou null, usa true
// Se data.isActive for false, usa false
```

---

### 4.3 Função findAll()

```typescript
export async function findAll(): Promise<Student[]> {
  return await persistence.findAll<Student>(db.student, 'name')
}
```

**Explicação:**

- Delega para `persistence.findAll()`
- Ordena por `name`
- Retorna array de estudantes

---

### 4.4 Função findById()

```typescript
export async function findById(id: string): Promise<Student | null> {
  return await persistence.findById<Student>(db.student, id)
}
```

**Explicação:**

- Delega para `persistence.findById()`
- Retorna estudante ou `null` se não encontrado

---

### 4.5 Função update()

```typescript
export async function update(
  id: string,
  data: {
    name?: string
    email?: string
    course?: string
    isActive?: boolean
  },
): Promise<Student | null> {
  // Find current student
  const currentStudent = await persistence.findById<Student>(db.student, id)
  if (!currentStudent) {
    return null // Student not found
  }

  // If changing email, check if it already exists
  if (data.email && data.email !== currentStudent.email) {
    const emailExists = await persistence.fieldExists(db.student, 'email', data.email)
    if (emailExists) {
      throw new Error('Email already exists')
    }
  }

  // Update student
  return await persistence.update<Student>(db.student, id, data)
}
```

**Fluxo de execução:**

| Passo | O que faz                                               |
| ----- | ------------------------------------------------------- |
| 1️⃣    | Busca estudante atual pelo ID                           |
| 2️⃣    | Se não existe, retorna `null`                           |
| 3️⃣    | Se está mudando email, verifica se novo email já existe |
| 4️⃣    | Se email existe, lança erro                             |
| 5️⃣    | Atualiza estudante no banco                             |
| 6️⃣    | Retorna estudante atualizado                            |

**Validação condicional:**

```typescript
if (data.email && data.email !== currentStudent.email) {
  // Só valida se:
  // 1. data.email foi fornecido (não undefined)
  // 2. email novo é diferente do atual
}
```

---

### 4.6 Função remove()

```typescript
export async function remove(id: string): Promise<boolean> {
  return await persistence.remove(db.student, id)
}
```

**Explicação:**

- Delega para `persistence.remove()`
- Retorna `true` se deletou, `false` se não encontrou

---

### 4.7 Resumo: student.service.ts

**Regras de negócio implementadas:**

| Regra                           | Onde é validada              |
| ------------------------------- | ---------------------------- |
| Matrícula deve ser única        | `create()`                   |
| Email deve ser único            | `create()` e `update()`      |
| Estudante ativo por padrão      | `create()` (isActive = true) |
| Não duplicar email ao atualizar | `update()`                   |

---

## 5. Arquivo: teacher.service.ts

**Propósito:** Lógica de negócios específica para **Professores**.

### 5.1 Estrutura (92 linhas)

**Idêntica ao student.service.ts**, mas:

- Não valida `registration` (professores não têm matrícula)
- Apenas valida `email` único
- Campo específico: `subject` (disciplina)

---

### 5.2 Diferenças em create()

```typescript
export async function create(data: {
  name: string
  email: string
  subject: string // ← Campo específico de professores
  isActive?: boolean
}): Promise<Teacher> {
  // Validate if email already exists
  const emailExists = await persistence.fieldExists(db.teacher, 'email', data.email)
  if (emailExists) {
    throw new Error('Email already exists')
  }

  // Create teacher with isActive = true by default
  const newTeacher = await persistence.create<Teacher>(db.teacher, {
    name: data.name,
    email: data.email,
    subject: data.subject, // ← Disciplina
    isActive: data.isActive ?? true,
  })

  return newTeacher
}
```

**Diferenças de student.service:**

- ❌ Não valida `registration` (professores não têm)
- ✅ Inclui campo `subject`
- ✅ Usa `db.teacher` ao invés de `db.student`

---

### 5.3 Comparação: Student vs Teacher Service

| Aspecto                  | Student                  | Teacher      |
| ------------------------ | ------------------------ | ------------ |
| Validações em `create()` | Email + Registration     | Email apenas |
| Campo específico         | `registration`, `course` | `subject`    |
| Model usado              | `db.student`             | `db.teacher` |
| Estrutura geral          | Idêntica                 | Idêntica     |

---

## 6. Arquivo: index.ts

**Propósito:** Centralizar exportações dos serviços (Barrel Export).

### 6.1 Código Completo

```typescript
// ========================================
// EXPORTAR FUNÇÕES DOS SERVIÇOS
// ========================================

// Exportar todas as funções de persistence
export * as persistenceService from './persistence.service'

// Exportar todas as funções de student
export * as studentService from './student.service'
```

---

### 6.2 Sintaxe: export \* as

```typescript
export * as studentService from './student.service'
```

**O que faz:**

- Exporta **todas** as funções de `student.service.ts`
- Agrupa sob o namespace `studentService`

**Uso em outros arquivos:**

```typescript
// Sem index.ts (verboso)
import { create, findAll, findById } from './services/student.service'

// Com index.ts (limpo)
import { studentService } from './services'
studentService.create(...)
studentService.findAll()
```

---

### 6.3 Vantagens do Barrel Export

| Vantagem         | Descrição                                      |
| ---------------- | ---------------------------------------------- |
| **Import limpo** | `import { studentService } from './services'`  |
| **Namespace**    | `studentService.create()` deixa claro a origem |
| **Manutenção**   | Adicionar novo service = adicionar 1 linha     |
| **Organização**  | API pública da pasta fica centralizada         |

---

## 7. Fluxo de Dados Completo

### 7.1 Exemplo: Criar Estudante

```
1. REQUISIÇÃO HTTP
   POST /api/students
   Body: { name: "João", email: "joao@email.com", ... }
   ↓

2. CONTROLLER (student.controller.ts)
   - Recebe req.body
   - Chama studentService.create(req.body)
   ↓

3. SERVICE (student.service.ts)
   - Valida: email único? ✓
   - Valida: matrícula única? ✓
   - Chama persistence.create<Student>(db.student, data)
   ↓

4. PERSISTENCE (persistence.service.ts)
   - Chama db.student.create({ data })
   ↓

5. DATABASE (database.service.ts)
   - Prisma Client executa query no MongoDB
   - MongoDB gera ID e timestamps
   - Retorna registro criado
   ↓

6. RESPOSTA HTTP
   Status: 201 Created
   Body: { id: "507f...", name: "João", ... }
```

---

### 7.2 Fluxo de Validação

```
┌─────────────────────────────────────────────┐
│ SERVICE (Regras de Negócio)                 │
├─────────────────────────────────────────────┤
│ 1. Email já existe?                         │
│    └─ persistence.fieldExists(...)          │
│                                             │
│ 2. Matrícula já existe?                     │
│    └─ persistence.fieldExists(...)          │
│                                             │
│ 3. Se tudo OK, criar:                       │
│    └─ persistence.create(...)               │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│ PERSISTENCE (Operações CRUD Genéricas)      │
├─────────────────────────────────────────────┤
│ - fieldExists() → db.student.findFirst()    │
│ - create() → db.student.create()            │
└─────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│ DATABASE (Prisma Client)                    │
├─────────────────────────────────────────────┤
│ - Executa queries no MongoDB                │
└─────────────────────────────────────────────┘
```

---

### 7.3 Tabela Resumo: Responsabilidades

| Camada          | Arquivo                | Responsabilidade       | Exemplo                       |
| --------------- | ---------------------- | ---------------------- | ----------------------------- |
| **Database**    | database.service.ts    | Gerenciar conexão      | Singleton, connect/disconnect |
| **Persistence** | persistence.service.ts | CRUD genérico          | findAll, create, update       |
| **Service**     | student.service.ts     | Validações específicas | Email único, matrícula única  |
| **Controller**  | student.controller.ts  | HTTP request/response  | req.body → res.json()         |

---

## 8. Exercícios Práticos

### 8.1 Exercício 1: Adicionar Função count()

**Objetivo:** Adicionar função genérica para contar registros.

**Onde:** `persistence.service.ts`

**Código:**

```typescript
/**
 * Counts records in a model
 * @param model - Prisma model
 */
export async function count(model: any): Promise<number> {
  const total = await model.count()
  return total
}
```

**Uso:**

```typescript
const totalStudents = await persistence.count(db.student)
console.log(`Total de estudantes: ${totalStudents}`)
```

---

### 8.2 Exercício 2: Validar Email em student.service

**Objetivo:** Adicionar validação de formato de email.

**Onde:** `student.service.ts`, função `create()`

**Código:**

```typescript
// Antes das validações existentes
if (!data.email.includes('@')) {
  throw new Error('Email format invalid')
}
```

---

### 8.3 Exercício 3: Buscar Estudantes Ativos

**Objetivo:** Criar função para buscar apenas estudantes ativos.

**Onde:** `student.service.ts`

**Código:**

```typescript
/**
 * Finds all active students
 */
export async function findActive(): Promise<Student[]> {
  const students = await db.student.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })
  return students
}
```

---

### 8.4 Exercício 4: Soft Delete

**Objetivo:** Ao invés de deletar, apenas desativar (isActive = false).

**Onde:** `student.service.ts`, função `remove()`

**Código:**

```typescript
export async function remove(id: string): Promise<boolean> {
  const updated = await persistence.update<Student>(db.student, id, {
    isActive: false,
  })
  return updated !== null
}
```

---

### 8.5 Exercício 5: Buscar com Filtro

**Objetivo:** Adicionar função genérica de busca com filtro.

**Onde:** `persistence.service.ts`

**Código:**

```typescript
/**
 * Finds records with custom filter
 * @param model - Prisma model
 * @param where - Filter criteria
 */
export async function findWhere<T>(model: any, where: any): Promise<T[]> {
  const records = await model.findMany({ where })
  return records
}
```

**Uso:**

```typescript
// Buscar estudantes do curso "Informática"
const students = await persistence.findWhere<Student>(db.student, {
  course: 'Informática',
  isActive: true,
})
```

---

## 📚 Conceitos-Chave Aprendidos

### ✅ Checklist de Conhecimentos

| Conceito                           | Entendi? |
| ---------------------------------- | -------- |
| Padrão Singleton                   | ☐        |
| Graceful Shutdown                  | ☐        |
| Funções Genéricas (`<T>`)          | ☐        |
| Tipos Utility (Omit, Partial)      | ☐        |
| Async/Await                        | ☐        |
| Try/Catch para tratamento de erros | ☐        |
| Validações de negócio              | ☐        |
| CRUD operations                    | ☐        |
| Barrel Export                      | ☐        |
| Nullish Coalescing (`??`)          | ☐        |

---

## 🎯 Resumo Final

### Arquivos e Propósitos

| Arquivo                    | Linhas | Propósito                                 |
| -------------------------- | ------ | ----------------------------------------- |
| **database.service.ts**    | 79     | Gerenciar conexão com MongoDB (Singleton) |
| **persistence.service.ts** | 142    | Operações CRUD genéricas reutilizáveis    |
| **student.service.ts**     | 101    | Lógica de negócio para estudantes         |
| **teacher.service.ts**     | 92     | Lógica de negócio para professores        |
| **index.ts**               | 10     | Exportar serviços (Barrel Export)         |

### Relação Entre os Arquivos

```
index.ts (exporta tudo)
    ↓
student.service.ts ──┐
teacher.service.ts ──┼──→ persistence.service.ts ──→ database.service.ts ──→ MongoDB
                     └─────────────────────────────────────────────────────────┘
                              (todos dependem de db)
```

---

## 👨‍🏫 Para o Professor

### Sugestão de Plano de Aula (4 horas)

**Aula 1 (1h): Database Service**

- Conceito de Singleton
- Prisma Client
- Graceful Shutdown
- Prática: Testar conexão

**Aula 2 (1h): Persistence Service**

- Funções genéricas
- TypeScript Generics (`<T>`)
- 7 funções CRUD
- Prática: Exercício 1 (count)

**Aula 3 (1h): Student/Teacher Services**

- Validações de negócio
- Diferença entre validação e persistência
- Fluxo completo de criação
- Prática: Exercícios 2, 3, 4

**Aula 4 (1h): Integração e Exercícios**

- Barrel Export
- Fluxo completo (Controller → Service → Persistence → DB)
- Prática: Exercício 5 + criar novo service

### Avaliação Sugerida (10 pontos)

1. Explicar padrão Singleton - 2 pts
2. Implementar função genérica count() - 2 pts
3. Adicionar validação de formato de email - 2 pts
4. Implementar soft delete - 2 pts
5. Criar service completo para nova entidade (Course) - 2 pts

---

**📅 Última atualização:** Outubro/2024  
**✍️ Autor:** Material didático IFMS  
**📧 Dúvidas:** Consulte seu professor
