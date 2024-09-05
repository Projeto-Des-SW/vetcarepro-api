import { Schedule } from '@prisma/client'

import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { EmployeesRepository } from '@/repositories/interfaces/employees.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  schedule_id: string
  date: Date
}

interface IResponse {
  schedule: Schedule
}

export class UpdateScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository, private clinicsRepository: ClinicsRepository, private employeesRepository: EmployeesRepository) {}

  async execute({ user_id, clinic_id, schedule_id, date }: IRequest): Promise<IResponse> {
    let clinic

    clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      const employee = await this.employeesRepository.findById(user_id)

      clinic = await this.clinicsRepository.findById(employee!.clinic_id)
    }

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const schedule = await this.schedulesRepository.findByIdAndClinicId(schedule_id, clinic_id)

    if (!schedule) {
      throw new ResourceNotFoundError()
    }

    schedule.date = date
    await this.schedulesRepository.save(schedule)

    return { schedule }
  }
}
