import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetServiceUseCase } from '@/useCases/getService.useCase'

export function getServiceUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getServiceUseCase = new GetServiceUseCase(servicesRepository, clinicsRepository, employeesRepository)

  return getServiceUseCase
}
