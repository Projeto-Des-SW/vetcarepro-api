import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getServiceUseCaseFactory } from '@/useCases/factories/getServiceUseCase.factory'

export async function getServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    service_id: z.string().uuid()
  })

  const { clinic_id, service_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const getServiceUseCase = getServiceUseCaseFactory()

  const { service } = await getServiceUseCase.execute({ user_id, clinic_id, service_id })

  return reply.status(200).send(service)
}
