import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateEmployeeUseCaseFactory } from '@/useCases/factories/updateEmployeeUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExists.error'

export async function updateEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid(),
    employee_id: z.string().uuid()
  })

  const body_schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    salary: z.string().optional(),
    position: z.string().optional(),
    last_payment_date: z.date().optional(),
    role: z.enum(['MANAGER', 'VETERINARY', 'SECRETARY']).optional()
  })

  const { clinic_id, employee_id } = params_schema.parse(request.params)

  const { name, email, salary, position, last_payment_date ,role } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateEmployeeUseCase = updateEmployeeUseCaseFactory()

    await updateEmployeeUseCase.execute({
      user_id,
      clinic_id,
      employee_id,
      name,
      email,
      salary,
      position, 
      last_payment_date,
      role
    })

    return reply.status(200).send()
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
