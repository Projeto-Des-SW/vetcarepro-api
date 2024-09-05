import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { getEmployeeUseCaseFactory } from '@/useCases/factories/getEmployeeUseCase.factory'

export async function getEmployeeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid(),
    employee_id: z.string().uuid()
  })

  const { clinic_id, employee_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const getEmployeeUseCase = getEmployeeUseCaseFactory()

  const { employee } = await getEmployeeUseCase.execute({ user_id, clinic_id, employee_id })

  return reply.status(200).send(employee)
}
