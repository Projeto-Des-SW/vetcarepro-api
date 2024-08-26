import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(cors)
app.register(jwt, { secret: env.JWT_SECRET })
app.register(cookie)
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // ...
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
