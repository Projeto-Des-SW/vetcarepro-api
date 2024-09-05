import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { DeletePatientUseCase } from '@/useCases/deletePatient.useCase'

export function deletePatientUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const deletePatientUseCase = new DeletePatientUseCase(patientsRepository, clinicsRepository, employeesRepository)

  return deletePatientUseCase
}
