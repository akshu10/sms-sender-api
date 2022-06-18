import { Request, Response, ParamsDictionary } from 'express-serve-static-core';

export interface Status {
  name: string;
  status: string;
  environment: string | undefined;
}

const statusController = (req: Request<ParamsDictionary>, res: Response): void => {
  const status: Status = {
    name: 'api',
    status: 'ok',
    environment: process.env.NODE_ENV
  };

  res.json(status);
};

export default statusController;
