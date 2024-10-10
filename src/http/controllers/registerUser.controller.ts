import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerUserUseCaseFactory } from '@/useCases/factories/registerUserUseCase.factory'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    tier: z.enum(['TIER_ONE', 'TIER_TWO', 'TIER_THREE'])
  })

  const { name, email, password, tier } = body_schema.parse(request.body)

  try {
    const registerUserUseCase = registerUserUseCaseFactory()

    await registerUserUseCase.execute({
      name,
      email,
      password,
      tier
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
