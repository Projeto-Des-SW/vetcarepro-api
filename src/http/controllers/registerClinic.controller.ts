import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerClinicUseCaseFactory } from '@/useCases/factories/registerClinicUseCase.factory'
import { ClinicAlreadyExistsError } from '@/errors/clinicAlreadyExists.error'

export async function registerClinicController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_body_schema = z.object({
    cnpj: z.string(),
    title: z.string(),
    description: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string()
  })

  const {
    cnpj,
    title,
    description,
    email,
    phone,
    address
  } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerClinicUseCase = registerClinicUseCaseFactory()

    await registerClinicUseCase.execute({
      user_id,
      cnpj,
      title,
      description,
      email,
      phone,
      address
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ClinicAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
