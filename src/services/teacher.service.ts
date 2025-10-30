import { Teacher } from '../models/Teacher'
import { db } from './database.service'
import * as persistence from './persistence.service'

// ========================================
// SERVICE LAYER - TEACHERS
// ========================================
// This layer contains the application's business logic
// Performs validations before calling the persistence layer

/**
 * Creates a new teacher
 * Validates if the email is unique before creating
 */
export async function create(data: {
  name: string
  email: string
  subject: string
  isActive?: boolean
}): Promise<Teacher> {
  // Validate if email already exists
  const emailExists = await persistence.fieldExists(db.teacher, 'email', data.email)
  if (emailExists) {
    throw new Error('Email already exists')
  }

  // Create teacher with isActive = true by default
  const newTeacher = await persistence.create<Teacher>(db.teacher, {
    name: data.name,
    email: data.email,
    subject: data.subject,
    isActive: data.isActive ?? true,
  })

  return newTeacher
}

/**
 * Finds all teachers
 */
export async function findAll(): Promise<Teacher[]> {
  return await persistence.findAll<Teacher>(db.teacher, 'name')
}

/**
 * Finds a teacher by ID
 */
export async function findById(id: string): Promise<Teacher | null> {
  return await persistence.findById<Teacher>(db.teacher, id)
}

/**
 * Updates a teacher
 * Validates if the new email is not already in use by another teacher
 */
export async function update(
  id: string,
  data: {
    name?: string
    email?: string
    subject?: string
    isActive?: boolean
  },
): Promise<Teacher | null> {
  // Find current teacher
  const currentTeacher = await persistence.findById<Teacher>(db.teacher, id)
  if (!currentTeacher) {
    return null // Teacher not found
  }

  // If changing email, check if it already exists
  if (data.email && data.email !== currentTeacher.email) {
    const emailExists = await persistence.fieldExists(db.teacher, 'email', data.email)
    if (emailExists) {
      throw new Error('Email already exists')
    }
  }

  // Update teacher
  return await persistence.update<Teacher>(db.teacher, id, data)
}

/**
 * Deletes a teacher
 */
export async function remove(id: string): Promise<boolean> {
  return await persistence.remove(db.teacher, id)
}
