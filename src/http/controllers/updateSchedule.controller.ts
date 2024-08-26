import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateScheduleUseCaseFactory } from '@/useCases/factories/updateScheduleUseCase.factory'

export async function updateScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    schedule_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    date: z.date()
  })
  
  const { clinic_id, schedule_id } = register_params_schema.parse(request.params)

  const { date } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  const updateScheduleUseCase = updateScheduleUseCaseFactory()

  await updateScheduleUseCase.execute({ 
    user_id, 
    clinic_id,    
    schedule_id,
    date
  })

  return reply.status(200).send()
}
