import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { DeleteEmployeeUseCase } from '@/useCases/deleteEmployee.useCase'

export function deleteEmployeeUseCaseFactory() {
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeesRepository, clinicsRepository)

  return deleteEmployeeUseCase
}
