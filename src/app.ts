import express, { Express } from 'express';
import cors from 'cors';

import statusController from './status-controller';
import sendSMSController from './sms-service/controller/send-message-controller';

console.log('Loading express');

export const app = express();

const createApp = (): Express => {
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/status', statusController);
  app.post('/message', sendSMSController);
  return app;
};

export default createApp;
