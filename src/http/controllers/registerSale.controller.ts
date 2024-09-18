import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerSaleUseCaseFactory } from '@/useCases/factories/registerSaleUseCase.factory'
import { ScheduleAlreadyExistsError } from '@/errors/scheduleAlreadyExists.error'

export async function registerSaleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    patient_id: z.string().uuid(),
    service_id: z.string().uuid(),
    products: z.string().array()
  })

  const { clinic_id } = register_params_schema.parse(request.params)
  
  const { patient_id, products } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerSaleUseCase = registerSaleUseCaseFactory()

    await registerSaleUseCase.execute({
      user_id,
      clinic_id,
      patient_id,
      products
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ScheduleAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
