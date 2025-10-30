import { db } from './database.service'

// ========================================
// GENERIC PERSISTENCE LAYER
// ========================================
// This layer provides reusable CRUD operations for any entity
// Uses functions instead of classes for simplicity

/**
 * Generic type for Prisma models
 * Represents any entity with id, createdAt, and updatedAt
 */
export type BaseEntity = {
  id: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Generic type for create data (without auto-generated fields)
 */
export type CreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

/**
 * Generic type for update data (partial without auto-generated fields)
 */
export type UpdateData<T> = Partial<CreateData<T>>

// ========================================
// GENERIC CRUD FUNCTIONS
// ========================================

/**
 * Finds all records from a model
 * @param model - Prisma model (e.g., db.student, db.teacher)
 * @param orderBy - Field to order by (default: 'name')
 */
export async function findAll<T>(model: any, orderBy: string = 'name'): Promise<T[]> {
  const records = await model.findMany({
    orderBy: { [orderBy]: 'asc' },
  })
  return records
}

/**
 * Finds a record by ID
 * @param model - Prisma model
 * @param id - Record ID
 */
export async function findById<T>(model: any, id: string): Promise<T | null> {
  try {
    const record = await model.findUnique({
      where: { id },
    })
    return record
  } catch (error) {
    return null // Returns null if ID is invalid
  }
}

/**
 * Creates a new record
 * @param model - Prisma model
 * @param data - Data to create
 */
export async function create<T>(model: any, data: any): Promise<T> {
  const newRecord = await model.create({
    data: data,
  })
  return newRecord
}

/**
 * Updates an existing record
 * @param model - Prisma model
 * @param id - Record ID
 * @param data - Data to update
 */
export async function update<T>(model: any, id: string, data: any): Promise<T | null> {
  try {
    const updatedRecord = await model.update({
      where: { id },
      data: data,
    })
    return updatedRecord
  } catch (error) {
    return null // Returns null if record doesn't exist
  }
}

/**
 * Deletes a record
 * @param model - Prisma model
 * @param id - Record ID
 */
export async function remove(model: any, id: string): Promise<boolean> {
  try {
    await model.delete({
      where: { id },
    })
    return true
  } catch (error) {
    return false // Returns false if record doesn't exist
  }
}

/**
 * Checks if a field value already exists
 * @param model - Prisma model
 * @param field - Field name to check (e.g., 'email', 'registration')
 * @param value - Value to check
 */
export async function fieldExists(model: any, field: string, value: any): Promise<boolean> {
  const record = await model.findFirst({
    where: { [field]: value },
  })
  return record !== null
}

/**
 * Checks if a field value exists, excluding a specific record
 * Useful for update operations
 * @param model - Prisma model
 * @param field - Field name to check
 * @param value - Value to check
 * @param excludeId - ID to exclude from search
 */
export async function fieldExistsExcludingId(
  model: any,
  field: string,
  value: any,
  excludeId: string,
): Promise<boolean> {
  const record = await model.findFirst({
    where: {
      [field]: value,
      id: { not: excludeId },
    },
  })
  return record !== null
}
