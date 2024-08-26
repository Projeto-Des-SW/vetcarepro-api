import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateServiceUseCaseFactory } from '@/useCases/factories/updateServiceUseCase.factory'

export async function updateServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    service_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    title: z.string(),
    type: z.string(),
    amount: z.string()
  })
  
  const { clinic_id, service_id } = register_params_schema.parse(request.params)

  const { title, type, amount } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  const updateServiceUseCase = updateServiceUseCaseFactory()

  await updateServiceUseCase.execute({ 
    user_id, 
    clinic_id,    
    service_id,
    title,
    type,
    amount
  })

  return reply.status(200).send()
}
