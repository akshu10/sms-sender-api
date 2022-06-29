import express from 'express';
import Joi from 'joi';

import joiMiddleware, { ExpressSchema } from '../lib/middleware';
import sendSMSController from './controller/send-message-controller';

export const sendSMSSchema: ExpressSchema = {
  body: Joi.object({
    token: Joi.string().uuid({ version: 'uuidv4' }),
    to: Joi.string().trim().length(12),
    body: Joi.string().trim().min(2).max(150)
  })
};

const router = express.Router();

const contextRoute = '/message-service/v1';

router.post(`${contextRoute}/message`, joiMiddleware(sendSMSSchema), sendSMSController);

export default router;
