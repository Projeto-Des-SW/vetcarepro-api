export class ClinicAlreadyExistsError extends Error {
  constructor() {
    super('Title already exists.')
  }
}
