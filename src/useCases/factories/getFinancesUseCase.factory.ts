import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedules.repository'
import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales.repository'
import { GetFinancesUseCase } from '@/useCases/getFinances.useCase'

export function getFinancesUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const schedulesRepository = new PrismaSchedulesRepository()
  const servicesRepository = new PrismaServicesRepository()
  const salesRepository = new PrismaSalesRepository()
  const getFinancesUseCase = new GetFinancesUseCase(clinicsRepository, employeesRepository, schedulesRepository, servicesRepository, salesRepository)

  return getFinancesUseCase
}
