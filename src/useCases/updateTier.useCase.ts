import { User, $Enums } from '@prisma/client'

import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
  tier: $Enums.Tiers
}

interface IResponse {
  user: User
}

export class UpdateTierUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ user_id, tier }: IRequest): Promise<IResponse | undefined> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }
  
    user.tier = tier
    await this.usersRepository.save(user)

    return { user }
  }
}
