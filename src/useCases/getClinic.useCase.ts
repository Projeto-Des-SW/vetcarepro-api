import { Clinic } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  clinic_id: string
}

interface IResponse {
  clinic: Clinic
}

export class GetClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository, private usersRepository: UsersRepository) {}

  async execute({ user_id, clinic_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const clinic = await this.clinicsRepository.findByIdAndUserId(clinic_id, user_id)

    if (!clinic) {
      throw new ResourceNotFoundError()
    }

    return { clinic }
  }
}
