import { Request, Response, ParamsDictionary } from 'express-serve-static-core';

export interface Status {
  name: string;
  status: string;
}

const statusController = (req: Request<ParamsDictionary>, res: Response): void => {
  const status: Status = {
    name: 'sms-sender-api',
    status: 'ok'
  };

  res.json(status);
};

export default statusController;
