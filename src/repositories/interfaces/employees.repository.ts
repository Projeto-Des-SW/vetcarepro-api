import { Prisma, Employee } from '@prisma/client'
import { WithoutPasswordEmployee } from '@/util/omitField'

export interface EmployeesRepository {
  save(data: Employee): Promise<Employee>
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
  findById(id: string): Promise<Employee | null>
  findByEmail(email: string): Promise<Employee | null>
  findByEmployeeIdAndClinicId(employee_id: string, clinic_id: string): Promise<Employee | null>
  findByEmployeeIdAndClinicIdWithoutPassword(employee_id: string, clinic_id: string): Promise<WithoutPasswordEmployee | null>
  listByClinicId(clinic_id: string): Promise<WithoutPasswordEmployee[]>
}
