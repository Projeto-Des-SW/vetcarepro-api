import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deletePatientUseCaseFactory } from '@/useCases/factories/deletePatientUseCase.factory'

export async function deletePatientController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    patient_id: z.string().uuid()
  })

  const { clinic_id, patient_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deletePatientUseCase = deletePatientUseCaseFactory()

  await deletePatientUseCase.execute({ user_id, clinic_id, patient_id })

  return reply.status(200).send()
}
