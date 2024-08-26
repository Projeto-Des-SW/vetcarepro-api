import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ServicesRepository } from '../interfaces/services.repository'

export class PrismaServicesRepository implements ServicesRepository {
  async create(data: Prisma.ServiceUncheckedCreateInput) {
    return await prisma.service.create({ data })
  }

  async findById(id: string) {
    return await prisma.service.findUnique({
      where: {
        id
      }
    })
  }

  async findByIdAndClinicId(service_id: string, clinic_id: string) {
    return await prisma.service.findUnique({
      where: {
        id: service_id,
        clinic_id
      }
    })
  }

  async findByTitleAndClinicId(id: string, clinic_id: string) {
    return await prisma.service.findUnique({
      where: {
        id,
        clinic_id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.service.findMany({
      where: {
        clinic_id,
      }
    })
  }
}
