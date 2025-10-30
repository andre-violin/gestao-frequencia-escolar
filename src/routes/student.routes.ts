import { Router } from 'express'
import * as studentController from '../controllers/student.controller'

const router = Router()

// ========================================
// STUDENT ROUTES
// ========================================

// CREATE - Create new student
router.post('/', studentController.create)

// READ - Find students
router.get('/', studentController.findAll)
router.get('/:id', studentController.findById)

// UPDATE - Update student
router.put('/:id', studentController.update)

// DELETE - Delete student
router.delete('/:id', studentController.remove)

export default router
