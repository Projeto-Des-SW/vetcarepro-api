import { Prisma, Sale } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { SalesRepository } from '../interfaces/sales.repository'

export class PrismaSalesRepository implements SalesRepository {
  async save(data: Sale) {
    return await prisma.sale.update({ 
      where: {
        id: data.id
      },
      data
    })
  }

  async create(data: Prisma.SaleUncheckedCreateInput) {
    return await prisma.sale.create({ data })
  }

  async findById(id: string) {
    return await prisma.sale.findUnique({
      where: {
        id
      }
    })
  }

  async findBySaleIdAndClinicId(sale_id: string, clinic_id: string) {
    return await prisma.sale.findUnique({
      where: {
        id: sale_id,
        clinic_id
      },
      include: {
        clinic: true,
        patient: true,
        products: true
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.sale.findMany({
      where: {
        clinic_id,
      },
      orderBy: [
        {
          created_at: 'desc'
        }
      ],
      include: {
        clinic: true,
        patient: true,
        products: true
      }
    })
  }

  async listByClinicIdAndPatientId(clinic_id: string, patient_id: string) {
    return await prisma.sale.findMany({
      where: {
        clinic_id,
        patient_id
      },
      orderBy: [
        {
          created_at: 'desc'
        }
      ],
      include: {
        clinic: true,
        patient: true,
        products: true
      }
    })
  }
}
