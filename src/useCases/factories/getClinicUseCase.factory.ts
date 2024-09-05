import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetClinicUseCase } from '@/useCases/getClinic.useCase'

export function getClinicUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getClinicUseCase = new GetClinicUseCase(clinicsRepository, employeesRepository)

  return getClinicUseCase
}
