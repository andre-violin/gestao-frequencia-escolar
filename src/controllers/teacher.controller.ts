import { Request, Response } from 'express'
import * as teacherService from '../services/teacher.service'
import { Teacher } from '../models/Teacher'

// ========================================
// TEACHERS CONTROLLER
// ========================================
// This layer receives HTTP requests and returns responses
// Calls the service layer to execute operations

/**
 * POST /api/teachers
 * Creates a new teacher
 */
export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const data: Teacher = req.body
    const teacher = await teacherService.create(data)
    return res.status(201).json(teacher)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

/**
 * GET /api/teachers
 * Finds all teachers
 */
export async function findAll(req: Request, res: Response): Promise<Response> {
  try {
    const teachers = await teacherService.findAll()
    return res.status(200).json(teachers)
  } catch (error: any) {
    return res.status(500).json({ message: 'Error finding teachers' })
  }
}

/**
 * GET /api/teachers/:id
 * Finds a teacher by ID
 */
export async function findById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const teacher = await teacherService.findById(id)

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    return res.status(200).json(teacher)
  } catch (error: any) {
    return res.status(500).json({ message: 'Error finding teacher' })
  }
}

/**
 * PUT /api/teachers/:id
 * Updates a teacher
 */
export async function update(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const data: Teacher = req.body
    const teacher = await teacherService.update(id, data)

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    return res.status(200).json(teacher)
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}

/**
 * DELETE /api/teachers/:id
 * Deletes a teacher
 */
export async function remove(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const success = await teacherService.remove(id)

    if (!success) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    return res.status(200).json({ message: 'Teacher deleted successfully' })
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting teacher' })
  }
}
