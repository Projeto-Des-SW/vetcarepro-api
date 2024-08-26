import { Clinic } from '@prisma/client'

import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { ClinicAlreadyExistsError } from '@/errors/clinicAlreadyExists.error' 
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error' 

interface IRequest {
  user_id: string
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
  constructor(private clinicsRepository: ClinicsRepository, private usersRepository: UsersRepository) {}

  async execute({ user_id, title, description, email, phone, address }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const clinic_with_same_title = await this.clinicsRepository.findByTitle(title)

    if (clinic_with_same_title) {
      throw new ClinicAlreadyExistsError()
    }

    const clinic = await this.clinicsRepository.create({ 
      user_id,
      title, 
      description, 
      email, 
      phone, 
      address
    })

    return { clinic }
  }
}
