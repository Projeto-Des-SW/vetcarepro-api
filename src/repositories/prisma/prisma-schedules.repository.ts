import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { SchedulesRepository } from '../interfaces/schedules.repository'

export class PrismaSchedulesRepository implements SchedulesRepository {
  async create(data: Prisma.ScheduleUncheckedCreateInput) {
    return await prisma.schedule.create({ data })
  }

  async findById(id: string) {
    return await prisma.schedule.findUnique({
      where: {
        id
      }
    })
  }

  async findByIdAndClinicId(schedule_id: string, clinic_id: string) {
    return await prisma.schedule.findUnique({
      where: {
        id: schedule_id,
        clinic_id
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.schedule.findMany({
      where: {
        clinic_id,
      }
    })
  }
}
