export interface Student {
  id: string
  name: string
  email: string
  dateOfBirth: string
  classId: string
  createdAt: string
  updateAt: string
}

export interface CreateStudentRequest {
  name: string
  email: string
  dateOfBirth: string
  classId: string
}

export interface UpdateStudentRequest {
  name?: string
  email?: string
  dateOfBirth?: string
  classId?: string
}
