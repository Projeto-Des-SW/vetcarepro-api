import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deleteServiceUseCaseFactory } from '@/useCases/factories/deleteServiceUseCase.factory'

export async function deleteServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    service_id: z.string().uuid()
  })

  const { clinic_id, service_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deleteServiceUseCase = deleteServiceUseCaseFactory()

  await deleteServiceUseCase.execute({ user_id, clinic_id, service_id })

  return reply.status(200).send()
}
