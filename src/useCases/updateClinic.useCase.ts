import { Clinic, $Enums } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
  cnpj: string
  title: string
  description: string
  email: string
  phone: string
  address: string,
  tier: $Enums.Tiers
}

interface IResponse {
  clinic: Clinic
}

export class UpdateClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, clinic_id, cnpj, title, description, email, phone, address, tier }: IRequest): Promise<IResponse> {
    const clinic = await this.clinicsRepository.findByClinicIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    clinic.cnpj = cnpj
    clinic.title = title
    clinic.description = description
    clinic.email = email
    clinic.phone = phone
    clinic.address = address
    clinic.tier = tier

    await this.clinicsRepository.save(clinic)

    return { clinic }
  }
}
