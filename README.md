# 🎓 API de Estudantes e Professores# 🎓 API de Estudantes e Professores

> **Projeto Didático com Arquitetura Genérica** > **Projeto Didático com Arquitetura Genérica**

> Desenvolvido para ensino médio técnico em informática> Desenvolvido para ensino médio técnico em informática

[![Status](https://img.shields.io/badge/Status-✅_Funcionando-success)]()[![Status](https://img.shields.io/badge/Status-✅_Funcionando-success)]()

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)]()[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)]()

[![Node](https://img.shields.io/badge/Node.js-22.x-green)]()[![Node](https://img.shields.io/badge/Node.js-22.x-green)]()

[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)]()[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)]()

[![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748)]()[![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748)]()

---

## 📋 O Que É Este Projeto?## 📋 O Que É Este Projeto?

Uma **API RESTful** educacional que demonstra:Uma **API RESTful** educacional que demonstra:

- ✅ **Arquitetura em 3 camadas** (Controller → Service → Persistence)- ✅ **Arquitetura em 3 camadas** (Controller → Service → Persistence)

- ✅ **Código genérico reutilizável** (DRY principle)- ✅ **Código genérico reutilizável** (DRY principle)

- ✅ **TypeScript Generics** para reduzir duplicação- ✅ **TypeScript Generics** para reduzir duplicação

- ✅ **CRUD completo** para Estudantes e Professores- ✅ **CRUD completo** para Estudantes e Professores

- ✅ **Padrão funcional** (sem classes, apenas funções)- ✅ **Padrão funcional** (sem classes, apenas funções)

- ✅ **Validações de negócio** (email único, matrícula única)- ✅ **Validações de negócio** (email único, matrícula única)

- ✅ **MongoDB com Prisma ORM**- ✅ **MongoDB com Prisma ORM**

---

## 🏗️ Arquitetura em 3 Camadas## 🏗️ Arquitetura em 3 Camadas

```

┌─────────────────────────────────────────────┐┌─────────────────────────────────────────────┐

│         CONTROLLER LAYER                    ││         CONTROLLER LAYER                    │

│  (student.controller, teacher.controller)   ││  (student.controller, teacher.controller)   │

│  - Recebe requisições HTTP                  ││  - Recebe requisições HTTP                  │

│  - Retorna respostas JSON                   ││  - Retorna respostas JSON                   │

└─────────────────────────────────────────────┘└─────────────────────────────────────────────┘

                    ↓                    ↓

┌─────────────────────────────────────────────┐┌─────────────────────────────────────────────┐

│          SERVICE LAYER                      ││          SERVICE LAYER                      │

│  (student.service, teacher.service)         ││  (student.service, teacher.service)         │

│  - Validações de regras de negócio          ││  - Validações de regras de negócio          │

│  - Usa persistence.service genérico         ││  - Lógica de aplicação                      │

└─────────────────────────────────────────────┘└─────────────────────────────────────────────┘

                    ↓                    ↓

┌─────────────────────────────────────────────┐┌─────────────────────────────────────────────┐

│     PERSISTENCE LAYER (GENERIC)             ││       PERSISTENCE LAYER (GENERIC)           │

│  (persistence.service - REUTILIZÁVEL!)      ││  (persistence.service - REUTILIZÁVEL)       │

│  - findAll<T>(), create<T>(), etc.         ││  - Operações CRUD genéricas                 │

│  - Usado por TODOS os services              ││  - Acesso ao banco de dados                 │

└─────────────────────────────────────────────┘└─────────────────────────────────────────────┘

                    ↓                    ↓

┌─────────────────────────────────────────────┐┌─────────────────────────────────────────────┐

│           DATABASE                          ││           DATABASE                          │

│  (MongoDB via Prisma)                       ││  (MongoDB via Prisma)                       │

└─────────────────────────────────────────────┘└─────────────────────────────────────────────┘

```

---````

## 💡 Destaque: Código Genérico ReutilizávelController → Service → Persistence → Database📖 **Veja o resultado completo dos testes:** [RESULTADO_TESTES.md](./RESULTADO_TESTES.md)

