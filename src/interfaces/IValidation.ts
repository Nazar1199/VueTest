export interface IValidation<T> {
  validate(data: T): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}
