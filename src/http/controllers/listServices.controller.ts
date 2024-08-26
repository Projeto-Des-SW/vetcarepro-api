import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listServicesUseCaseFactory } from '@/useCases/factories/listServicesUseCase.factory'

export async function listServicesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listServicesUseCase = listServicesUseCaseFactory()

  const { services } = await listServicesUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(services)
}
