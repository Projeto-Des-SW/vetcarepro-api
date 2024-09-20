import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { updatePatientUseCaseFactory } from '@/useCases/factories/updatePatientUseCase.factory'
import { ResourceNotFoundError } from '@/errors/resourceNotFound.error'

export async function updatePatientController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params_schema = z.object({
    clinic_id: z.string().uuid(),
    patient_id: z.string().uuid()
  })

  const body_schema = z.object({
    name: z.string(),
    species: z.string(),
    age: z.string(),
    breed: z.string(),
    guardian_name: z.string(),
    guardian_cpf: z.string(),
    guardian_contact: z.string()
  })
  
  const { clinic_id, patient_id } = params_schema.parse(request.params)

  try {
    const {     
      name,
      species,
      age,
      breed,
      guardian_name,
      guardian_cpf,
      guardian_contact
    } = body_schema.parse(request.body)

    const user_id = request.user.sub

    const updatePatientUseCase = updatePatientUseCaseFactory()

    await updatePatientUseCase.execute({ 
      user_id, 
      clinic_id,    
      patient_id,
      name,
      species,
      age,
      breed,
      guardian_name,
      guardian_cpf,
      guardian_contact
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
