import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listProductsUseCaseFactory } from '@/useCases/factories/listProductsUseCase.factory'

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listProductsUseCase = listProductsUseCaseFactory()

  const { products } = await listProductsUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(products)
}
