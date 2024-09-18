export class ProductAlreadyExistsError extends Error {
  constructor() {
    super('Title already exists.')
  }
}
