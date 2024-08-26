import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { profileUseCaseFactory } from '@/useCases/factories/profileUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user_id = request.user.sub

  try {
    const profileUseCase = profileUseCaseFactory()

    const user = await profileUseCase.execute({ user_id })

    return reply.status(200).send(user)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
