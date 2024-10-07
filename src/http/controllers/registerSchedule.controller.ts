import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerScheduleUseCaseFactory } from '@/useCases/factories/registerScheduleUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'
import { ScheduleAlreadyExistsError } from '@/errors/scheduleAlreadyExists.error'

export async function registerScheduleController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const body_schema = z.object({
    patient_id: z.string().uuid(),
    service_id: z.string().uuid(),
    employee_id: z.string().uuid(),
    date: z.string()
  })

  const { clinic_id } = params_schema.parse(request.params)
  
  const { patient_id, service_id, employee_id, date } = body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerScheduleUseCase = registerScheduleUseCaseFactory()

    await registerScheduleUseCase.execute({
      user_id,
      clinic_id,
      patient_id,
      service_id,
      employee_id,
      date: new Date(date)
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    
    if (error instanceof ScheduleAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
