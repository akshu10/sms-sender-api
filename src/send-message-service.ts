import { Twilio } from 'twilio';

import getSecret from './secrets-manager';

export interface SMSRequest {
  to: string | null;
  body: string | null;
}

const secretName = 'twilio/auth';

const sendSMS = async (request: SMSRequest) => {
  try {
    if (request.body === null || request.to === null) {
      throw new Error('Null Pointer');
    }
    console.log('Send SMS Request', request);
    const secret = await getSecret(secretName);

    if (!secret) {
      throw new Error('Twilio secret not found');
    }

    const json = JSON.parse(secret);

    console.log(json, 'SECRET');

    const client = new Twilio(json.ACCOUNT_SID, json.AUTH_TOKEN);

    const twilioResponse = await client.messages.create({
      messagingServiceSid: json.MESSAGING_SERVICE_SID,
      to: request.to,
      body: request.body,
      statusCallback: 'https://yc2jn4v3veonzjg7ernzcfr5ee0qwzih.lambda-url.us-east-1.on.aws/'
    });

    // const twilioResponse = { status: '', sid: '' };
    if (twilioResponse.status === 'accepted' && twilioResponse.sid) {
      console.log('Success');
      return {
        statusCode: 204,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://sms-sender-vue-app.s3-website-us-east-1.amazonaws.com/'
        }
      };
    } else {
      throw new Error('Internal Server Error');
    }
  } catch (error) {
    throw error;
  }
};

export default sendSMS;
