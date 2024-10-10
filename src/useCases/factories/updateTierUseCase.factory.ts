import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UpdateTierUseCase } from '@/useCases/updateTier.useCase'

export function updateTierUseCaseFactory() {
  const usersRepository = new PrismaUsersRepository()
  const updateTierUseCase = new UpdateTierUseCase(usersRepository)

  return updateTierUseCase
}
