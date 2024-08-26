import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { ListPatientsUseCase } from '@/useCases/listPatients.useCase'

export function listPatientsUseCaseFactory() {
  const patientsRepository = new PrismaPatientsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const listPatientsUseCase = new ListPatientsUseCase(patientsRepository, clinicsRepository)

  return listPatientsUseCase
}
