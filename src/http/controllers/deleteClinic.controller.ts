import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deleteClinicUseCaseFactory } from '@/useCases/factories/deleteClinicUseCase.factory'

export async function deleteClinicController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deleteClinicUseCase = deleteClinicUseCaseFactory()

  await deleteClinicUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send()
}
