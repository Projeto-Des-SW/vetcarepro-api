import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerEmployeeUseCaseFactory } from '@/useCases/factories/registerEmployeeUseCase.factory'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function registerEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const { name, email, password } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerEmployeeUseCase = registerEmployeeUseCaseFactory()

    await registerEmployeeUseCase.execute({
      user_id,
      clinic_id,
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
