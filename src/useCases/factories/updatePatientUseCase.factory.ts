import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { UpdatePatientUseCase } from '@/useCases/updatePatient.useCase'

export function updatePatientUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const updatePatientUseCase = new UpdatePatientUseCase(patientsRepository, clinicsRepository, employeesRepository)

  return updatePatientUseCase
}
