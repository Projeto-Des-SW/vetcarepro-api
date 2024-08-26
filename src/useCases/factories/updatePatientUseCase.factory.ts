import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdatePatientUseCase } from '@/useCases/updatePatient.useCase'

export function updatePatientUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updatePatientUseCase = new UpdatePatientUseCase(patientsRepository, clinicsRepository)

  return updatePatientUseCase
}
