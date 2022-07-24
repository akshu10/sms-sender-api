import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import handleError from './error-handler';

export interface RouteExpressSchema {
  [key: string]: ExpressSchema;
}

export interface ExpressSchema {
  body?: Joi.AnySchema;
  query?: Joi.AnySchema;
  params?: Joi.AnySchema;
}

const validateRequest = (schema: Joi.AnySchema, object: object) => {
  const validate = schema.validate(object, { convert: true });

  if (validate.error) {
    throw validate.error;
  }

  return validate.value;
};

const joiMiddleware = (schema: ExpressSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = validateRequest(schema.body, req.body);
      }

      if (schema.query) {
        req.query = validateRequest(schema.query, req.query);
      }

      if (schema.params) {
        req.params = validateRequest(schema.params, req.params);
      }

      next();
    } catch (error) {
      handleError(res, error as Error);

      return;
    }
  };
};

export default joiMiddleware;
