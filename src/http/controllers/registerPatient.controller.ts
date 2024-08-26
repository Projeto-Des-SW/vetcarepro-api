import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerPatientUseCaseFactory } from '@/useCases/factories/registerPatientUseCase.factory'
import { PatientAlreadyExistsError } from '@/errors/patientAlreadyExists.error'

export async function registerPatientController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const register_body_schema = z.object({
    name: z.string(),
    species: z.string(),
    age: z.string(),
    breed: z.string(),
    guardian_name: z.string(),
    guardian_cpf: z.string(),
    guardian_contact: z.string(),
  })

  const { clinic_id } = register_params_schema.parse(request.params)
  
  const { 
    name,
    species,
    age,
    breed,
    guardian_name,
    guardian_cpf,
    guardian_contact
  } = register_body_schema.parse(request.body)

  const user_id = request.user.sub

  try {
    const registerPatientUseCase = registerPatientUseCaseFactory()

    await registerPatientUseCase.execute({
      user_id,
      clinic_id,
      name,
      species,
      age,
      breed,
      guardian_name,
      guardian_cpf,
      guardian_contact
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof PatientAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
