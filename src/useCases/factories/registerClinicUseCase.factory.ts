import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { RegisterClinicUseCase } from '@/useCases/registerClinic.useCase'

export function registerClinicUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const registerClinicUseCase = new RegisterClinicUseCase(clinicsRepository)

  return registerClinicUseCase
}
