import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) : any => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return res.status(400).json({ error: message });
    }

    req.body = value;
    return next();
  };