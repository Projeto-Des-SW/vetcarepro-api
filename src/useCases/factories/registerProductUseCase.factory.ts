import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { RegisterProductUseCase } from '@/useCases/registerProduct.useCase'

export function registerProductUseCaseFactory() {
  const clinicsRepository = new PrismaClinicsRepository()
  const productsRepository = new PrismaProductsRepository()
  const registerProductUseCase = new RegisterProductUseCase(productsRepository, clinicsRepository)

  return registerProductUseCase
}
