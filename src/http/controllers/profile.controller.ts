import { FastifyRequest, FastifyReply } from 'fastify'

import { profileUseCaseFactory } from '@/useCases/factories/profileUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const id = request.user.sub

  try {
    const profileUseCase = profileUseCaseFactory()

    const profile = await profileUseCase.execute({ id })

    return reply.status(200).send(profile)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
