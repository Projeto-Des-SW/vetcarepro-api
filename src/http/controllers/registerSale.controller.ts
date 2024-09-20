import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerSaleUseCaseFactory } from '@/useCases/factories/registerSaleUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function registerSaleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const body_schema = z.object({
    patient_id: z.string().uuid(),
    products: z.string().array()
  })

  const { clinic_id } = params_schema.parse(request.params)
  
  const { patient_id, products } = body_schema.parse(request.body)

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
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
