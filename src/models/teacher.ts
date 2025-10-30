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
