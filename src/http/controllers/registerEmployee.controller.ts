import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerEmployeeUseCaseFactory } from '@/useCases/factories/registerEmployeeUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function registerEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const body_schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    position: z.string(),
    salary: z.string(),
    role: z.enum(['MANAGER', 'VETERINARY', 'SECRETARY'])
  })

  const { clinic_id } = params_schema.parse(request.params)

  const { name, email, password, position, salary, role } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerEmployeeUseCase = registerEmployeeUseCaseFactory()

    await registerEmployeeUseCase.execute({
      user_id,
      clinic_id,
      name,
      email,
      password,
      salary, 
      position,
      role
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
