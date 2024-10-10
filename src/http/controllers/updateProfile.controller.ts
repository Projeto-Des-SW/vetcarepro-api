import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateProfileUseCaseFactory } from '@/useCases/factories/updateProfileUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateProfileUseCase = updateProfileUseCaseFactory()

    await updateProfileUseCase.execute({
      user_id,
      name,
      email,
      password
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
