import { checkSchema, Schema } from 'express-validator';
import { IdParamsSchemaValidation } from './defaultValidation';

const createdSchemaValidation: Schema = {
  username: {
    in: ['body'],
    errorMessage: 'Username is wrong',
    isString: true,
    isLength: {
      errorMessage: 'Username should be at least 3 chars long',
      options: { min: 3 },
    },
  },
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
  },
  userGroupId: {
    in: ['body'],
    errorMessage: 'User Group ID is wrong',
    isInt: true,
    toInt: true,
  },
  profileId: {
    in: ['body'],
    errorMessage: 'Profile ID is wrong',
    isInt: true,
    toInt: true,
  }
};

export const userValidation = {
  create: checkSchema(createdSchemaValidation),
  update: checkSchema(createdSchemaValidation),
  index: checkSchema(IdParamsSchemaValidation),
  delete: checkSchema(IdParamsSchemaValidation),
};
