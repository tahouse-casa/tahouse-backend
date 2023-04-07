import { NextFunction, Request, Response } from 'express';
import express from 'express';
import passport from 'passport';
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} from './../services/user.service';
import validatorHandler from './../middlewares/validator.handler';
import { checkRoles } from './../middlewares/auth.handler';
import { updateUserSchema, createUserSchema, getUserSchema } from './../schemas/user.schema';
const router = express.Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllUsers();
    if (!users.success) {
      res.status(400).json({ success: false, message: 'No se encontraron usuarios.' });
    }
    res.status(200).json({ ...users, message: 'Usuarios encontrados satisfactoriamente.' });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
      if (!user.success) {
        res.status(400).json({ success: false, message: 'No se encontraron usuarios.' });
      }
      res.status(200).json({ ...user, message: 'Usuario encontrado satisfactoriamente.' });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newUser = await createUser(body);
      if (!newUser.success) {
        res.status(400).json({ success: false, message: 'No se encontraron usuarios.' });
      }
      res.status(201).json({ ...newUser, message: 'Usuario creado con éxito' });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.body.user.sub;
      const body = req.body;
      const user: any = await updateUser(id, body);
      if (!user.success) {
        res.status(400).json({
          success: false,
          message: user?.message || 'El usuario no fue encontrado.',
        });
      }
      res.status(200).json({ ...user, message: 'Actualizado satisfactoriamente.' });
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteForId = await deleteUser(id);
      if (!deleteForId.success) {
        res.status(400).json(deleteForId);
      }
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
