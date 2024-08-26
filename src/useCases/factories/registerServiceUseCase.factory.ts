import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { RegisterServiceUseCase } from '@/useCases/registerService.useCase'

export function registerServiceUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const servicesRepository = new PrismaServicesRepository()
  const registerServiceUseCase = new RegisterServiceUseCase(servicesRepository, clinicsRepository)

  return registerServiceUseCase
}
