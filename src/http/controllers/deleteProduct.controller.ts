import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deleteProductUseCaseFactory } from '@/useCases/factories/deleteProductUseCase.factory'

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    product_id: z.string().uuid()
  })

  const { clinic_id, product_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deleteProductUseCase = deleteProductUseCaseFactory()

  await deleteProductUseCase.execute({ user_id, clinic_id, product_id })

  return reply.status(200).send()
}
