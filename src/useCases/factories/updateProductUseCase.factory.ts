import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { UpdateProductUseCase } from '@/useCases/updateProduct.useCase'

export function updateProductUseCaseFactory() {
  const productsRepository = new PrismaProductsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const updateProductUseCase = new UpdateProductUseCase(productsRepository, clinicsRepository)

  return updateProductUseCase
}
