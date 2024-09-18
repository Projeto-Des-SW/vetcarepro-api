import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateOnboardingUseCaseFactory } from '@/useCases/factories/updateOnboardingUseCase.factory'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function updateOnboardingController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_body_schema = z.object({
    id: z.string(),
    onboarding: z.boolean()
  })

  const { onboarding } = register_body_schema.parse(request.body)

  const id = request.user.sub

  try {
    const updateOnboardingUseCase = updateOnboardingUseCaseFactory()

    await updateOnboardingUseCase.execute({
      id,
      onboarding
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
