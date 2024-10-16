import { Prisma, Schedule } from '@prisma/client'

export interface SchedulesRepository {
  delete(schedule_id: string): Promise<void>
  save(data: Schedule): Promise<Schedule>
  create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
  findById(id: string): Promise<Schedule | null>
  findByScheduleIdAndClinicId(schedule_id: string, clinic_id: string): Promise<Schedule | null>
  listByClinicId(clinic_id: string): Promise<Schedule[]>
  listByClinicIdAndPatientId(clinic_id: string, patient_id: string): Promise<Schedule[]>
  listByClinicIdGetFinished(clinic_id: string): Promise<Schedule[]>
  listByClinicIdGetIsNotFinished(clinic_id: string): Promise<Schedule[]>
}