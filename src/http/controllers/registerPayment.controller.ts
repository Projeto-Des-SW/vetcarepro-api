import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerPaymentUseCaseFactory } from '@/useCases/factories/registerPaymentsUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function registerPaymentController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid(),
    employee_id: z.string().uuid()
  })

  const { clinic_id, employee_id } = params_schema.parse(request.params)
  
  const user_id = request.user.sub

  try {
    const registerPaymentUseCase = registerPaymentUseCaseFactory()

    await registerPaymentUseCase.execute({
      user_id,
      clinic_id,
      employee_id
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
   
    throw error
  }
}
