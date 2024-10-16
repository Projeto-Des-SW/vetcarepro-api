import { Prisma, Schedule } from '@prisma/client'

import { prisma } from '@/prisma'
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
      data: {
        status_schedule: data.status_schedule,
        date: new Date(data.date),
        updated_at: new Date(),
        clinic: {
          connect: { id: data.clinic_id }
        },
        patient: {
          connect: { id: data.patient_id },
        },
        service: {
          connect: { id: data.service_id }
        },
      }
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
      },
      include: {
        clinic: true,
        patient: true,
        service: true
      }
    })
  }

  async listByClinicId(clinic_id: string) {
    return await prisma.schedule.findMany({
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
        service: true
      }
    })
  }

  async listByClinicIdAndPatientId(clinic_id: string, patient_id: string) {
    return await prisma.schedule.findMany({
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
        service: true
      }
    })
  }

  async listByClinicIdGetFinished(clinic_id: string) {
    return await prisma.schedule.findMany({
      where: {
        clinic_id,
        status_schedule: 'FINISHED'
      },
      include: {
        clinic: true,
        patient: true,
        service: true
      }
    })
  }

  async listByClinicIdGetIsNotFinished(clinic_id: string) {
    return await prisma.schedule.findMany({
      where: {
        clinic_id,
        status_schedule: {
          not: 'FINISHED'
        }
      },
      include: {
        clinic: true,
        patient: true,
        service: true
      }
    })
  }
}
