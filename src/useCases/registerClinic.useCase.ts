import { Clinic, $Enums } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ClinicAlreadyExistsError } from '@/errors/clinicAlreadyExists.error' 

interface IRequest {
  user_id: string
  cnpj: string
  title: string
  description: string
  email: string
  phone: string
  address: string
}

interface IResponse {
  clinic: Clinic
}

export class RegisterClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository) {}

  async execute({ user_id, cnpj, title, description, email, phone, address }: IRequest): Promise<IResponse> {
    const clinic_with_same_title = await this.clinicsRepository.findByTitle(title)

    if (clinic_with_same_title) {
      throw new ClinicAlreadyExistsError()
    }

    const clinic_with_same_cnpj = await this.clinicsRepository.findByDocument(cnpj)

    if (clinic_with_same_cnpj) {
      throw new ClinicAlreadyExistsError()
    }

    const clinic = await this.clinicsRepository.create({ 
      user_id,
      cnpj,
      title, 
      description, 
      email, 
      phone, 
      address
    })

    return { clinic }
  }
}
