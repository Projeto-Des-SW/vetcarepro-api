import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateScheduleUseCaseFactory } from '@/useCases/factories/updateScheduleUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function updateScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid(),
    schedule_id: z.string().uuid()
  })

  const body_schema = z.object({
    date: z.date()
  })
  
  const { clinic_id, schedule_id } = params_schema.parse(request.params)

  const { date } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const updateScheduleUseCase = updateScheduleUseCaseFactory()

    await updateScheduleUseCase.execute({ 
      user_id, 
      clinic_id,    
      schedule_id,
      date
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
