import { Prisma, Schedule } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { SchedulesRepository } from '../interfaces/schedules.repository'

export class PrismaSchedulesRepository implements SchedulesRepository {
  async delete(schedule_id: string) {
    await prisma.schedule.delete({
      where: {
        id: schedule_id
      }
    })
  }

  async save(data: Schedule) {
    return await prisma.schedule.update({ 
      where: {
        id: data.id
      },
      data
    })
  }

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

  async findByScheduleIdAndClinicId(schedule_id: string, clinic_id: string) {
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
