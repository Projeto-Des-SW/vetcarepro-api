import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { listEmployeesUseCaseFactory } from '@/useCases/factories/listEmployeesUseCase.factory'

export async function listEmployeesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const register_params_schema = z.object({
    clinic_id: z.string().uuid()
  })

  const { clinic_id } = register_params_schema.parse(request.params)

  const user_id = request.user.sub

  const listEmployeesUseCase = listEmployeesUseCaseFactory()

  const { employees } = await listEmployeesUseCase.execute({ user_id, clinic_id })

  return reply.status(200).send(employees)
}