### 🎯 Problema Resolvido: Zero Duplicação!```📊 **Status detalhado do projeto:** [STATUS_PROJETO.md](./STATUS_PROJETO.md)

Antigamente, cada entidade (Student, Teacher) tinha seu próprio arquivo de persistência com **80-90% de código duplicado**. Agora, usamos **um único arquivo genérico**!

#### ❌ Antes (Duplicado)### 1️⃣ Controller (Recebe HTTP, Retorna JSON)---

````typescript

// student-persistence.service.ts (87 linhas)```typescript

export async function findAll() {

  return await db.student.findMany({ orderBy: { name: 'asc' } })---

}

export async function create(data) {## 💡 Destaque: Código Genérico Reutilizável

  return await db.student.create({ data })

}### 🎯 Problema Resolvido: Zero Duplicação!

// ... mais 80 linhas

Antigamente, cada entidade (Student, Teacher) tinha seu próprio arquivo de persistência com **80% de código duplicado**. Agora, usamos **um único arquivo genérico**!

// teacher-persistence.service.ts (87 linhas) - MESMO CÓDIGO!

export async function findAll() {### ✅ Antes (Duplicado)

  return await db.teacher.findMany({ orderBy: { name: 'asc' } })```typescript

}// student-persistence.service.ts (87 linhas)

export async function create(data) {export async function findAll() {

  return await db.teacher.create({ data })  return await db.student.findMany({ orderBy: { name: 'asc' } })

}}

// ... mais 80 linhas duplicadas

```// teacher-persistence.service.ts (87 linhas) - MESMO CÓDIGO!

export async function findAll() {

#### ✅ Agora (Genérico - 0% Duplicação)  return await db.teacher.findMany({ orderBy: { name: 'asc' } })

```typescript}

// persistence.service.ts - UMA VEZ, USADO POR TODOS!```

export async function findAll<T>(model: any, orderBy = 'name'): Promise<T[]> {

  return await model.findMany({ orderBy: { [orderBy]: 'asc' } })### ✅ Agora (Genérico)

}```typescript

// persistence.service.ts - UMA VEZ, USADO POR TODOS!

export async function create<T>(model: any, data: any): Promise<T> {export async function findAll<T>(model: any, orderBy = 'name'): Promise<T[]> {

  return await model.create({ data })  return await model.findMany({ orderBy: { [orderBy]: 'asc' } })

}}



export async function fieldExists(model: any, field: string, value: any): Promise<boolean> {// student.service.ts

  const record = await model.findFirst({ where: { [field]: value } })const students = await persistence.findAll<Student>(db.student, 'name')

  return record !== null

}// teacher.service.ts

const teachers = await persistence.findAll<Teacher>(db.teacher, 'name')

// ... 7 funções genéricas que funcionam com QUALQUER modelo!```

````

**Resultado**: 0% duplicação, menos código, mais manutenível!

#### 📊 Como é Usado

```typescript---

// student.service.ts

import { db } from './database.service'## 🎯 Funcionalidades (CRUD Completo)

import * as persistence from './persistence.service'

```

export async function findAll() {

return await persistence.findAll<Student>(db.student, 'name')### 📖 [CLIQUE AQUI PARA LER A APOSTILA](./APOSTILA_INDICE.md)

// ↑ passa o modelo

}### 2️⃣ Service (Valida Regras de Negócio)

export async function create(data) {```typescript**O que você encontrará:**

// Valida se email já existe

const emailExists = await persistence.fieldExists(db.student, 'email', data.email)// student.service.ts

if (emailExists) throw new Error('Email already exists')

export async function criar(dados) {- ✅ +80 páginas de conteúdo

// Cria o estudante

return await persistence.create<Student>(db.student, data) // Valida se email já existe- ✅ +2000 linhas de código explicadas

}

if (await persistence.emailExiste(dados.email)) {- ✅ 50+ exemplos práticos

// teacher.service.ts - MESMA LÓGICA, modelo diferente!

export async function findAll() { throw new Error('Email já cadastrado')- ✅ Explicações em português

return await persistence.findAll<Teacher>(db.teacher, 'name')

// ↑ apenas muda o modelo }- ✅ Do zero ao projeto funcional

}

`````return await persistence.criar(dados)- ✅ 5 exercícios práticos



**Resultado**: }- ✅ Guia passo a passo completo

- ✅ **0% duplicação** (era 80-90%)

- ✅ **Menos arquivos** (deletamos student-persistence e teacher-persistence)```

- ✅ **Mais manutenível** (mudanças em um lugar afetam todos)

- ✅ **Mais fácil escalar** (adicionar Course? 5 minutos!)**Ideal para estudantes de ensino técnico!**



---### 3️⃣ Persistence (Acessa o Banco)



## 🎯 Funcionalidades (CRUD Completo)````typescript---



### ✅ **C**reate - Criar// student-persistence.service.ts

| Método | Rota | Descrição |

|--------|------|-----------|export async function criar(dados) {## Funcionalidades

| `POST` | `/api/students` | Criar estudante |

| `POST` | `/api/teachers` | Criar professor |  return await db.student.create({ data: dados })



### ✅ **R**ead - Ler}- Cadastro e gerenciamento de alunos

| Método | Rota | Descrição |

|--------|------|-----------|```- Cadastro e gerenciamento de turmas

| `GET` | `/api/students` | Listar todos os estudantes |

| `GET` | `/api/students/:id` | Buscar estudante por ID |- Registro de frequência por aula

| `GET` | `/api/teachers` | Listar todos os professores |

| `GET` | `/api/teachers/:id` | Buscar professor por ID |---- Relatórios de frequência por aluno e turma



### ✅ **U**pdate - Atualizar- Documentação interativa com Swagger

| Método | Rota | Descrição |

|--------|------|-----------|## 🚀 Como Executar

| `PUT` | `/api/students/:id` | Atualizar estudante |

| `PUT` | `/api/teachers/:id` | Atualizar professor |## Tecnologias Utilizadas



### ✅ **D**elete - Deletar### 1. Instale as Dependências

| Método | Rota | Descrição |

|--------|------|-----------|```bash- Node.js

| `DELETE` | `/api/students/:id` | Deletar estudante |

| `DELETE` | `/api/teachers/:id` | Deletar professor |npm install- Express



---```- TypeScript



## 🚀 Como Executar- Zod (validação)



### 1️⃣ Instale as Dependências### 2. Configure o Banco de Dados- Swagger (documentação)



```bash- ESLint e Prettier (qualidade de código)

npm install

```Crie um arquivo `.env`:



### 2️⃣ Configure o Banco de Dados```env## Estrutura do Projeto



Crie um arquivo `.env` na raiz do projeto:DATABASE_URL="mongodb://localhost:27017/sigefe"



```envPORT=3000```

DATABASE_URL="mongodb://localhost:27017/escola"

PORT=3000```src/

`````

├── config/ # Configurações do projeto

**Alternativa**: Use MongoDB Atlas (cloud gratuito):

````````env### 3. Gere o Prisma Client├── controllers/    # Controladores da aplicação

DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/escola"

``````bash├── middleware/     # Middlewares do Express



### 3️⃣ Gere o Prisma Clientnpx prisma generate├── models/         # Modelos de dados



```bash```├── routes/         # Rotas da API

npm run prisma:generate

```└── index.ts        # Ponto de entrada da aplicação



### 4️⃣ Envie o Schema para o MongoDB### 4. Execute o Seed (Dados Iniciais)```



```bash```bash

npm run prisma:push

```npm run seed## Pré-requisitos



### 5️⃣ (Opcional) Execute o Seed para Dados Iniciais````



```bash- Node.js (v14 ou superior)

npm run db:seed

```### 5. Inicie o Servidor- npm ou yarn



Isso cria 3 estudantes e 2 professores de exemplo.```bash



### 6️⃣ Inicie o Servidornpm run dev## Instalação



```bash```

npm run dev

```````bash



✅ **Servidor rodando em**: http://localhost:3000Servidor rodando em: `http://localhost:3000` 🎉# Instalar dependências



---npm install



## 📡 Testando os Endpoints---



### 🎓 **Criar um Estudante**# Configurar variáveis de ambiente



```http## 📡 Endpoints da APIcp .env.example .env

POST http://localhost:3000/api/students

Content-Type: application/json# Edite o arquivo .env conforme necessário



{### 🎓 Estudantes```

  "name": "João Silva",

  "email": "joao@email.com",

  "registration": "2024001",

  "course": "Informática",| Método | Rota | Descrição |## Executando o Projeto

  "isActive": true

}|--------|------|-----------|

````````

| `POST` | `/api/students` | Criar estudante |```bash

**Resposta (201 Created)**:

```json| `GET`|`/api/students` | Listar todos |# Modo desenvolvimento

{

"id": "507f1f77bcf86cd799439011",| `GET` | `/api/students/:id` | Buscar por ID |npm run dev

"name": "João Silva",

"email": "joao@email.com",| `PUT` | `/api/students/:id` | Atualizar |

"registration": "2024001",

"course": "Informática",| `DELETE` | `/api/students/:id` | Deletar |# Compilar TypeScript

"isActive": true,

"createdAt": "2024-10-16T10:30:00.000Z",npm run build

"updatedAt": "2024-10-16T10:30:00.000Z"

}### 👨‍🏫 Professores

````

# Executar versão compilada

### 📋 **Listar Todos os Estudantes**

| Método | Rota | Descrição |npm start

```http

GET http://localhost:3000/api/students|--------|------|-----------|```

````

| `POST` | `/api/teachers` | Criar professor |

**Resposta (200 OK)**:

```json| `GET`|`/api/teachers` | Listar todos |## Documentação da API

[

{| `GET` | `/api/teachers/:id` | Buscar por ID |

    "id": "507f1f77bcf86cd799439011",

    "name": "João Silva",| `PUT` | `/api/teachers/:id` | Atualizar |A documentação da API está disponível através do Swagger UI. Após iniciar o servidor, acesse:

    "email": "joao@email.com",

    "registration": "2024001",| `DELETE` | `/api/teachers/:id` | Deletar |

    "course": "Informática",

    "isActive": true,````

    "createdAt": "2024-10-16T10:30:00.000Z",

    "updatedAt": "2024-10-16T10:30:00.000Z"---http://localhost:3000/api-docs

}

]````

````

## 💡 Exemplos de Uso

### 🔍 **Buscar Estudante por ID**

## Endpoints Principais

```http

GET http://localhost:3000/api/students/507f1f77bcf86cd799439011### Criar um Estudante

````

````http### Alunos

### ✏️ **Atualizar Estudante**

POST http://localhost:3000/api/students

```http

PUT http://localhost:3000/api/students/507f1f77bcf86cd799439011Content-Type: application/json- `GET /api/alunos` - Listar todos os alunos

Content-Type: application/json

- `GET /api/alunos/:id` - Obter detalhes de um aluno

{

  "course": "Análise de Sistemas",{- `POST /api/alunos` - Criar novo aluno

  "isActive": true

}  "name": "João Silva",- `PUT /api/alunos/:id` - Atualizar aluno

````

"email": "joao@email.com",- `DELETE /api/alunos/:id` - Remover aluno

### 🗑️ **Deletar Estudante**

"registration": "2024001",- `POST /api/alunos/:id/turmas/:turmaId` - Adicionar aluno a uma turma

```http

DELETE http://localhost:3000/api/students/507f1f77bcf86cd799439011  "course": "Informática",- `DELETE /api/alunos/:id/turmas/:turmaId` - Remover aluno de uma turma

```

"isActive": true

**Resposta (200 OK)**:

`````json}### Turmas

