import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListPatientsUseCase } from '@/useCases/listPatients.useCase'

export function listPatientsUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listPatientsUseCase = new ListPatientsUseCase(patientsRepository, clinicsRepository, employeesRepository)

  return listPatientsUseCase
}
