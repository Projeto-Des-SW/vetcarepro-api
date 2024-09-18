import { Prisma, Product } from '@prisma/client'

export interface ProductsRepository {
  save(data: Product): Promise<Product>
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
  findById(id: string): Promise<Product | null>
  findByTitleAndClinicId(title: string, clinic_id: string): Promise<Product | null>
  findByProductIdAndClinicId(product_id: string, clinic_id: string): Promise<Product | null>
  listByClinicId(clinic_id: string): Promise<Product[]>
}