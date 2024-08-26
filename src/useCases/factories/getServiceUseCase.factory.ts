import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { GetServiceUseCase } from '@/useCases/getService.useCase'

export function getServiceUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const getServiceUseCase = new GetServiceUseCase(servicesRepository, clinicsRepository)

  return getServiceUseCase
}
