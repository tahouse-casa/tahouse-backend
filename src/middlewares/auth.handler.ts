import { NextFunction, Request, Response } from 'express';

import config from '../config/config';

const checkApiKey = (req: Request, _res: Response, next: NextFunction) => {
  const apiKey = Number(req.headers['api']);
  if (apiKey === config.apiKey) {
    next({});
  } else {
    next({ error: true, message: "you don't be authorized" });
  }
};

const checkRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.body.user;
    if (roles.includes(user.role)) {
      next({});
    } else {
      next({ error: true, message: "you don't be authorized" });
    }
  };
};

export { checkApiKey, checkRoles };
