import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { RegisterSaleUseCase } from '@/useCases/registerSale.useCase'

export function registerSaleUseCaseFactory() {
  const salesRepository = new PrismaSalesRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const productsRepository = new PrismaProductsRepository()
  const registerProductUseCase = new RegisterSaleUseCase(salesRepository, employeesRepository, clinicsRepository, patientsRepository, productsRepository)

  return registerProductUseCase
}
