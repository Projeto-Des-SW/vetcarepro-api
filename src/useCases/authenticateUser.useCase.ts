import { User } from '@prisma/client'

import { HashProvider } from '@/providers/hash/hash.provider'
import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { InvalidCredentialsError } from '@/errors/invalidCredentials.error'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository, private hashProvider: HashProvider) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const does_password_matches = await this.hashProvider.compareHash(password, user.password_hash)

    if (!does_password_matches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
