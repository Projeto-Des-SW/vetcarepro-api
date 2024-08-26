import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listPatientsUseCaseFactory } from '@/useCases/factories/listPatientsUseCase.factory'

export async function listPatientsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listPatientsUseCase = listPatientsUseCaseFactory()

  const { patients } = await listPatientsUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(patients)
}
