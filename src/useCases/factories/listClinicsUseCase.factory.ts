import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListClinicsUseCase } from '@/useCases/listClinics.useCase'

export function listClinicsUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listClinicsUseCase = new ListClinicsUseCase(clinicsRepository, employeesRepository)

  return listClinicsUseCase
}
