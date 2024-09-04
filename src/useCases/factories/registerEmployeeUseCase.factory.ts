import { BcryptProvider } from '@/providers/hash/bcrypt.provider'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { RegisterEmployeeUseCase } from '@/useCases/registerEmployee.useCase'

export function registerEmployeeUseCaseFactory() {
  const hashProvider = new BcryptProvider()
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(employeesRepository, clinicsRepository, hashProvider)

  return registerEmployeeUseCase
}
