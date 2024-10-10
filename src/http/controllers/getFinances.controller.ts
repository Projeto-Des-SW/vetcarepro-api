import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getFinancesUseCaseFactory } from '@/useCases/factories/getFinancesUseCase.factory'

export async function getFinancesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = params_schema.parse(request.params)

  const user_id = request.user.sub

  const getFinancesUseCase = getFinancesUseCaseFactory()

  const { totalValueSchedulesPending, totalValueSchedulesFinished, totalValueSales } = await getFinancesUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send({ totalValueSchedulesPending, totalValueSchedulesFinished, totalValueSales })
}
