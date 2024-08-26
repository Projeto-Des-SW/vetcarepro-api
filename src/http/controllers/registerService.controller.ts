import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerServiceUseCaseFactory } from '@/useCases/factories/registerServiceUseCase.factory'
import { ServiceAlreadyExistsError } from '@/errors/serviceAlreadyExists.error'

export async function registerServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    title: z.string(),
    type: z.string(),
    amount: z.string()
  })

  const { clinic_id } = register_params_schema.parse(request.params)
  
  const { title, type, amount } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerServiceUseCase = registerServiceUseCaseFactory()

    await registerServiceUseCase.execute({
      user_id,
      clinic_id,
      title,
      type,
      amount
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ServiceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
