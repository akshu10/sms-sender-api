import { Server } from 'http';
import { once } from 'events';

// const serviceName = 'api';
// const env = process.env.NODE_ENV as string;

// Must be imported after `initTracer` call to enable express traces in Datadog.
import createApp from './app';

const start = new Date();

const app = createApp();

let server: Server;

const port = process.env.PORT || 8080;

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server...');
  server?.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server...');
  server?.close();
});

process.on('uncaughtException', (error) => {
  console.log(`uncaught exception: ${error.message}`, { error });
});

process.on('unhandledRejection', (error) => {
  console.log(`unhandled rejection: ${error}`, { error });
});

(async (): Promise<void> => {
  server = app.listen(port);

  await once(server, 'listening');

  const totalTime = (new Date().getTime() - start.getTime()) / 1000;

  console.log(`Server started at http://localhost:${port} - took ${totalTime} sec`);
})();
