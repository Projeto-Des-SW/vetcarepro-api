import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { GetProductUseCase } from '@/useCases/getProduct.useCase'

export function getProductUseCaseFactory() {
  const productsRepository = new PrismaProductsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const getProductUseCase = new GetProductUseCase(productsRepository, clinicsRepository, employeesRepository)

  return getProductUseCase
}
