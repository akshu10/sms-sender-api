import { Response } from 'express';

import { ValidationError } from 'joi';

const handleError = (res: Response, error: Error) => {
  if (error.name === 'ValidationError') {
    const validationError = error as ValidationError;

    console.log(`Validation error: ${validationError.message}`);

    res.status(400).json({ error: error.name, message: validationError.message });
  }

  res.send();
};

export default handleError;
