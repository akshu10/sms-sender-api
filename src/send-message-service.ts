import { Twilio } from 'twilio';

import getSecret from './secrets-manager';

export interface SMSRequest {
  to: string;
  body: string;
}

const secretName = 'twilio/auth';

const sendSMS = async (request: SMSRequest): Promise<void> => {
  try {
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
      statusCallback: 'https://hjzbbwuyuuufnsdz54fqa3fazy0eqtxp.lambda-url.us-east-1.on.aws/'
    });

    // const twilioResponse = { status: '', sid: '' };
    if (twilioResponse.status === 'accepted' && twilioResponse.sid) {
      console.log('Success');
      return;
    } else {
      throw new Error('Internal Server Error');
    }
  } catch (error) {
    throw error;
  }
};

export default sendSMS;
