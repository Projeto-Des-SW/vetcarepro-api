import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateTierUseCaseFactory } from '@/useCases/factories/updateTierUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function updateTierController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body_schema = z.object({
    tier: z.enum(['TIER_ONE', 'TIER_TWO', 'TIER_THREE'])
  })

  const { tier } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateTierUseCase = updateTierUseCaseFactory()

    await updateTierUseCase.execute({
      user_id,
      tier
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
