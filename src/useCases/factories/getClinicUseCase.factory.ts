import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetClinicUseCase } from '@/useCases/getClinic.useCase'

export function getClinicUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const getClinicUseCase = new GetClinicUseCase(clinicsRepository)

  return getClinicUseCase
}
