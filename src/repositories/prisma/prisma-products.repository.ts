import { Prisma, Product } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ProductsRepository } from '../interfaces/products.repository'

export class PrismaProductsRepository implements ProductsRepository {
  async save(data: Product) {
    return await prisma.product.update({ 
      where: {
        id: data.id
      },
      data
    })
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return await prisma.product.create({ data })
  }

  async findById(id: string) {
    return await prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async findByTitleAndClinicId(title: string, clinic_id: string) {
    return await prisma.product.findFirst({
      where: {
        title,
        clinic_id
      }
    })
  }

  async findByProductIdAndClinicId(product_id: string, clinic_id: string) {
    return await prisma.product.findUnique({
      where: {
        id: product_id,
        clinic_id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.product.findMany({
      where: {
        clinic_id,
        status: true
      },
      orderBy: [
        {
          title: 'asc'
        }
      ]
    })
  }
}
