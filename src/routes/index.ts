const express = require('express');
const usersRouter = require('./users.router');
const propertyRouter = require('./property.router');
const countriesRouter = require('./countries.router');
const authRouter = require('./auth.router');
const favoritesRouter = require('./favorites.router');
const featuredRouter = require('./featured.router');
export function routerApi(app: { use: (arg0: string, arg1: any) => void }) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/properties', propertyRouter);
  router.use('/countries', countriesRouter);
  router.use('/auth', authRouter);
  router.use('/favorites', favoritesRouter);
  router.use('/featured', featuredRouter);
}
