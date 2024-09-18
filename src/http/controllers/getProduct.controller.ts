import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getProductUseCaseFactory } from '@/useCases/factories/getProductUseCase.factory'

export async function getProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    product_id: z.string().uuid()
  })

  const { clinic_id, product_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const getProductUseCase = getProductUseCaseFactory()

  const { product } = await getProductUseCase.execute({ user_id, clinic_id, product_id })

  return reply.status(200).send(product)
}
