import { Router } from 'express'
import * as teacherController from '../controllers/teacher.controller'

const router = Router()

// ========================================
// TEACHER ROUTES
// ========================================

// CREATE - Create new teacher
router.post('/', teacherController.create)

// READ - Find teachers
router.get('/', teacherController.findAll)
router.get('/:id', teacherController.findById)

// UPDATE - Update teacher
router.put('/:id', teacherController.update)

// DELETE - Delete teacher
router.delete('/:id', teacherController.remove)

export default router
