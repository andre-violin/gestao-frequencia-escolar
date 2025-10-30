import { Request, Response, NextFunction } from 'express'

// Middleware global para capturar erros não tratados
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  console.error('Erro não tratado:', error)

  // Erro personalizado com status
  if (error.statusCode) {
    return res.status(error.statusCode).json(error.message)
  }

  // Erro interno do servidor
  return res.status(500).json('Erro interno do servidor')
}

// Middleware para rota não encontrada
export const notFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).json(`Rota ${req.method} ${req.path} não encontrada`)
}

// Classe para erros personalizados
export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}

// Funções helper para erros comuns
export const createNotFoundError = (resource: string) =>
  new AppError(`${resource} não encontrado`, 404)

export const createValidationError = (message: string) => new AppError(message, 400)

export const createUnauthorizedError = (message = 'Não autorizado') => new AppError(message, 401)
