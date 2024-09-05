import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetEmployeeUseCase } from '@/useCases/getEmployee.useCase'

export function getEmployeeUseCaseFactory() {
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const getEmployeeUseCase = new  GetEmployeeUseCase(employeesRepository, clinicsRepository)

  return getEmployeeUseCase
}
