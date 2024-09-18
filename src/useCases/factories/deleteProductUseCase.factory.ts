import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products.repository'
import { PrismaClinicsRepository } from '@/repositories/prisma/prisma-clinics.repository'
import { DeleteProductUseCase } from '@/useCases/deleteProduct.useCase'

export function deleteProductUseCaseFactory() {
  const productsRepository = new PrismaProductsRepository()
  const clinicsRepository = new PrismaClinicsRepository()
  const deleteProductUseCase = new DeleteProductUseCase(productsRepository, clinicsRepository)

  return deleteProductUseCase
}
