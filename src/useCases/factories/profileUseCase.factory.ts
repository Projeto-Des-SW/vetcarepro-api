import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { ProfileUseCase } from '@/useCases/profile.useCase'

export function profileUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const profileUseCase = new ProfileUseCase(usersRepository)

  return profileUseCase
}
