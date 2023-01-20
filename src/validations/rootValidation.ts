import { checkSchema, Schema } from 'express-validator';
import { IdParamsSchemaValidation } from './defaultValidation';

const createdSchemaValidation: Schema = {
  fullname: {
    in: ['body'],
    errorMessage: 'Full name is wrong',
    isString: true,
    isLength: {
      errorMessage: 'Full name should be at least 3 chars long',
      options: { min: 3 },
    },
  },
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
  },
  avatar: {
    in: ['body'],
    errorMessage: 'Avatar is wrong',
    isString: true,
    isLength: {
      errorMessage: 'Avatar should be at least 3 chars long',
      options: { min: 3 },
    }
  },
  password: {
    in: ['body'],
    errorMessage: 'Password is wrong',
    isString: true,
    isLength: {
      errorMessage: 'Password should be at least 3 chars long',
      options: { min: 3 },
    },
  }
};

export const rootValidation = {
  create: checkSchema(createdSchemaValidation),
  update: checkSchema(createdSchemaValidation),
  index: checkSchema(IdParamsSchemaValidation),
  delete: checkSchema(IdParamsSchemaValidation),
  findByUsername: checkSchema({
    username: {
      in: ['params'],
      errorMessage: 'Username is wrong',
      isString: true,
      isLength: {
        errorMessage: 'Username should be at least 3 chars long',
        options: { min: 3 },
      },
    }
  })
};
