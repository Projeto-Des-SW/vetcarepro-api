import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerProductUseCaseFactory } from '@/useCases/factories/registerProductUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { ProductAlreadyExistsError } from '@/errors/productAlreadyExists.error'

export async function registerProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const body_schema = z.object({
    title: z.string(),
    amount: z.string(),
    quantity: z.number()
  })

  const { clinic_id } = params_schema.parse(request.params)
  
  const { title, amount, quantity } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerProductUseCase = registerProductUseCaseFactory()

    await registerProductUseCase.execute({
      user_id,
      clinic_id,
      title,
      amount,
      quantity
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    
    if (error instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
