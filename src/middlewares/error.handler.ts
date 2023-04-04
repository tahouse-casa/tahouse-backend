const { ValidationError } = require('sequelize');

const logErrors = (err: any, _req: any, _res: any, next: (arg0: any) => void) => {
  console.error(err);
  return next(err);
};

const errorHandler = (
  err: { error: boolean; message: string } | any,
  _req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: any }): any; new (): any };
    };
  },
  _next: any
) => {
  if (err.error) {
    return res.status(401).json({
      message: err.message,
    });
  }
  return undefined;
};

const ormErrorHandler = (
  err: { name: any; errors: any },
  _req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { statusCode: number; message: any; errors: any }): void; new (): any };
    };
  },
  next: (arg0: any) => void
) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};

module.exports = { ormErrorHandler, errorHandler, logErrors };
export {};
