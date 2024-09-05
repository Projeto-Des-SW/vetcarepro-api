import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { ListEmployeesUseCase } from '@/useCases/listEmployees.useCase'

export function listEmployeesUseCaseFactory() {
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const listEmployeesUseCase = new ListEmployeesUseCase(employeesRepository, clinicsRepository)

  return listEmployeesUseCase
}
