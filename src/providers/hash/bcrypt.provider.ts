import { hash, compare } from 'bcryptjs'

import { HashProvider } from './hash.provider'

export class BcryptProvider implements HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 6)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
