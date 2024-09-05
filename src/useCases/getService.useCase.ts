import { Service } from '@prisma/client'

import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  service_id: string
}

interface IResponse {
  service: Service
}

export class GetServiceUseCase {
  constructor(private servicesRepository: ServicesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, service_id }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesRepository.findByIdAndClinicId(service_id, clinic_id)

    if (!service) {
      throw new ResourceNotFoundError()
    }

    return { service }
  }
}
