import 'dotenv/config'
import { z } from 'zod'

const env_schema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'staging', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  PG_DATABASE: z.string(),
  PG_USERNAME: z.string(),
  PG_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string()
})

const _env = env_schema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid Environment Variables!', _env.error.format())

  throw new Error('Invalid Environment Variables!')
}

export const env = _env.data
