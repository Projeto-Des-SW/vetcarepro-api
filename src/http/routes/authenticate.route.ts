import { FastifyInstance } from 'fastify'

import { authenticateController } from '../controllers/authenticate.controller'

export async function authenticateRoute(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
}
