import { SchedulesRepository } from '@/repositories/interfaces/schedules.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  schedule_id: string
}

export class DeleteScheduleUseCase {
  constructor(private schedulesRepository: SchedulesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, schedule_id }: IRequest): Promise<void> {
    const clinic = await this.clinicsRepository.findByIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const schedule = await this.schedulesRepository.findByIdAndClinicId(schedule_id, clinic_id)

    if (!schedule) {
      throw new ResourceNotFoundError()
    }

    await this.schedulesRepository.delete(schedule_id)
  }
}
