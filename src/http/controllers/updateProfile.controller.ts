import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateServiceUseCaseFactory } from '@/useCases/factories/updateProfileUseCase.factory'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_body_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = register_body_schema.parse(request.body)

  const id = request.user.sub

  try {
    const updateServiceUseCase = updateServiceUseCaseFactory()

    await updateServiceUseCase.execute({
      id,
      name,
      email,
      password
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
