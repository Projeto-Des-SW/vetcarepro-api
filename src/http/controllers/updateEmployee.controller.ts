import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateEmployeeUseCaseFactory } from '@/useCases/factories/updateEmployeeUseCase.factory'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function updateEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    employee_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    name: z.string(),
    email: z.string().email()
  })

  const { clinic_id, employee_id } = register_params_schema.parse(request.params)

  const { name, email } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateEmployeeUseCase = updateEmployeeUseCaseFactory()

    await updateEmployeeUseCase.execute({
      user_id,
      clinic_id,
      employee_id,
      name,
      email
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
