import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { deleteEmployeeUseCaseFactory } from '@/useCases/factories/deleteEmployeeUseCase.factory'

export async function deleteEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    employee_id: z.string().uuid()
  })

  const { clinic_id, employee_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const deleteEmployeeUseCase = deleteEmployeeUseCaseFactory()

  await deleteEmployeeUseCase.execute({ user_id, clinic_id, employee_id })

  return reply.status(200).send()
}
