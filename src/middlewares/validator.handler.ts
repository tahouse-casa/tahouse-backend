const boom = require('@hapi/boom');

function validatorHandler(schema: any, property: any) {
  return (req: any, _res: any, next: (arg0: {} | { error: boolean; message: string }) => any) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next({ error: true, message: 'No estás autorizado' });
    }
    next({});
  };
}

module.exports = validatorHandler;
