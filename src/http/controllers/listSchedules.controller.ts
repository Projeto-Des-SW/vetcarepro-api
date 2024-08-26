import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listSchedulesUseCaseFactory } from '@/useCases/factories/listSchedulesUseCase.factory'

export async function listSchedulesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listSchedulesUseCase = listSchedulesUseCaseFactory()

  const { schedules } = await listSchedulesUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(schedules)
}
