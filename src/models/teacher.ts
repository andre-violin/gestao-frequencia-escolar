export interface Teacher {
  id: string
  employeeId: string
  name: string
  email: string
  phone: string
  department: string
  specialization: string[]
  hireDate: string
  status: TeacherStatus
  classIds: string[]
  createdAt: string
  updatedAt: string
}
export enum TeacherStatus {
  ACTIVE = 'ativo',
  INACTIVE = 'inativo',
  ON_LEAVE = 'licença',
  RETIRED = 'aposentado',
}
export interface CreateTeacherRequest {
  employeeId: string
  name: string
  email: string
  phone: string
  department: string
  specialization: string[]
  hireDate: string
  status?: TeacherStatus
  classIds?: string[]
}
export interface UpdateTeacherRequest {
  employeeId?: string
  name?: string
  email?: string
  phone?: string
  department?: string
  specialization?: string[]
  status?: TeacherStatus
  classIds?: string[]
}
