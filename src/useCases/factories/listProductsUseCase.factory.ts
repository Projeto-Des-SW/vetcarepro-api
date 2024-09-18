import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees.repository'
import { ListProductsUseCase } from '@/useCases/listProducts.useCase'

export function listProductsUseCaseFactory() {
  const productsRepository = new PrismaProductsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const employeesRepository = new PrismaEmployeesRepository()
  const listProductsUseCase = new ListProductsUseCase(productsRepository, clinicsRepository, employeesRepository)

  return listProductsUseCase
}
