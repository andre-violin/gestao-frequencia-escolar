/**
 * 🚀 SERVIDOR EXPRESS - VERSÃO SIMPLIFICADA (FUNCIONAL)
 *
 * Este arquivo inicia o servidor Express de forma simples, sem usar classes.
 * Perfeito para estudantes de nível técnico!
 */

import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import routes from './routes'
import { conectar } from './services/database.service'

// Carregar variáveis de ambiente
dotenv.config()

// Configurações
const PORT = parseInt(process.env.PORT || '3000', 10)

// Criar aplicação Express
const app: Application = express()

// ========================================
// 1️⃣ CONFIGURAR MIDDLEWARES
// ========================================

/**
 * Middlewares são funções que executam ANTES das rotas.
 * Eles processam as requisições (requests) antes de chegarem nos controllers.
 */

// 🔒 Helmet: Adiciona segurança HTTP (protege contra ataques comuns)
app.use(helmet())

// 🌐 CORS: Permite que outros sites acessem a API
app.use(cors())

// 📦 JSON Parser: Converte o body das requisições de JSON para objeto JavaScript
app.use(express.json())

// ========================================
// 2️⃣ CONFIGURAR ROTAS
// ========================================

/**
 * Health Check: Rota simples para verificar se o servidor está funcionando
 * Acesse: http://localhost:3000/health
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor funcionando perfeitamente!',
    timestamp: new Date().toISOString(),
  })
})

/**
 * Rotas da API: Todas as rotas de estudantes estão em /api
 * Exemplo: http://localhost:3000/api/students
 */
app.use('/api', routes)

// ========================================
// 3️⃣ INICIAR SERVIDOR
// ========================================

/**
 * Função assíncrona que conecta ao banco e inicia o servidor
 */
async function iniciarServidor(): Promise<void> {
  try {
    // 1. Conectar ao MongoDB
    await conectar()

    // 2. Iniciar o servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
      console.log(`📬 Health check: http://localhost:${PORT}/health`)
      console.log(`🎓 API Estudantes: http://localhost:${PORT}/api/students`)
      console.log(`\n✨ Tudo pronto! Use as rotas acima para testar.\n`)
    })
  } catch (erro) {
    console.error('❌ Erro ao iniciar o servidor:', erro)
    process.exit(1)
  }
}

// Chamar a função para iniciar
iniciarServidor()
