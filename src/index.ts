import sendSMS from './send-message-service';
import { SMSRequest } from './send-message-service';
export interface LambdaEvent {
  headers: Record<string, string>;
  path: string;
  body: Record<string, string>;
}

interface Status {
  name: string;
  status: string;
}

const handler = async (event: LambdaEvent) => {

  console.log('Handler');
  if (event.path === '/status') {
    const status: Status = {
      name: 'sms-sender-api',
      status: 'ok'
    };

    return {
      statusCode: 200,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        body: JSON.stringify(status)
      }
    };
  } else if (event.path === '/message') {

    console.log('Here');
    const request: SMSRequest = {
      to: event.body.to,
      body: event.body.body
    };
    await sendSMS(request);
  }
};

export { handler };
