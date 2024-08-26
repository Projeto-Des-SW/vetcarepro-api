import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateClinicUseCase } from '@/useCases/updateClinic.useCase'

export function updateClinicUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const updateClinicUseCase = new UpdateClinicUseCase(clinicsRepository)

  return updateClinicUseCase
}
