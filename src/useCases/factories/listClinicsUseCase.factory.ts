import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { ListClinicsUseCase } from '@/useCases/listClinics.useCase'

export function listClinicsUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const listClinicsUseCase = new ListClinicsUseCase(clinicsRepository)

  return listClinicsUseCase
}
