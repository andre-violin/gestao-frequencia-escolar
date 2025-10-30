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
