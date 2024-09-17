import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}
export class DeleteClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<void> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    clinic.status = false
    await this.clinicsRepository.save(clinic)
  }
}
