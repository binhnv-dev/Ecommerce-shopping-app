// validation.ts

import * as yup from 'yup';

interface ValidationResponse {
  isValid: boolean;
  errors?: Record<string, string[]>;
}

export const allFieldsValidation = async (
  data: Record<string, any>,
  schema: yup.ObjectSchema<any>
): Promise<ValidationResponse> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true };
  } catch (err) {
    const validationErrors: Record<string, string[]> = {};
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path) {
          if (!validationErrors[error.path]) {
            validationErrors[error.path] = [];
          }
          validationErrors[error.path].push(error.message);
        }
      });
    }
    return { isValid: false, errors: validationErrors };
  }
};