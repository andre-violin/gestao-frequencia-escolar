export interface Class {
  id: string
  name: string
  grade: string
  teacher: string
  schedule: Schedule[]
  createdAt: string
  updatedAt: string
}
export interface Schedule {
  dayOfWeek: string
  startTime: string
  endTime: string
}
export interface CreateClassRequest {
  name: string
  grade: string
  teacher: string
  schedule: Schedule[]
}
