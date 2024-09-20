import { Prisma, Employee } from '@prisma/client'

type WithoutPassword = Omit<Employee, 'password_hash'>

export interface EmployeesRepository {
  save(data: Employee): Promise<Employee>
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
  findById(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  findByEmployeeIdAndClinicId(employee_id: string, clinic_id: string): Promise<WithoutPassword | null>
  listByClinicId(clinic_id: string): Promise<WithoutPassword[]>
}
