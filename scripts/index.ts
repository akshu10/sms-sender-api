import { handler } from '../src/index';

(async (): Promise<void> => {
  try {
    const response = await handler({
      path: '/message',
      body: { to: '+xxxxxxxxxx', body: 'Beep Boop' },
      headers: {}
    });

    console.log('Response', response);
  } catch (error) {
    console.log('Error', error);
  }
})();
