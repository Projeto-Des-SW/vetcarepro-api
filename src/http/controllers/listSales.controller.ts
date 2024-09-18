import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listSalesUseCaseFactory } from '@/useCases/factories/listSalesUseCase.factory'

export async function listSalesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listSalesUseCase = listSalesUseCaseFactory()

  const { sales } = await listSalesUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(sales)
}
