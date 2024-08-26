import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetPatientUseCase } from '@/useCases/getPatient.useCase'

export function getPatientUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const getPatientUseCase = new GetPatientUseCase(patientsRepository, clinicsRepository)

  return getPatientUseCase
}
