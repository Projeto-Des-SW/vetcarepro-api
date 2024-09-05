import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { RegisterPatientUseCase } from '@/useCases/registerPatient.useCase'

export function registerPatientUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const registerPatientUseCase = new RegisterPatientUseCase(patientsRepository, clinicsRepository, employeesRepository)

  return registerPatientUseCase
}
