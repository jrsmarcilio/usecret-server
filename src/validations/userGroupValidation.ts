import { checkSchema, Schema } from 'express-validator';
import { IdParamsSchemaValidation } from './defaultValidation';

const userGroupSchemaValidation: Schema = {
  name: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Name should be at least 3 chars long',
      options: { min: 3 },
    },
    trim: true,
  },
  description: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Description should be at least 3 chars long',
      options: { min: 3 },
    },
    trim: true,
  }
}

export const userGroupValidation = {
  index: checkSchema(IdParamsSchemaValidation),
  create: checkSchema(userGroupSchemaValidation),
  update: checkSchema({ ...userGroupSchemaValidation, ...IdParamsSchemaValidation }),
  delete: checkSchema(IdParamsSchemaValidation)
}