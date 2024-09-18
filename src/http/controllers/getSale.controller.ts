import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getSaleUseCaseFactory } from '@/useCases/factories/getSaleUseCase.factory'

export async function getSaleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    sale_id: z.string().uuid()
  })

  const { clinic_id, sale_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const getSaleUseCase = getSaleUseCaseFactory()

  const { sale } = await getSaleUseCase.execute({ user_id, clinic_id, sale_id })

  return reply.status(200).send(sale)
}
