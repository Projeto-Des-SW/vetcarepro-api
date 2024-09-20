import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateProductUseCaseFactory } from '@/useCases/factories/updateProductUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid(),
    product_id: z.string().uuid()
  })

  const body_schema = z.object({
    title: z.string(),
    amount: z.string(),
    quantity: z.number()
  })
  
  const { clinic_id, product_id } = params_schema.parse(request.params)

  const { title, amount, quantity } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateProductUseCase = updateProductUseCaseFactory()

    await updateProductUseCase.execute({ 
      user_id, 
      clinic_id,    
      product_id,
      title,
      amount,
      quantity
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
