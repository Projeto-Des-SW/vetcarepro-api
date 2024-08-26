import { FastifyRequest, FastifyReply } from 'fastify'

import { listClinicsUseCaseFactory } from '@/useCases/factories/listClinicsUseCase.factory'

export async function listClinicsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user_id = request.user.sub

  const listClinicsUseCase = listClinicsUseCaseFactory()

  const { clinics } = await listClinicsUseCase.execute({ user_id })

  return reply.status(200).send(clinics)
}
