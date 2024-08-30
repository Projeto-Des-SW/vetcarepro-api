import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { authenticateUserUseCaseFactory } from '@/useCases/factories/authenticateUserUseCase.factory'
import { InvalidCredentialsError } from '@/errors/invalidCredentials.error'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticate_body_schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticate_body_schema.parse(request.body)

  try {
    const authenticateUserUseCase = authenticateUserUseCaseFactory()

    const { user } = await authenticateUserUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
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
