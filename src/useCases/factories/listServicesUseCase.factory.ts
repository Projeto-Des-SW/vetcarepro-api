import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { ListServicesUseCase } from '@/useCases/listServices.useCase'

export function listServicesUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const listServicesUseCase = new ListServicesUseCase(servicesRepository, clinicsRepository)

  return listServicesUseCase
}
