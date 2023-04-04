const { config } = require('../config/config');

function checkApiKey(
  req: { headers: { [x: string]: any } },
  _res: any,
  next: (arg0: {} | { error: boolean; message: string }) => void
) {
  const apiKey = req.headers['api'];
  if (apiKey == config.apiKey) {
    next({});
  } else {
    next({ error: true, message: "you don't be authorized" });
  }
}

function checkRoles(...roles: string[]) {
  return (
    req: { user: any },
    _res: any,
    next: (arg0: {} | { error: boolean; message: string }) => void
  ) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next({});
    } else {
      next({ error: true, message: "you don't be authorized" });
    }
  };
}

module.exports = { checkApiKey, checkRoles };
