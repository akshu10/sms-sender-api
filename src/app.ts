import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';

import messengerServiceRoutes from './sms-service/router';
import statusController from './status-controller';

console.log('Loading express');

export const app = express();

const createApp = (): Express => {
  // We need to ensure requests can come from any source (as we need to support devices such as in-game and barrel printers)
  // Not a great solution so for the time being we will block all IPs except Canada
  const corsOrigin = '*';

  const corsOptions: CorsOptions = {
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Content-Length',
      'Accept-Encoding',
      'rb-client',
      // todo dont remove this until GR POS and all other clients are updated
      'client',
      'Access-Control-Allow-Origin',
      'sentry-trace'
    ],
    methods: ['PUT', 'PATCH', 'GET', 'POST', 'DELETE', 'OPTIONS'],
    origin: corsOrigin,
    optionsSuccessStatus: 200
  };

  // Configure CORS before routes
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(messengerServiceRoutes);
  app.get('/status', statusController);

  return app;
};

export default createApp;
