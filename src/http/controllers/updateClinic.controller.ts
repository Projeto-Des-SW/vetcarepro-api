import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updateClinicUseCaseFactory } from '@/useCases/factories/updateClinicUseCase.factory'

export async function updateClinicController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    cnpj: z.string(),
    title: z.string(),
    description: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string()
  })
  
  const { clinic_id } = register_params_schema.parse(request.params)

  const {
    cnpj,
    title,
    description,
    email,
    phone,
    address
  } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  const updateClinicUseCase = updateClinicUseCaseFactory()

  await updateClinicUseCase.execute({ 
    user_id, 
    clinic_id,    
    cnpj,
    title,
    description,
    email,
    phone,
    address 
  })

  return reply.status(200).send()
}
