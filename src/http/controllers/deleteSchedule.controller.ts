import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deleteScheduleUseCaseFactory } from '@/useCases/factories/deleteScheduleUseCase.factory'

export async function deleteScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    schedule_id: z.string().uuid()
  })

  const { clinic_id, schedule_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deleteScheduleUseCase = deleteScheduleUseCaseFactory()

  await deleteScheduleUseCase.execute({ user_id, clinic_id, schedule_id })

  return reply.status(200).send()
}
