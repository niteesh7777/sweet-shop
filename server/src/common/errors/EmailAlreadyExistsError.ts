import { DomainError } from './DomainError.js';

export class EmailAlreadyExistsError extends DomainError {
  constructor() {
    super('Email already exists', 409);
  }
}
