import { UsersRepository } from '@/repositories/interfaces/users.repository'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

interface IRequest {
  user_id: string
}

interface IResponse {
  id: string
  name: string
  email: string
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { 
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}
