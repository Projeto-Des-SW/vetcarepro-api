import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getProfileUseCaseFactory } from '@/useCases/factories/getProfileUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = params_schema.parse(request.params)

  const user_id = request.user.sub

  try {
    const getProfileUseCase = getProfileUseCaseFactory()

    const profile = await getProfileUseCase.execute({ user_id, clinic_id })

    return reply.status(200).send(profile)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
