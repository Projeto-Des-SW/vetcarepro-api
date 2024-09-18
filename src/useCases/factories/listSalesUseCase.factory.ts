import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListSalesUseCase } from '@/useCases/listSales.useCase'

export function listSalesUseCaseFactory() {
  const salesRepository = new PrismaSalesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listSalesUseCase = new ListSalesUseCase(salesRepository, clinicsRepository, employeesRepository)

  return listSalesUseCase
}
