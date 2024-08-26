import { Clinic } from '@prisma/client'

import { ClinicsRepository } from '@/repositories/interfaces/clinics.repository'
import { UsersRepository } from '@/repositories/interfaces/users.repository'

interface IRequest {
  user_id: string
}

interface IResponse {
  clinics: Clinic[]
}

export class ListClinicsUseCase {
  constructor(private clinicsRepository: ClinicsRepository, private usersRepository: UsersRepository) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const clinics = await this.clinicsRepository.listByUserId(user_id)

    return { clinics }
  }
}
