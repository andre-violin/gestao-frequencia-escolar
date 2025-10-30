import { Request, Response } from 'express'
import * as studentService from '../services/student.service'
import { Student } from '../models'

// ========================================
// STUDENTS CONTROLLER
// ========================================
// This layer receives HTTP requests and returns responses
// Calls the service layer to execute operations

/**
 * POST /api/students
 * Creates a new student
 */
export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const data: Student = req.body
    const student = await studentService.create(data)
    return res.status(201).json(student)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

/**
 * GET /api/students
 * Finds all students
 */
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const students = await studentService.findAll()
    return res.status(200).json(students)
  } catch (error: any) {
    return res.status(500).json({ message: 'Error finding students' })
  }
}

/**
 * GET /api/students/:id
 * Finds a student by ID
 */
export async function findById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const student = await studentService.findById(id)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json(student)
  } catch (error: any) {
    return res.status(500).json({ message: 'Error finding student' })
  }
}

/**
 * PUT /api/students/:id
 * Updates a student
 */
export async function update(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const data: Student = req.body
    const student = await studentService.update(id, data)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json(student)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

/**
 * DELETE /api/students/:id
 * Deletes a student
 */
export async function remove(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const success = await studentService.remove(id)

    if (!success) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting student' })
  }
}
