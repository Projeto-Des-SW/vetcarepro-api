import { Service } from '@prisma/client'

import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  service_id: string
  title: string
  type: string
  amount: string
}

interface IResponse {
  service: Service
}

export class UpdateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, service_id, title, type, amount }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesRepository.findByIdAndClinicId(service_id, clinic_id)

    if (!service) {
      throw new ResourceNotFoundError()
    }

    service.title = title
    service.type = type
    service.amount = amount
    await this.servicesRepository.save(service)

    return { service }
  }
}
