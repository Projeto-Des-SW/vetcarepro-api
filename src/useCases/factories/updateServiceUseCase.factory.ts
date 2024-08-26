import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateServiceUseCase } from '@/useCases/updateService.useCase'

export function updateServiceUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updateServiceUseCase = new UpdateServiceUseCase(servicesRepository, clinicsRepository)

  return updateServiceUseCase
}
