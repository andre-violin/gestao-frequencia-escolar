import { PrismaClient } from '@prisma/client'

// ========================================
// SINGLETON DO PRISMA CLIENT
// ========================================

/**
 * Instância única do Prisma Client
 * Usando o padrão Singleton para evitar múltiplas conexões
 */
let prisma: PrismaClient

/**
 * Função para obter a instância do Prisma Client
 * Em desenvolvimento, reutiliza a mesma instância para evitar problemas com hot-reload
 */
function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
  return prisma
}

// Exporta a instância do Prisma Client
export const db = getPrismaClient()

// ========================================
// FUNÇÕES DE CONEXÃO
// ========================================

/**
 * Conecta ao banco de dados
 */
export async function conectar(): Promise<void> {
  try {
    await db.$connect()
    console.log('✅ Conectado ao MongoDB com sucesso!')
  } catch (erro) {
    console.error('❌ Erro ao conectar ao MongoDB:', erro)
    throw erro
  }
}

/**
 * Desconecta do banco de dados
 */
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

/**
 * Desconecta do banco quando o processo é encerrado
 */
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
