import { Service } from '@prisma/client'

import { ServicesRepository } from '@/repositories/interfaces/services.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ServiceAlreadyExistsError } from '@/errors/serviceAlreadyExists.error' 
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
  clinic_id: string
  title: string
  type: string
  amount: string
}

interface IResponse {
  service: Service
}

export class RegisterServiceUseCase {
  constructor(private servicesRepository: ServicesRepository, private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, title, type, amount }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    const service_with_same_title = await this.servicesRepository.findByTitleAndClinicId(title, clinic_id)

    if (service_with_same_title) {
      throw new ServiceAlreadyExistsError()
    }

    const service = await this.servicesRepository.create({ 
      clinic_id,
      title, 
      type, 
      amount
    })

    return { service }
  }
}
