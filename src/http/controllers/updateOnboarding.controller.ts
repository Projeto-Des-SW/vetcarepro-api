import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateOnboardingUseCaseFactory } from '@/useCases/factories/updateOnboardingUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function updateOnboardingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body_schema = z.object({
    onboarding: z.boolean()
  })

  const { onboarding } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateOnboardingUseCase = updateOnboardingUseCaseFactory()

    await updateOnboardingUseCase.execute({
      user_id,
      onboarding
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
