import { User, $Enums } from '@prisma/client'

import { verifyEmail } from '@/util/verifyEmail'
import { HashProvider } from '@/providers/hash/hash.provider'
import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

interface IRequest {
  name: string
  email: string
  password: string
  tier: $Enums.Tiers
}

interface IResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository, private hashProvider: HashProvider) {}

  async execute({ name, email, password, tier }: IRequest): Promise<IResponse> {
    const with_same_email = await verifyEmail(email)

    if (with_same_email) {
      throw new UserAlreadyExistsError()
    }
    
    const password_hash = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      tier
    })

    return { user }
  }
}
