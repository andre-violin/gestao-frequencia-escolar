# 📚 Apostila: Entendendo a Pasta Models

## 🎯 Objetivo desta Apostila

Esta apostila foi criada para alunos do curso técnico em Informática do IFMS. Aqui você aprenderá **linha por linha** como funcionam os arquivos da pasta `src/models`, que são fundamentais para definir a estrutura de dados da nossa aplicação.

---

## 📋 Sumário

1. [O que são Models?](#1-o-que-são-models)
2. [Arquivo: Student.ts](#2-arquivo-studentts)
3. [Arquivo: Teacher.ts](#3-arquivo-teacherts)
4. [Arquivo: index.ts](#4-arquivo-indexts)
5. [Conceitos Importantes](#5-conceitos-importantes)
6. [Exercícios Práticos](#6-exercícios-práticos)
7. [Perguntas Frequentes](#7-perguntas-frequentes)

---

## 1. O que são Models?

### 1.1 Definição

**Models** (Modelos) são arquivos que definem a **estrutura dos dados** da nossa aplicação. Eles descrevem:

- Quais informações vamos armazenar (nome, email, etc.)
- Qual o tipo de cada informação (texto, número, data, etc.)
- Quais campos são obrigatórios
- Como os dados se relacionam entre si

### 1.2 Por que usar Models?

✅ **Organização**: Centralizamos a definição dos dados em um só lugar  
✅ **Segurança**: TypeScript verifica se estamos usando os dados corretamente  
✅ **Documentação**: Fica claro para toda equipe quais dados existem  
✅ **Manutenção**: Se precisar mudar algo, mudamos em um só lugar

### 1.3 Analogia do Mundo Real

Imagine que você está preenchendo uma ficha de matrícula na escola:

|     | FICHA DE MATRÍCULA                        |
| :-: | :---------------------------------------- |
| 📝  | **Nome:** ************\_************      |
| 📧  | **Email:** ************\_************     |
| 🎫  | **Matrícula:** ************\_************ |
| 📚  | **Curso:** ************\_************     |
| ✅  | **Ativo:** ☐ Sim ☐ Não                    |

Os **Models** são como essa ficha: eles definem quais campos existem e o que você pode escrever em cada um.

---

## 2. Arquivo: Student.ts

### 2.1 Código Completo

```typescript
// ========================================
// TIPO DO ESTUDANTE (COMPATÍVEL COM PRISMA E MONGODB)
// ========================================

/**
 * Interface que representa um estudante
 * Compatível com o schema do Prisma e MongoDB
 */
export interface Student {
  id: string // ObjectId do MongoDB (gerado automaticamente)
  name: string
  email: string
  registration: string
  course: string
  isActive: boolean
  createdAt: Date | string // Aceita tanto Date quanto string para flexibilidade
  updatedAt: Date | string
}
```

---

### 2.2 Explicação Linha por Linha

#### **Linhas 1-3: Comentário de Cabeçalho**

```typescript
// ========================================
// TIPO DO ESTUDANTE (COMPATÍVEL COM PRISMA E MONGODB)
// ========================================
```

**O que faz:**

- Comentário decorativo que marca o início do arquivo
- Informa que este arquivo define o tipo "Estudante"
- Menciona compatibilidade com Prisma (ORM) e MongoDB (banco de dados)

**Por que é importante:**

- Ajuda a identificar rapidamente o propósito do arquivo
- Indica tecnologias relacionadas (Prisma e MongoDB)

---

#### **Linhas 5-8: Comentário de Documentação JSDoc**

```typescript
/**
 * Interface que representa um estudante
 * Compatível com o schema do Prisma e MongoDB
 */
```

**O que faz:**

- Comentário especial em formato JSDoc (com `/**` e `*/`)
- Documenta o que a interface `Student` representa
- Aparece no IntelliSense/autocomplete do VS Code

**Por que é importante:**

- Quando você passar o mouse sobre `Student` no código, verá esta descrição
- Ajuda outros programadores a entenderem o código
- Ferramentas de documentação automática usam estes comentários

**Exemplo prático:**
Ao digitar `const aluno: Student`, o VS Code mostrará:

```
(interface) Student
Interface que representa um estudante
Compatível com o schema do Prisma e MongoDB
```

---

#### **Linha 9: Declaração da Interface**

```typescript
export interface Student {
```

**O que faz:**

- `export`: Permite que outros arquivos importem esta interface
- `interface`: Palavra-chave do TypeScript para definir estrutura de dados
- `Student`: Nome da interface (sempre em PascalCase)

**Conceitos importantes:**

| Palavra-chave | O que faz                                  | Exemplo de uso                                     |
| ------------- | ------------------------------------------ | -------------------------------------------------- |
| `export`      | Torna disponível para outros arquivos      | `import { Student } from './models'`               |
| `interface`   | Define um "contrato" de estrutura de dados | Garante que objetos tenham certos campos           |
| `Student`     | Nome identificador                         | Usado para tipar variáveis: `const aluno: Student` |

**Por que é importante:**

- Sem `export`, outros arquivos não poderiam usar `Student`
- `interface` não vira código JavaScript (é só para TypeScript)
- O nome `Student` é descritivo e segue convenções (singular, inglês)

---

#### **Linha 10: Campo id**

```typescript
id: string // ObjectId do MongoDB (gerado automaticamente)
```

**O que faz:**

- Define que todo estudante tem um campo `id`
- O tipo é `string` (texto)
- Comentário explica que é um ObjectId do MongoDB

**Conceitos importantes:**

1. **ObjectId do MongoDB:**
   - Identificador único gerado automaticamente pelo banco
   - Formato: `"507f1f77bcf86cd799439011"` (24 caracteres hexadecimais)
   - Garante que cada estudante tenha um ID único no mundo

2. **Por que string e não number?**
   - ObjectId é uma sequência de caracteres, não um número
   - MongoDB gera IDs complexos que não são números simples

**Exemplo prático:**

```typescript
const student: Student = {
  id: '507f1f77bcf86cd799439011', // ✅ Correto
  // id: 123, // ❌ Erro: número não é permitido
  // ...outros campos
}
```

---

#### **Linha 11: Campo name**

```typescript
name: string
```

**O que faz:**

- Define que todo estudante tem um campo `name` (nome)
- O tipo é `string` (texto)

**Por que é importante:**

- Campo obrigatório (não tem `?` depois do nome)
- Todo estudante DEVE ter um nome
- TypeScript vai reclamar se você tentar criar um estudante sem nome

**Exemplo prático:**

```typescript
// ✅ Correto
const student1: Student = {
  id: '...',
  name: 'João Silva', // Nome presente
  // ...outros campos
}

// ❌ Erro: Property 'name' is missing
const student2: Student = {
  id: '...',
  // name está faltando!
}
```

---

#### **Linha 12: Campo email**

```typescript
email: string
```

**O que faz:**

- Define que todo estudante tem um campo `email`
- O tipo é `string` (texto)

**Observações importantes:**

- A interface não valida o formato do email (apenas diz que é texto)
- A validação de formato ("tem @?", "é válido?") é feita na camada de Service
- É campo obrigatório

**Exemplo de validação (feita em outro lugar):**

```typescript
// Em student.service.ts (não aqui!)
if (!email.includes('@')) {
  throw new Error('Email inválido')
}
```

---

#### **Linha 13: Campo registration**

```typescript
registration: string
```

**O que faz:**

- Define o campo `registration` (matrícula)
- O tipo é `string` (texto)

**Por que string e não number?**

Matrículas geralmente contêm:

- Zeros à esquerda: `"00123"` (que seria `123` como número)
- Letras: `"2024-ADS-001"`
- Hífens: `"2024-001"`

**Exemplo prático:**

```typescript
const student: Student = {
  // ...
  registration: '2024-001', // ✅ Correto
  // registration: 2024001, // ❌ Número não é permitido
}
```

---

#### **Linha 14: Campo course**

```typescript
course: string
```

**O que faz:**

- Define o campo `course` (curso)
- O tipo é `string` (texto)

**Exemplos de valores:**

- `"Técnico em Informática"`
- `"Técnico em Eletrotécnica"`
- `"Técnico em Agropecuária"`

**Possível melhoria futura:**

```typescript
// Limitar os cursos possíveis usando Union Types
type Course = 'Informática' | 'Eletrotécnica' | 'Agropecuária'

export interface Student {
  // ...
  course: Course // Agora só aceita estes 3 valores
}
```

---

#### **Linha 15: Campo isActive**

```typescript
isActive: boolean
```

**O que faz:**

- Define o campo `isActive` (está ativo?)
- O tipo é `boolean` (verdadeiro ou falso)

**Conceitos importantes:**

| Valor   | Significado       | Quando usar                                   |
| ------- | ----------------- | --------------------------------------------- |
| `true`  | Estudante ativo   | Está matriculado normalmente                  |
| `false` | Estudante inativo | Trancou matrícula, formou-se, foi transferido |

**Por que não deletar o estudante?**

- Precisamos manter histórico
- Pode reativar no futuro
- Relatórios precisam dos dados antigos

**Exemplo prático:**

```typescript
// Desativar estudante que trancou matrícula
await studentService.update('507f...', {
  isActive: false,
})

// Buscar apenas estudantes ativos
const activeStudents = students.filter((s) => s.isActive === true)
```

---

#### **Linha 16: Campo createdAt**

```typescript
createdAt: Date | string // Aceita tanto Date quanto string para flexibilidade
```

**O que faz:**

- Define o campo `createdAt` (criado em)
- Aceita dois tipos: `Date` (objeto de data) OU `string` (texto)
- O símbolo `|` significa "OU" (Union Type)

**Por que aceitar dois tipos?**

1. **MongoDB retorna string:**

   ```json
   {
     "createdAt": "2024-10-23T14:30:00.000Z"
   }
   ```

2. **JavaScript usa Date:**

   ```javascript
   const now = new Date() // Objeto Date
   ```

3. **Flexibilidade:**
   - Prisma pode retornar Date ou string dependendo da configuração
   - Podemos converter entre os formatos facilmente

**Exemplo prático:**

```typescript
const student: Student = {
  // ...
  createdAt: new Date(), // ✅ Date object
  // OU
  createdAt: '2024-10-23T14:30:00.000Z', // ✅ String ISO
}

// Converter de string para Date quando necessário
const date = new Date(student.createdAt)
```

---

#### **Linha 17: Campo updatedAt**

```typescript
updatedAt: Date | string
```

**O que faz:**

- Define o campo `updatedAt` (atualizado em)
- Mesmo comportamento do `createdAt`
- Registra quando o estudante foi modificado pela última vez

**Diferença entre createdAt e updatedAt:**

| Campo       | Quando é definido   | Quando muda                       |
| ----------- | ------------------- | --------------------------------- |
| `createdAt` | Ao criar o registro | NUNCA (permanece fixo)            |
| `updatedAt` | Ao criar o registro | TODA VEZ que o registro é editado |

**Exemplo prático:**

```typescript
// 23/10/2024 10:00 - Criação
{
  id: "507f...",
  name: "João Silva",
  createdAt: "2024-10-23T10:00:00Z",
  updatedAt: "2024-10-23T10:00:00Z" // Iguais na criação
}

// 25/10/2024 15:30 - Atualização do email
{
  id: "507f...",
  name: "João Silva",
  email: "joao.novo@email.com", // Mudou
  createdAt: "2024-10-23T10:00:00Z", // NÃO mudou
  updatedAt: "2024-10-25T15:30:00Z" // Mudou!
}
```

---

#### **Linha 18: Fechamento da Interface**

```typescript
}
```

**O que faz:**

- Fecha o bloco da interface `Student`
- Indica o fim da definição

---

### 2.3 Visão Geral do Student

**Resumo da estrutura:**

```typescript
interface Student {
  // Identificação
  id: string // ID único do MongoDB

  // Dados pessoais
  name: string // Nome completo
  email: string // Email para contato

  // Dados acadêmicos
  registration: string // Matrícula única
  course: string // Curso matriculado

  // Estado
  isActive: boolean // Ativo ou inativo

  // Timestamps (carimbos de tempo)
  createdAt: Date | string // Quando foi criado
  updatedAt: Date | string // Última modificação
}
```

---

## 3. Arquivo: Teacher.ts

### 3.1 Código Completo

```typescript
// ========================================
// TIPO DO PROFESSOR (COMPATÍVEL COM PRISMA E MONGODB)
// ========================================

/**
 * Interface que representa um professor
 * Compatível com o schema do Prisma e MongoDB
 */
export interface Teacher {
  id: string // ObjectId do MongoDB (gerado automaticamente)
  name: string
  email: string
  subject: string // Disciplina que leciona
  isActive: boolean
  createdAt: Date | string // Aceita tanto Date quanto string para flexibilidade
  updatedAt: Date | string
}
```

---

### 3.2 Comparação: Student vs Teacher

| Campo          | Student | Teacher | Diferença                     |
| -------------- | ------- | ------- | ----------------------------- |
| `id`           | ✅      | ✅      | Igual                         |
| `name`         | ✅      | ✅      | Igual                         |
| `email`        | ✅      | ✅      | Igual                         |
| `registration` | ✅      | ❌      | Só estudantes têm matrícula   |
| `course`       | ✅      | ❌      | Só estudantes têm curso       |
| `subject`      | ❌      | ✅      | Só professores têm disciplina |
| `isActive`     | ✅      | ✅      | Igual                         |
| `createdAt`    | ✅      | ✅      | Igual                         |
| `updatedAt`    | ✅      | ✅      | Igual                         |

---

### 3.3 Campo Exclusivo: subject

```typescript
subject: string // Disciplina que leciona
```

**O que faz:**

- Define qual disciplina o professor leciona
- Tipo `string` (texto)
- Campo obrigatório

**Exemplos de valores:**

- `"Programação"`
- `"Banco de Dados"`
- `"Redes de Computadores"`
- `"Matemática"`

**Exemplo prático:**

```typescript
const teacher: Teacher = {
  id: '507f1f77bcf86cd799439012',
  name: 'Prof. Maria Santos',
  email: 'maria.santos@ifms.edu.br',
  subject: 'Programação', // Disciplina
  isActive: true,
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: '2024-01-15T08:00:00Z',
}
```

---

### 3.4 Por que não há campo registration em Teacher?

**Motivo:** Professores não têm matrícula como alunos, mas poderiam ter:

- CPF
- SIAPE (registro de servidor público)
- Registro profissional

**Possível evolução:**

```typescript
export interface Teacher {
  // ...campos atuais
  siape?: string // Campo opcional (veja o ?)
  department?: string // Departamento
}
```

---

## 4. Arquivo: index.ts

### 4.1 Código Completo

```typescript
// ========================================
// EXPORTAR TIPOS E INTERFACES
// ========================================

// Exportar todos os tipos (Student, CreateStudentDto, etc.)
// export * from './types'

// Exportar interfaces dos modelos
export { Student } from './Student'
export { Teacher } from './Teacher'
```

---

### 4.2 Explicação Linha por Linha

#### **Linhas 1-3: Comentário de Cabeçalho**

```typescript
// ========================================
// EXPORTAR TIPOS E INTERFACES
// ========================================
```

**O que faz:**

- Marca o propósito do arquivo: centralizar exportações
- Organização visual do código

---

#### **Linhas 5-6: Exportação Comentada**

```typescript
// Exportar todos os tipos (Student, CreateStudentDto, etc.)
// export * from './types'
```

**O que faz:**

- Código comentado (não está ativo)
- Mostra que existia/existirá um arquivo `types.ts`
- `export * from` significa "exportar tudo que vem de"

**Por que está comentado?**

- O arquivo `types.ts` pode não existir ainda
- Preparação para evolução futura do projeto
- Documentação de possibilidade

---

#### **Linhas 8-10: Exportações Ativas**

```typescript
// Exportar interfaces dos modelos
export { Student } from './Student'
export { Teacher } from './Teacher'
```

**O que faz:**

- `export { Student }`: Exporta a interface Student
- `from './Student'`: Vem do arquivo Student.ts
- `export { Teacher }`: Exporta a interface Teacher
- `from './Teacher'`: Vem do arquivo Teacher.ts

**Por que isso é útil?**

Permite importar de forma limpa em outros arquivos:

```typescript
// ✅ ANTES (com index.ts) - FORMA LIMPA
import { Student, Teacher } from './models'

// ❌ SEM index.ts - FORMA VERBOSA
import { Student } from './models/Student'
import { Teacher } from './models/Teacher'
```

---

### 4.3 Conceito: Barrel Export

O arquivo `index.ts` implementa o padrão **Barrel Export**.

**O que é Barrel Export?**

- "Barril" que agrupa várias exportações
- Simplifica imports em outros arquivos
- Centraliza a API pública de uma pasta

**Analogia:**
Imagine uma loja:

- **Sem Barrel**: Você precisa ir em cada prateleira buscar cada produto
- **Com Barrel**: Você pede no balcão e eles trazem tudo junto

**Estrutura visual:**

```
src/models/
├── index.ts         ← 🛢️ "Barril" que centraliza tudo
├── Student.ts       ← 📦 Interface Student
└── Teacher.ts       ← 📦 Interface Teacher

Outros arquivos importam de: './models'
                   (aponta para index.ts automaticamente)
```

---

### 4.4 Como o Node.js Resolve Imports

Quando você escreve:

```typescript
import { Student } from './models'
```

O Node.js procura **nesta ordem**:

1. `./models.ts` ← Não existe
2. `./models.tsx` ← Não existe
3. `./models/index.ts` ← **✅ ENCONTROU!**

Por isso funciona sem precisar escrever `./models/index`!

---

## 5. Conceitos Importantes

### 5.1 Interface vs Type vs Class

**Comparação:**

| Característica            | Interface | Type     | Class      |
| ------------------------- | --------- | -------- | ---------- |
| Define estrutura de dados | ✅        | ✅       | ✅         |
| Gera código JavaScript    | ❌        | ❌       | ✅         |
| Pode ter métodos          | ❌        | ❌       | ✅         |
| Usado para tipagem        | ✅        | ✅       | Parcial    |
| Performance de compilação | Rápida    | Rápida   | Mais lenta |
| Pode ser estendida        | ✅        | Limitado | ✅         |

**Por que usamos Interface?**

1. Não vira código JavaScript (arquivo final menor)
2. Sintaxe mais limpa para objetos
3. Melhor para definir "contratos" de dados
4. Convenção em projetos TypeScript

---

### 5.2 Union Types (Tipo | Tipo)

**Sintaxe:**

```typescript
createdAt: Date | string
```

**O que significa:**

- O campo aceita `Date` **OU** `string`
- Símbolo `|` = operador "OU"

**Exemplo prático:**

```typescript
let data: Date | string

data = new Date() // ✅ Ok
data = '2024-10-23' // ✅ Ok
data = 123 // ❌ Erro: number não é permitido
```

**Quando usar:**

- Dados que vêm de fontes diferentes (API, banco, etc.)
- Flexibilidade na manipulação de dados
- Conversões entre formatos

---

### 5.3 Convenções de Nomenclatura

**PascalCase (Primeira letra maiúscula):**

- Interfaces: `Student`, `Teacher`, `Course`
- Classes: `StudentService`, `DatabaseConnection`
- Types: `StudentData`, `ApiResponse`

**camelCase (primeira letra minúscula):**

- Variáveis: `studentName`, `isActive`, `createdAt`
- Funções: `findAll()`, `create()`, `update()`
- Propriedades: `name`, `email`, `subject`

**UPPER_SNAKE_CASE (tudo maiúsculo):**

- Constantes: `MAX_STUDENTS`, `API_URL`, `DEFAULT_COURSE`

**kebab-case (com hífens):**

- Nomes de arquivos: `student.service.ts`, `error.middleware.ts`
- URLs: `/api/students`, `/api/teachers`

---

### 5.4 Campos Opcionais vs Obrigatórios

**Obrigatório (sem ?):**

```typescript
interface Student {
  name: string // DEVE existir
}

// ❌ Erro
const student: Student = {} // Property 'name' is missing
```

**Opcional (com ?):**

```typescript
interface Student {
  name?: string // PODE não existir
}

// ✅ Ok
const student: Student = {} // name pode estar ausente
```

**Quando usar opcional?**

- Dados que nem sempre existem
- Campos que podem ser adicionados depois
- Informações complementares

**Exemplo prático:**

```typescript
interface Teacher {
  name: string // Obrigatório
  email: string // Obrigatório
  subject: string // Obrigatório
  phone?: string // Opcional (nem todo mundo fornece)
  bio?: string // Opcional (pode ser preenchido depois)
}
```

---

### 5.5 Tipos Primitivos do TypeScript

| Tipo        | Descrição        | Exemplos                               |
| ----------- | ---------------- | -------------------------------------- |
| `string`    | Texto            | `"João"`, `"teste@email.com"`, `""`    |
| `number`    | Número           | `42`, `3.14`, `-10`, `0`               |
| `boolean`   | Verdadeiro/Falso | `true`, `false`                        |
| `Date`      | Data/Hora        | `new Date()`, `new Date("2024-10-23")` |
| `any`       | Qualquer coisa   | (evitar usar!)                         |
| `unknown`   | Desconhecido     | Mais seguro que `any`                  |
| `void`      | Sem retorno      | Usado em funções que não retornam nada |
| `null`      | Nulo             | `null`                                 |
| `undefined` | Indefinido       | `undefined`                            |

---

### 5.6 ObjectId do MongoDB

**O que é?**

- Identificador único de 12 bytes (24 caracteres hexadecimais)
- Gerado automaticamente pelo MongoDB
- Contém timestamp de criação embutido

**Formato:**

```
507f1f77bcf86cd799439011
│││││││││││││││││││││││└─ Contador (3 bytes)
│││││││││││││││││││││└─── Identificador de processo (2 bytes)
│││││││││││└─────────────── Identificador de máquina (3 bytes)
└───────────────────────── Timestamp Unix (4 bytes)
```

**Vantagens:**

- Único globalmente (não só no banco)
- Contém timestamp (sabe quando foi criado)
- Não precisa de autoincremento
- Funciona em sistemas distribuídos

**Conversão para Date:**

```typescript
import { ObjectId } from 'mongodb'

const id = new ObjectId('507f1f77bcf86cd799439011')
const timestamp = id.getTimestamp() // Retorna Date
console.log(timestamp) // 2012-10-17T20:46:22.000Z
```

---

## 6. Exercícios Práticos (opcional)

### 6.1 Exercício 1: Criar Interface Course

**Objetivo:** Criar uma nova interface para representar cursos.

**Requisitos:**

- `id`: string (ObjectId)
- `name`: string (nome do curso)
- `code`: string (código do curso, ex: "TEC-INFO")
- `duration`: number (duração em semestres)
- `isActive`: boolean
- `createdAt`: Date | string
- `updatedAt`: Date | string

**Dica:** Use Student.ts como modelo.

<details>
<summary>💡 Ver solução</summary>

```typescript
// ========================================
// TIPO DO CURSO (COMPATÍVEL COM PRISMA E MONGODB)
// ========================================

/**
 * Interface que representa um curso
 * Compatível com o schema do Prisma e MongoDB
 */
export interface Course {
  id: string // ObjectId do MongoDB (gerado automaticamente)
  name: string
  code: string
  duration: number // Duração em semestres
  isActive: boolean
  createdAt: Date | string // Aceita tanto Date quanto string para flexibilidade
  updatedAt: Date | string
}
```

**Não esqueça de:**

1. Criar arquivo `Course.ts` em `src/models/`
2. Adicionar exportação em `index.ts`: `export { Course } from './Course'`

</details>

---

### 6.2 Exercício 2: Adicionar Campos Opcionais

**Objetivo:** Modificar `Student` para incluir campos opcionais.

**Adicionar:**

- `phone?`: string (telefone)
- `address?`: string (endereço)
- `birthDate?`: Date | string (data de nascimento)

<details>
<summary>💡 Ver solução</summary>

```typescript
export interface Student {
  id: string
  name: string
  email: string
  registration: string
  course: string
  isActive: boolean
  createdAt: Date | string
  updatedAt: Date | string

  // Campos opcionais
  phone?: string
  address?: string
  birthDate?: Date | string
}
```

**Agora você pode criar estudantes assim:**

```typescript
// ✅ Sem campos opcionais
const student1: Student = {
  id: '...',
  name: 'João',
  email: 'joao@email.com',
  registration: '2024001',
  course: 'Informática',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

// ✅ Com campos opcionais
const student2: Student = {
  ...student1,
  phone: '(67) 99999-9999',
  address: 'Rua XYZ, 123',
  birthDate: '2005-03-15',
}
```

</details>

---

### 6.3 Exercício 3: Criar Type Helpers

**Objetivo:** Criar types auxiliares para operações comuns.

**Criar:**

1. `CreateStudentData`: Student sem `id`, `createdAt`, `updatedAt`
2. `UpdateStudentData`: Todos os campos opcionais exceto `id`

<details>
<summary>💡 Ver solução</summary>

```typescript
// Em Student.ts ou types.ts

/**
 * Dados necessários para criar um estudante
 * Não inclui campos gerados automaticamente
 */
export type CreateStudentData = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>

/**
 * Dados que podem ser atualizados em um estudante
 * Todos os campos são opcionais
 */
export type UpdateStudentData = Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>

// USO:
const newStudent: CreateStudentData = {
  name: 'João Silva',
  email: 'joao@email.com',
  registration: '2024001',
  course: 'Informática',
  isActive: true,
  // ✅ Não precisa de id, createdAt, updatedAt
}

const updates: UpdateStudentData = {
  email: 'novo@email.com',
  // ✅ Apenas os campos que você quer mudar
}
```

**Utility Types utilizados:**

- `Omit<T, K>`: Remove as propriedades K do tipo T
- `Partial<T>`: Torna todas as propriedades opcionais

</details>

---

### 6.4 Exercício 4: Validar Dados com Type Guards

**Objetivo:** Criar função que verifica se um objeto é um Student válido.

<details>
<summary>💡 Ver solução</summary>

```typescript
/**
 * Verifica se um objeto possui a estrutura de Student
 * Type Guard: função que valida e informa ao TypeScript o tipo
 */
export function isStudent(obj: any): obj is Student {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.registration === 'string' &&
    typeof obj.course === 'string' &&
    typeof obj.isActive === 'boolean' &&
    (obj.createdAt instanceof Date || typeof obj.createdAt === 'string') &&
    (obj.updatedAt instanceof Date || typeof obj.updatedAt === 'string')
  )
}

// USO:
const data: any = JSON.parse(someJsonString)

if (isStudent(data)) {
  // ✅ TypeScript sabe que 'data' é Student aqui
  console.log(data.name) // Autocomplete funciona!
} else {
  console.error('Dados inválidos')
}
```

</details>

---

### 6.5 Exercício 5: Relacionamentos Entre Entidades

**Objetivo:** Modificar Student para ter relacionamento com Course.

**Antes:**

```typescript
course: string // Nome do curso como texto
```

**Depois:**

```typescript
courseId: string // ID do curso (relacionamento)
course?: Course // Curso completo (opcional, carregado quando necessário)
```

<details>
<summary>💡 Ver solução</summary>

```typescript
import { Course } from './Course'

export interface Student {
  id: string
  name: string
  email: string
  registration: string

  // Relacionamento
  courseId: string // FK (Foreign Key) para Course
  course?: Course // Populate/Include opcional

  isActive: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

// USO:

// Apenas o ID do curso (mais leve)
const student1: Student = {
  id: '...',
  name: 'João',
  courseId: '507f1f77bcf86cd799439011', // Referência
  // ...outros campos
}

// Com curso populado (mais pesado, mas completo)
const student2: Student = {
  id: '...',
  name: 'João',
  courseId: '507f1f77bcf86cd799439011',
  course: {
    // Objeto Course completo
    id: '507f1f77bcf86cd799439011',
    name: 'Técnico em Informática',
    code: 'TEC-INFO',
    duration: 3,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  // ...outros campos
}
```

</details>

---

## 7. Perguntas Frequentes

### 7.1 Por que usar TypeScript em vez de JavaScript?

**JavaScript:**

```javascript
const student = {
  name: 'João',
  email: 'joao@email.com',
}

student.nome // undefined (erro silencioso!)
```

**TypeScript:**

```typescript
const student: Student = {
  name: 'João',
  email: 'joao@email.com',
}

student.nome // ❌ ERRO: Property 'nome' does not exist
// Você quis dizer 'name'?
```

**Vantagens:**

- Detecta erros antes de executar
- Autocomplete/IntelliSense
- Documentação automática
- Refatoração segura

---

### 7.2 Interface pode ter métodos?

**Resposta:** Sim, mas neste projeto usamos interfaces apenas para dados.

**Exemplo com métodos:**

```typescript
interface Student {
  name: string
  email: string

  // Métodos
  getFullName(): string
  isEmailValid(): boolean
}
```

**Por que não usamos métodos aqui?**

- Seguimos paradigma funcional (funções puras fora das interfaces)
- Interfaces são "contratos de dados", não comportamento
- Métodos iriam virar código JavaScript (aumentando tamanho do arquivo)

---

### 7.3 Posso criar um Student sem todos os campos?

**Resposta:** Não, se você declarou como `Student`.

```typescript
// ❌ ERRO
const student: Student = {
  name: 'João',
} // Falta email, registration, etc.

// ✅ CORRETO: Use Partial
const partialStudent: Partial<Student> = {
  name: 'João',
} // Todos os campos são opcionais agora

// ✅ CORRETO: Use CreateStudentData
const newStudent: CreateStudentData = {
  name: 'João Silva',
  email: 'joao@email.com',
  registration: '2024001',
  course: 'Informática',
  isActive: true,
} // Não precisa de id, createdAt, updatedAt
```

---

### 7.4 Como converter string para Date?

**Opção 1: Constructor do Date**

```typescript
const dateString = '2024-10-23T14:30:00.000Z'
const date = new Date(dateString)

console.log(date.getFullYear()) // 2024
console.log(date.getMonth() + 1) // 10 (meses começam em 0!)
console.log(date.getDate()) // 23
```

**Opção 2: Bibliotecas (date-fns, dayjs)**

```typescript
import { format, parseISO } from 'date-fns'

const dateString = '2024-10-23T14:30:00.000Z'
const date = parseISO(dateString)
const formatted = format(date, 'dd/MM/yyyy') // "23/10/2024"
```

---

### 7.5 ObjectId é obrigatório usar string?

**Resposta:** No TypeScript sim, mas depende da biblioteca.

**Com Prisma (nosso caso):**

```typescript
// Prisma retorna ObjectId como string
id: string // "507f1f77bcf86cd799439011"
```

**Com mongodb nativo:**

```typescript
import { ObjectId } from 'mongodb'

interface Student {
  _id: ObjectId // Objeto ObjectId
  name: string
}
```

**Com mongoose:**

```typescript
import { Types } from 'mongoose'

interface Student {
  _id: Types.ObjectId
  name: string
}
```

**Nossa escolha:** `string` porque:

- Prisma abstrai ObjectId
- Mais simples para iniciantes
- Funciona em JSON (ObjectId não serializa)
- Compatível com APIs REST

---

### 7.6 Posso ter interface dentro de interface?

**Resposta:** Sim! (composição)

**Exemplo:**

```typescript
interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

interface Student {
  id: string
  name: string
  email: string
  address: Address // Interface aninhada
}

// USO:
const student: Student = {
  id: '...',
  name: 'João',
  email: 'joao@email.com',
  address: {
    street: 'Rua das Flores, 123',
    city: 'Campo Grande',
    state: 'MS',
    zipCode: '79000-000',
  },
}
```

---

### 7.7 Diferença entre export e export default?

**export (named export):**

```typescript
// Student.ts
export interface Student { ... }

// Outro arquivo
import { Student } from './Student' // ✅ Nome exato
import { Student as Aluno } from './Student' // ✅ Pode renomear
```

**export default:**

```typescript
// Student.ts
export default interface Student { ... }

// Outro arquivo
import Student from './Student' // ✅ Pode usar qualquer nome
import Aluno from './Student' // ✅ Também funciona
```

**Nossa escolha:** `export` porque:

- Força usar o nome correto
- Melhor para autocomplete
- Permite múltiplas exportações
- Convenção mais comum em TypeScript

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MongoDB ObjectId](https://www.mongodb.com/docs/manual/reference/method/ObjectId/)
- [Prisma Docs](https://www.prisma.io/docs)

### Tutoriais Recomendados

- [TypeScript para Iniciantes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Interfaces vs Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

### Ferramentas Úteis

- [TypeScript Playground](https://www.typescriptlang.org/play) - Testar código online
- [JSON to TypeScript](https://transform.tools/json-to-typescript) - Gerar interfaces de JSON

---

## 🎓 Conclusão

Nesta apostila você aprendeu:

✅ O que são Models e por que são importantes  
✅ Estrutura das interfaces `Student` e `Teacher`  
✅ Como o arquivo `index.ts` organiza exportações  
✅ Conceitos de TypeScript (interface, union types, optional fields)  
✅ Convenções de nomenclatura  
✅ ObjectId do MongoDB  
✅ Type Guards e Type Helpers  
✅ Relacionamentos entre entidades

**Próximos passos:**

1. Praticar os exercícios
2. Criar sua própria interface (Course, Enrollment, etc.)
3. Estudar a camada de Services (student.service.ts)
4. Entender como o Prisma usa essas interfaces

---

## 👨‍🏫 Para o Professor

### Sugestões de Aulas

**Aula 1 (2h): Introdução aos Models**

- Apresentar conceito de Model
- Explicar Student.ts linha por linha
- Exercício: Criar interface Person

**Aula 2 (2h): Tipos Avançados**

- Union Types
- Optional Fields
- Campos opcionais vs obrigatórios
- Exercício: Adicionar campos em Teacher

**Aula 3 (2h): Organização e Exportação**

- Barrel exports (index.ts)
- Named exports vs default
- Exercício: Criar pasta models2 com novos types

**Aula 4 (2h): Relacionamentos**

- Foreign Keys
- Interface aninhada
- Type Helpers (Omit, Partial)
- Exercício: Relacionar Student com Course

### Avaliação Sugerida

1. Criar 3 interfaces novas (Course, Enrollment, Grade) - 4 pts
2. Implementar type helpers (Create, Update) - 3 pts
3. Criar type guard para validação - 2 pts
4. Documentar com comentários JSDoc - 1 pt

---

**📅 Última atualização:** Outubro/2024  
**✍️ Autor:** Material didático IFMS  
**📧 Dúvidas:** Consulte seu professor