{

  "message": "Student deleted successfully"````

}

```- `GET /api/turmas` - Listar todas as turmas



---### Buscar Todos os Estudantes- `GET /api/turmas/:id` - Obter detalhes de uma turma



### 👨‍🏫 **Endpoints de Professores**```http- `POST /api/turmas` - Criar nova turma



Mesma estrutura dos estudantes, apenas mude `/students` para `/teachers`:GET http://localhost:3000/api/students- `PUT /api/turmas/:id` - Atualizar turma



**Criar Professor**:```- `DELETE /api/turmas/:id` - Remover turma

```json

{- `GET /api/turmas/:id/alunos` - Listar alunos de uma turma

  "name": "Maria Santos",

  "email": "maria@email.com",### Atualizar um Estudante- `GET /api/turmas/periodo/:periodo` - Filtrar turmas por período

  "subject": "Matemática",

  "isActive": true```http- `GET /api/turmas/professor/:professor` - Filtrar turmas por professor

}

```PUT http://localhost:3000/api/students/507f1f77bcf86cd799439011



---Content-Type: application/json### Frequência



## 📂 Estrutura do Projeto{- `GET /api/frequencias` - Listar todos os registros de frequência



```"course": "Análise de Sistemas"- `GET /api/frequencias/:id` - Obter detalhes de um registro

src/

├── controllers/              # Camada de controle HTTP}- `POST /api/frequencias` - Criar novo registro de frequência

│   ├── student.controller.ts # Endpoints de estudantes

│   └── teacher.controller.ts # Endpoints de professores```- `PUT /api/frequencias/:id` - Atualizar registro

│

├── services/                 # Camada de lógica de negócio- `DELETE /api/frequencias/:id` - Remover registro

│   ├── persistence.service.ts  # ⭐ GENÉRICO - Usado por todos!

│   ├── student.service.ts      # Validações de estudantes### Deletar um Estudante- `GET /api/frequencias/turma/:turmaId` - Filtrar por turma

│   ├── teacher.service.ts      # Validações de professores

│   ├── database.service.ts     # Conexão com MongoDB```http- `GET /api/frequencias/aluno/:alunoId` - Filtrar por aluno

│   └── index.ts

│DELETE http://localhost:3000/api/students/507f1f77bcf86cd799439011- `GET /api/frequencias/data/:data` - Filtrar por data

├── models/                   # Interfaces TypeScript

│   ├── Student.ts```- `POST /api/frequencias/turma` - Registrar frequência em massa para uma turma

│   ├── Teacher.ts

│   ├── types.ts---### Relatórios

│   └── index.ts

│## 📂 Estrutura do Projeto- `GET /api/relatorios/aluno/:id` - Relatório de frequência de um aluno

├── routes/                   # Definição de rotas

│   ├── student.routes.ts- `GET /api/relatorios/turma/:id` - Relatório de frequência de uma turma

│   ├── teacher.routes.ts

│   └── index.ts```- `GET /api/relatorios/geral` - Relatório geral de frequência

│

├── middleware/               # Middlewaressrc/

│   └── error.middleware.ts

│├── controllers/ # Recebe requisições HTTP## Licença

└── index.ts                  # Servidor Express (ponto de entrada)

```│ ├── student.controller.ts



---│ └── teacher.controller.tsISC



## 🛠️ Tecnologias Utilizadas├── services/ # Lógica de negócio

│ ├── student.service.ts

| Tecnologia | Versão | Descrição |│ ├── teacher.service.ts

|------------|--------|-----------|│ ├── student-persistence.service.ts

| **Node.js** | 22.x | Runtime JavaScript |│ ├── teacher-persistence.service.ts

| **Express** | 4.18.2 | Framework web |│ └── database.service.ts

| **TypeScript** | 5.3.3 | JavaScript com tipos |├── models/ # Interfaces TypeScript

| **MongoDB** | 7.0 | Banco de dados NoSQL |│ ├── Student.ts

| **Prisma** | 6.17.1 | ORM (Object-Relational Mapping) |│ └── Teacher.ts

| **ts-node-dev** | - | Hot reload em desenvolvimento |├── routes/ # Rotas da API

│ ├── student.routes.ts

---│ ├── teacher.routes.ts

│ └── index.ts

## 📚 Conceitos Ensinados└── index.ts # Servidor Express



### 🏛️ Arquitetura````

- ✅ **Separação em camadas** (Controller, Service, Persistence)

- ✅ **Responsabilidade única** (cada camada tem um propósito)---

- ✅ **Código organizado** e fácil de manter

## 🎯 Funcionalidades (CRUD)

### 💻 TypeScript

- ✅ **Generics** (`<T>` para funções reutilizáveis)### ✅ C - Create (Criar)

- ✅ **Interfaces** para tipagem de dados```typescript

- ✅ **Type safety** (erros em tempo de compilação)criar(dados) → Cria novo registro

`````

### 🔄 Backend

- ✅ **API RESTful** (GET, POST, PUT, DELETE)### ✅ R - Read (Ler)

- ✅ **Status HTTP** (200, 201, 404, 500)

- ✅ **Validação de dados**```typescript

- ✅ **Tratamento de erros**buscarTodos() → Lista todos os registros

buscarPorId(id) → Busca um registro específico

### 🗄️ Banco de Dados```

- ✅ **MongoDB** (NoSQL)

- ✅ **Prisma ORM**### ✅ U - Update (Atualizar)

- ✅ **Operações CRUD**

- ✅ **Validação de unicidade**```typescript

atualizar(id, dados) → Atualiza um registro

### 🎯 Boas Práticas```

- ✅ **DRY Principle** (Don't Repeat Yourself)

- ✅ **Código genérico reutilizável**### ✅ D - Delete (Deletar)

- ✅ **Funções puras** (sem efeitos colaterais)

- ✅ **Nomenclatura em inglês** (padrão da indústria)```typescript

deletar(id) → Remove um registro

---```

## 🎓 Exercícios Sugeridos---

### 📘 Nível Básico## 🛠️ Tecnologias Utilizadas

1. ✏️ Testar todos os 10 endpoints com Postman

2. ✏️ Criar 5 estudantes diferentes via API- **Node.js** - Runtime JavaScript

3. ✏️ Atualizar o curso de um estudante- **Express** - Framework web

4. ✏️ Deletar um estudante e verificar que sumiu- **TypeScript** - JavaScript com tipos

- **MongoDB** - Banco de dados NoSQL

### 📗 Nível Intermediário- **Prisma** - ORM (mapeamento objeto-relacional)

5. ✏️ Adicionar validação de formato de email (regex)- **ts-node-dev** - Hot reload em desenvolvimento

6. ✏️ Criar função para buscar estudantes por curso

7. ✏️ Adicionar campo "telefone" ao modelo Student---

8. ✏️ Implementar rota GET `/api/students/active` (apenas ativos)

## 📚 Conceitos Aprendidos

### 📕 Nível Avançado

9. ✏️ Criar terceira entidade "Course" usando o `persistence.service` genérico### Arquitetura

10. ✏️ Adicionar busca por texto (nome OU email)

11. ✏️ Implementar paginação (limite e offset)- ✅ Separação em camadas (Controller, Service, Persistence)

12. ✏️ Adicionar relacionamento: Student → Course- ✅ Responsabilidade única (cada camada tem uma função)

- ✅ Código organizado e fácil de manter

---

### Backend

## 🐛 Solução de Problemas

- ✅ API RESTful (GET, POST, PUT, DELETE)

### ❌ MongoDB não conecta?- ✅ Validação de dados

- ✅ Tratamento de erros

**Solução 1**: Inicie o MongoDB localmente- ✅ Status codes HTTP (200, 201, 404, 500)

````bash

# Windows### Banco de Dados

net start MongoDB

- ✅ MongoDB (NoSQL)

# Linux/Mac- ✅ Prisma ORM

sudo systemctl start mongod- ✅ Operações CRUD

```- ✅ Validação de unicidade (email, matrícula)



**Solução 2**: Use MongoDB Atlas (cloud gratuito)---

```env

DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/escola"## 🎓 Exercícios Sugeridos

````

### Nível Básico

### ❌ Erro de compilação TypeScript?

1. ✏️ Testar todos os endpoints com Postman

````bash2. ✏️ Criar 5 estudantes diferentes

# Regenere o Prisma Client3. ✏️ Atualizar um estudante

npm run prisma:generate4. ✏️ Deletar um estudante



# Limpe e reinstale### Nível Intermediário

rm -rf node_modules package-lock.json

npm install5. ✏️ Adicionar validação de email (formato válido)

```6. ✏️ Criar uma função para buscar estudantes por curso

7. ✏️ Adicionar campo "telefone" ao estudante

### ❌ Porta 3000 em uso?

### Nível Avançado

```env

# Altere no arquivo .env8. ✏️ Criar uma terceira entidade (Turma)

PORT=30019. ✏️ Adicionar busca por texto (nome ou email)

```10. ✏️ Implementar paginação (limite e offset)



### ❌ Erro "Cannot find module"?---



```bash## 🐛 Solução de Problemas

# Compile o TypeScript

npm run build### MongoDB não conecta?



# Ou use ts-node-dev```bash

npm run dev# Inicie o MongoDB

```net start MongoDB



---# Ou use MongoDB Atlas (cloud gratuito)

# DATABASE_URL="mongodb+srv://..."

## 📖 Documentação Adicional```



Este projeto possui documentação extensa:### Erro de compilação TypeScript?



- 📄 **[NAMING_STANDARDIZATION.md](./NAMING_STANDARDIZATION.md)** - Padronização de nomenclatura (PT → EN)```bash

- 📄 **[GENERIC_PERSISTENCE_FUNCTIONS.md](./GENERIC_PERSISTENCE_FUNCTIONS.md)** - Explicação das funções genéricas# Regenere o Prisma Client

- 📄 **[EXEMPLO_USO_FUNCOES_GENERICAS.md](./EXEMPLO_USO_FUNCOES_GENERICAS.md)** - Como adicionar novas entidadesnpx prisma generate

- 📄 **[ARQUITETURA_FINAL.md](./ARQUITETURA_FINAL.md)** - Arquitetura completa explicada```



---### Porta 3000 em uso?



## 🎯 Por Que Este Projeto é Didático?```env

# Altere no arquivo .env

### ✅ Para EstudantesPORT=3001

- **Código limpo** e bem comentado em inglês```

- **Conceitos progressivos** (do básico ao avançado)

- **Exemplos práticos** em cada camada---

- **Fácil de testar** com Postman

- **Generics** explicados com exemplos reais## 📖 Documentação Adicional



### ✅ Para Professores- 📄 [SIMPLIFICACAO_DIDATICA.md](./SIMPLIFICACAO_DIDATICA.md) - Explicação das simplificações

- **Arquitetura profissional** mas simplificada- 📄 [TEACHER_ENTITY.md](./TEACHER_ENTITY.md) - Como foi criada a entidade Teacher

- **Padrões consistentes** entre entidades- 📄 [SOLUCAO_MONGODB.md](./SOLUCAO_MONGODB.md) - Configuração do MongoDB

- **Foco no CRUD básico** (sem complexidade extra)

- **Fácil de expandir** para novos exercícios---

- **Código genérico** ensina reutilização

## 🤝 Como Contribuir

**Sugestão de Plano de Aula** (4 aulas de 2h):

1. Faça um fork do projeto

#### Aula 1: Fundamentos2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)

- Apresentar arquitetura em 3 camadas (30min)3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)

- Mostrar fluxo de uma requisição (30min)4. Push para a branch (`git push origin feature/nova-funcionalidade`)

- Explorar camada de Persistence genérica (40min)5. Abra um Pull Request

- Exercício: Teste todos endpoints (20min)

---

#### Aula 2: CRUD Estudantes

- Explicar Controller de Student (30min)## 📜 Licença

- Explicar Service de Student (30min)

- Mostrar como usa persistence genérico (30min)MIT - Uso livre para fins educacionais

- Exercício: Criar/atualizar estudantes (30min)

---

#### Aula 3: CRUD Professores

- Comparar Student vs Teacher (mostrar padrão) (30min)## 👨‍🏫 Para Professores

- Explicar validações diferentes (30min)

- Exercício: Replicar CRUD para Teacher (60min)Este projeto foi simplificado especificamente para ensino técnico:



#### Aula 4: Expandir Sistema- ✅ Código limpo e bem comentado

- Criar terceira entidade (Course) juntos (60min)- ✅ Padrões consistentes entre entidades

- Mostrar como reusar persistence.service (30min)- ✅ Foco no CRUD básico

- Exercício: Adicionar relacionamentos (30min)- ✅ Arquitetura profissional, mas didática

- ✅ Fácil de expandir com novos exercícios

---

**Sugestão de aula:**

## 🤝 Como Contribuir

1. Apresente a arquitetura em camadas (30min)

1. Faça um fork do projeto2. Mostre o CRUD completo de Estudantes (30min)

2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)3. Peça para replicarem o mesmo para Professores (1h)

3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)4. Exercícios práticos com Postman (1h)

4. Push para a branch (`git push origin feature/nova-funcionalidade`)

5. Abra um Pull Request---



---## ⭐ Dicas de Estudo



## ⭐ Dicas de Estudo1. **Comece pela camada de Persistence** - Entenda como os dados são salvos

2. **Depois vá para Service** - Veja as validações

### 🎯 Ordem Recomendada de Estudo3. **Por último, Controller** - Entenda HTTP

4. **Use Prisma Studio** - Visualize os dados: `npm run studio`

1. **Comece por `persistence.service.ts`** ⭐5. **Teste com Postman** - Veja a API funcionando

   - Entenda as 7 funções genéricas

   - Veja como `findAll<T>()` funciona---

   - Entenda o conceito de Generics

**Bons estudos! 🚀**

2. **Depois vá para `student.service.ts`**
   - Veja como usa `persistence.findAll<Student>(db.student, 'name')`
   - Entenda as validações (email único, matrícula única)
   - Veja o padrão: validar → chamar persistence

3. **Compare com `teacher.service.ts`**
   - Veja que é quase igual (só muda validações)
   - Entenda o reuso do código genérico
   - Aprecie a consistência!

4. **Suba para `student.controller.ts`**
   - Veja como recebe HTTP e retorna JSON
   - Entenda try/catch para erros
   - Veja os status codes (200, 201, 404, 500)

5. **Teste tudo com Postman** 🚀
   - Crie um estudante
   - Liste todos
   - Atualize um
   - Delete um
   - Tente criar email duplicado (deve dar erro!)

### 🛠️ Ferramentas Úteis

- **Prisma Studio** - Visualize os dados no banco:
  ```bash
  npm run prisma:studio
````

Abre em: http://localhost:5555

- **Postman** - Teste a API facilmente
- **VS Code** - Editor recomendado (com extensão Prisma)

---

## 📊 Métricas do Projeto

| Métrica                    | Valor                                    |
| -------------------------- | ---------------------------------------- |
| **Linhas de código**       | ~800 linhas                              |
| **Duplicação de código**   | 0% ✅                                    |
| **Endpoints**              | 10 rotas                                 |
| **Entidades**              | 2 (Student, Teacher)                     |
| **Arquivos de serviço**    | 3 (persistence genérico + 2 específicos) |
| **Cobertura de CRUD**      | 100%                                     |
| **Camadas de arquitetura** | 3 (Controller, Service, Persistence)     |

---

## 📜 Licença

MIT - Uso livre para fins educacionais

---

## 🙏 Agradecimentos

Este projeto foi desenvolvido especificamente para **ensino médio técnico em informática**, com foco em:

- Clareza didática
- Código profissional mas acessível
- Conceitos progressivos
- Exemplos práticos

**Bons estudos! 🚀📚**

---

## 📞 Suporte

Encontrou um bug? Tem uma dúvida? Abra uma [Issue](../../issues) no GitHub!

---

**Feito com ❤️ para estudantes de informática**
