import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateEmployeeUseCase } from '@/useCases/updateEmployee.useCase'

export function updateEmployeeUseCaseFactory() {
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeesRepository, clinicsRepository)

  return updateEmployeeUseCase
}
