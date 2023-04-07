import { ValidationError } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

const logErrors = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  console.error(err);
  return next(err);
};

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err?.message) {
    return res.status(401).json({
      message: err.message,
    });
  }
  return undefined;
};

const ormErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};

export { ormErrorHandler, errorHandler, logErrors };
