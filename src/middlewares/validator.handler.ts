import { NextFunction, Request, Response } from 'express';

const validatorHandler = (schema: any, property: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req.body[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(new Error('No estás autorizado'));
    }
    next();
  };
};

export default validatorHandler;
