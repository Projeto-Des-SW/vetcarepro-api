import { Prisma, Service } from '@prisma/client'

import { prisma } from '@/prisma'
import { ServicesRepository } from '../interfaces/services.repository'

export class PrismaServicesRepository implements ServicesRepository {
  async save(data: Service) {
    return await prisma.service.update({ 
      where: {
        id: data.id
      },
      data
    })
  }

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

  async findByTitleAndClinicId(title: string, clinic_id: string) {
    return await prisma.service.findFirst({
      where: {
        title,
        clinic_id
      }
    })
  }

  async findByServiceIdAndClinicId(service_id: string, clinic_id: string) {
    return await prisma.service.findUnique({
      where: {
        id: service_id,
        clinic_id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.service.findMany({
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
