const express = require('express');
const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const router = express.Router();
const service = new UserService();

router.get('/', async (_req: any, res: { json: (arg0: {}) => void }, next: (arg0: any) => void) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (
    req: { params: { id: string } },
    res: { json: (arg0: object) => void },
    next: (arg0: any) => void
  ) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (
    req: { body: any },
    res: {
      status: (arg0: number) => { (): any; new (): any; json: { (arg0: any): void; new (): any } };
    },
    next: (arg0: unknown) => void
  ) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUserSchema, 'body'),
  async (
    req: { user: string; body: any },
    res: { json: (arg0: any) => void },
    next: (arg0: unknown) => void
  ) => {
    try {
      const id = req.user.sub;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (
    req: { params: { id: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { id: any }): void; new (): any };
      };
    },
    next: (arg0: unknown) => void
  ) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
export {};
