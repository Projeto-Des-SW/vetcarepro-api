import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { DeleteServiceUseCase } from '@/useCases/deleteService.useCase'

export function deleteServiceUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository, clinicsRepository)

  return deleteServiceUseCase
}
