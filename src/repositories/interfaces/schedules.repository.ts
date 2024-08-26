import { Prisma, Schedule } from '@prisma/client'

export interface SchedulesRepository {
  create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
  findById(id: string): Promise<Schedule | null>
  findByIdAndClinicId(schedule_id: string, clinic_id: string): Promise<Schedule | null>
  listByClinicId(clinic_id: string): Promise<Schedule[]>
}