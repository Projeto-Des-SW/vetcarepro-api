import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getScheduleUseCaseFactory } from '@/useCases/factories/getScheduleUseCase.factory'

export async function getScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    schedule_id: z.string().uuid()
  })

  const { clinic_id, schedule_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const getScheduleUseCase = getScheduleUseCaseFactory()

  const { schedule } = await getScheduleUseCase.execute({ user_id, clinic_id, schedule_id })

  return reply.status(200).send(schedule)
}
