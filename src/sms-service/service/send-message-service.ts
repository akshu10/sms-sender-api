import { Twilio } from 'twilio';

import secretsManager from '../../lib/secrets-manager';

export interface SMSRequest {
  to: string;
  body: string;
}

const secretName = 'twilio/auth';

const sendSMS = async (request: SMSRequest): Promise<void> => {
  try {
    console.log('Send SMS Service');
    const secret = await secretsManager.getSecret(secretName);

    console.log(secret, 'secret');

    if (!secret) {
      throw new Error('Twilio secret not found');
    }

    const client = new Twilio(secret.accountSid, secret.authToken);

    const twilioResponse = await client.messages.create({
      messagingServiceSid: secret.messagingServiceSid,
      to: request.to,
      body: request.body
    });

    if (twilioResponse.status === 'accepted' && twilioResponse.sid) {
      return;
    } else {
      throw new Error('Internal Server Error');
    }
  } catch (error) {
    throw error;
  }
};

export default sendSMS;
