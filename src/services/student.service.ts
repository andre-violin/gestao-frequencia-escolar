import { Student } from '../models/Student'
import { db } from './database.service'
import * as persistence from './persistence.service'

// ========================================
// SERVICE LAYER - STUDENTS
// ========================================
// This layer contains the application's business logic
// Performs validations before calling the persistence layer

/**
 * Creates a new student
 * Validates if email and registration are unique before creating
 */
export async function create(data: {
  name: string
  email: string
  registration: string
  course: string
  isActive?: boolean
}): Promise<Student> {
  // Validate if registration already exists
  const registrationExists = await persistence.fieldExists(
    db.student,
    'registration',
    data.registration,
  )
  if (registrationExists) {
    throw new Error('Registration already exists')
  }

  // Validate if email already exists
  const emailExists = await persistence.fieldExists(db.student, 'email', data.email)
  if (emailExists) {
    throw new Error('Email already exists')
  }

  // Create student with isActive = true by default
  const newStudent = await persistence.create<Student>(db.student, {
    name: data.name,
    email: data.email,
    registration: data.registration,
    course: data.course,
    isActive: data.isActive ?? true,
  })

  return newStudent
}

/**
 * Finds all students
 */
export async function findAll(): Promise<Student[]> {
  return await persistence.findAll<Student>(db.student, 'name')
}

/**
 * Finds a student by ID
 */
export async function findById(id: string): Promise<Student | null> {
  return await persistence.findById<Student>(db.student, id)
}

/**
 * Updates a student
 * Validates if the new email is not already in use by another student
 */
export async function update(
  id: string,
  data: {
    name?: string
    email?: string
    course?: string
    isActive?: boolean
  },
): Promise<Student | null> {
  // Find current student
  const currentStudent = await persistence.findById<Student>(db.student, id)
  if (!currentStudent) {
    return null // Student not found
  }

  // If changing email, check if it already exists
  if (data.email && data.email !== currentStudent.email) {
    const emailExists = await persistence.fieldExists(db.student, 'email', data.email)
    if (emailExists) {
      throw new Error('Email already exists')
    }
  }

  // Update student
  return await persistence.update<Student>(db.student, id, data)
}

/**
 * Deletes a student
 */
export async function remove(id: string): Promise<boolean> {
  return await persistence.remove(db.student, id)
}
