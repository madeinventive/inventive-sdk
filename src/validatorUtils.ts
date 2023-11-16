// Utils for generated type validations. Intentionally not linted.
// Do not add types/logic unrelated to codegen validation here

import { ValidateFunction, ErrorObject } from 'ajv';

class TypeError extends Error {
  public ajvErrors: ErrorObject[];
  constructor(ajvErrors: ErrorObject[]) {
    super(JSON.stringify(ajvErrors));
    this.name = 'TypeError';
    this.ajvErrors = ajvErrors;
  }
}

export type StandaloneValidationFunction = (
  data: any,
  dataValidationCxt?: {
    instancePath?: string;
    parentData: any;
    parentDataProperty: any;
    rootData?: any;
  }
) => boolean;

export function ensureType<T>(
  validationFunc: StandaloneValidationFunction,
  data: any
): T {
  const validate = validationFunc as ValidateFunction<T>;
  if (!validate) throw new Error('Validate not defined, schema not found');

  const isValid = validate(data);
  if (!isValid) throw new TypeError(validate.errors!);

  return data;
}

export function isValid<T>(
  validate: StandaloneValidationFunction,
  candidate: any
): candidate is T {
  return validate(candidate) === true;
}
