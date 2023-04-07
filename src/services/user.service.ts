import { User } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

import sequalize from '../libs/sequelize';
const models = sequalize.models;

const createUser = async (data: User) => {
  const { password } = data;
  const hash = await bcrypt.hash(password, 10);
  const newUser: any = await models.User.create({
    ...data,
    password: hash,
  });
  if (!newUser) {
    return { success: false, user: {} };
  }
  delete newUser.dataValues.password;
  delete newUser.dataValues.recoveryToken;
  return { success: true, user: newUser };
};

const findAllUsers = async () => {
  const rta = await models.User.findAll({
    attributes: { exclude: ['password', 'recoveryToken'] },
  });
  if (rta.length > 0) {
    return { success: true, users: rta };
  }
  return { success: false, users: rta };
};

const findUserByEmail = async (email: string) => {
  const rta = await models.User.findOne({
    where: { email },
  });
  return rta;
};

const findUserById = async (id: string) => {
  const user: any = await models.User.findByPk(id, {
    include: ['properties_favorites'],
  });
  if (!user) {
    return { success: false, user: {} };
  }
  delete user.dataValues.password;
  delete user.dataValues.recoveryToken;
  return { user: user, success: true };
};

const updateUser = async (id: string, changes: User) => {
  const user = await findUserById(id);

  if (!user.success) return { ...user, message: 'El usuario no fué encontrado.' };

  if (changes.password) {
    const hash = await bcrypt.hash(changes.password, 10);
    changes.password = hash;
  }
  const rta: any = await models.User.update(changes, { where: { id } });

  if (!rta || !rta[0]) {
    return { success: false, message: 'El usuario no pudo ser actualizado.', user: {} };
  }

  delete rta.dataValues.password;
  delete rta.dataValues.recoveryToken;
  return { success: true, user: rta };
};

const deleteUser = async (id: string) => {
  const user = await findUserById(id);
  if (!user.success) return user;
  const destroyUser = await models.User.destroy({ where: { id } });
  if (!destroyUser) {
    return { success: false, message: 'El usuario no pudo ser eliminado con éxito.' };
  }
  return { success: true, id: id, message: 'ELiminado satisfactoriamente.' };
};

export { createUser, findAllUsers, findUserByEmail, findUserById, updateUser, deleteUser };
