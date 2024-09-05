import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { DeleteClinicUseCase } from '@/useCases/deleteClinic.useCase'

export function deleteClinicUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const deleteClinicUseCase = new DeleteClinicUseCase(clinicsRepository)

  return deleteClinicUseCase
}
