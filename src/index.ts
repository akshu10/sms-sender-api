import sendSMS from './send-message-service';
import { SMSRequest } from './send-message-service';

interface Event {
  rawPath: string;
  requestContext: Record<string, unknown>;
  body: string;
}
interface Status {
  name: string;
  status: string;
}

const handler = async (event: Event) => {
  console.log('Handler', event);
  console.log(event.rawPath, 'PATH');

  if (event.rawPath === '/status') {
    const status: Status = {
      name: 'sms-sender-api',
      status: 'ok'
    };

    return {
      statusCode: 200,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://sms-sender-vue-app.s3-website-us-east-1.amazonaws.com/'
      },
      body: status
    };
  } else if (event.rawPath === '/message') {
    if (event.body) {
      const bodyJSON = JSON.parse(event.body);
      console.log(bodyJSON, 'bodyJSON');

      const request: SMSRequest = {
        to: bodyJSON.to,
        body: bodyJSON.body
      };
      const response = await sendSMS(request);

      return response;
    } else {
      const error = {
        message: 'Bad Request'
      };
      return {
        statusCode: 400,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://sms-sender-vue-app.s3-website-us-east-1.amazonaws.com/'
        },
        body: error
      };
    }
  }
};

export { handler };
