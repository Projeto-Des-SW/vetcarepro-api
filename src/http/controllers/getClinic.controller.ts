import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getClinicUseCaseFactory } from '@/useCases/factories/getClinicUseCase.factory'

export async function getClinicController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listClinicsUseCase = getClinicUseCaseFactory()

  const { clinic } = await listClinicsUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(clinic)
}
