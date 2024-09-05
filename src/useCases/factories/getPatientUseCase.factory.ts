import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetPatientUseCase } from '@/useCases/getPatient.useCase'

export function getPatientUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getPatientUseCase = new GetPatientUseCase(patientsRepository, clinicsRepository, employeesRepository)

  return getPatientUseCase
}
