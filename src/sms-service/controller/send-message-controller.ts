import { Request, Response } from 'express';
import handleError from '../../lib/error-handler';

import sendSMS, { SMSRequest } from '../service/send-message-service';

const sendSMSController = async (req: Request, res: Response): Promise<void> => {
  try {
    const sendSMSRequest = req.body as unknown as SMSRequest;

    await sendSMS(sendSMSRequest);

    res.status(204).json();
    return;
  } catch (error) {
    handleError(res, error as Error);
  }
};

export default sendSMSController;
