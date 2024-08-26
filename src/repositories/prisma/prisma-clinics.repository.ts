import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ClinicsRepository } from '../interfaces/clinics.repository'

export class PrismaClinicsRepository implements ClinicsRepository {
  async create(data: Prisma.ClinicUncheckedCreateInput) {
    return await prisma.clinic.create({ data })
  }

  async findById(id: string) {
    return await prisma.clinic.findUnique({
      where: {
        id
      }
    })
  }

  async findByTitle(title: string) {
    return await prisma.clinic.findUnique({
      where: {
        title
      }
    })
  }

  async findByDocument(cnpj: string) {
    return await prisma.clinic.findUnique({
      where: {
        cnpj
      }
    })
  }

  async findByIdAndUserId(clinic_id: string, user_id: string) {
    return await prisma.clinic.findUnique({
      where: {
        id: clinic_id,
        user_id
      }
    })
  }

  async listByUserId(user_id: string) {
    return await prisma.clinic.findMany({
      where: {
        user_id,
      }
    })
  }
}
