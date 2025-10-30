import { Router } from 'express'
import studentRoutes from './student.routes'
import teacherRoutes from './teacher.routes'

const router = Router()

// Registrar rotas com prefixos
router.use('/students', studentRoutes)
router.use('/teachers', teacherRoutes)

// Rota de health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  })
})

// Rota de informações da API
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SIGEFE API - Sistema de Gestão de Frequência Escolar',
    version: '1.0.0',
    endpoints: [
      'GET /api/health - Status da API',
      'GET /api/students - Listar estudantes',
      'POST /api/students - Criar estudante',
      'GET /api/students/:id - Buscar estudante',
      'PUT /api/students/:id - Atualizar estudante',
      'DELETE /api/students/:id - Deletar estudante',
      'GET /api/teachers - Listar professores',
      'POST /api/teachers - Criar professor',
      'GET /api/teachers/:id - Buscar professor',
      'PUT /api/teachers/:id - Atualizar professor',
      'DELETE /api/teachers/:id - Deletar professor',
    ],
  })
})

export default router
