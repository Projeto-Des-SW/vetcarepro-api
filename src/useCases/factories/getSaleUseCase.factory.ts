import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetSaleUseCase } from '@/useCases/getSale.useCase'

export function getSaleUseCaseFactory() {
  const salesRepository = new PrismaSalesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getSaleUseCase = new GetSaleUseCase(salesRepository, clinicsRepository, employeesRepository)

  return getSaleUseCase
}
