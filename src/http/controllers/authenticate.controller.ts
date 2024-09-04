import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { authenticateUseCaseFactory } from '@/useCases/factories/authenticateUseCase.factory'
import { InvalidCredentialsError } from '@/errors/invalidCredentials.error'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticate_body_schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticate_body_schema.parse(request.body)

  try {
    const authenticateUseCase = authenticateUseCaseFactory()

    const authenticate = await authenticateUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: authenticate!.user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
