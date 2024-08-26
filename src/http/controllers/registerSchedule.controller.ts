import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerScheduleUseCaseFactory } from '@/useCases/factories/registerScheduleUseCase.factory'
import { ScheduleAlreadyExistsError } from '@/errors/scheduleAlreadyExists.error'

export async function registerScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    patient_id: z.string().uuid(),
    service_id: z.string().uuid(),
    date: z.date()
  })

  const { clinic_id } = register_params_schema.parse(request.params)
  
  const { patient_id, service_id, date } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerScheduleUseCase = registerScheduleUseCaseFactory()

    await registerScheduleUseCase.execute({
      user_id,
      clinic_id,
      patient_id,
      service_id,
      date
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ScheduleAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
