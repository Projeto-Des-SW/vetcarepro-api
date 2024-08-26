export class ServiceAlreadyExistsError extends Error {
  constructor() {
    super('Title already exists.')
  }
}
