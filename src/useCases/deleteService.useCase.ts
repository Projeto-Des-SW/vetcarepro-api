import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  service_id: string
}
export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, service_id }: IRequest): Promise<void> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesRepository.findByServiceIdAndClinicId(service_id, clinic_id)

    if (!service) {
      throw new ResourceNotFoundError()
    }

    await this.servicesRepository.delete(service_id)
  }
}
