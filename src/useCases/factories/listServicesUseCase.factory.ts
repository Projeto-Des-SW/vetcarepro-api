import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListServicesUseCase } from '@/useCases/listServices.useCase'

export function listServicesUseCaseFactory() {
  const servicesRepository = new PrismaServicesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listServicesUseCase = new ListServicesUseCase(servicesRepository, clinicsRepository, employeesRepository)

  return listServicesUseCase
}
