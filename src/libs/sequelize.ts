import { Sequelize, Dialect } from 'sequelize';

import config from '../config/config';
import setUpModels from '../db/models';

type Options = {
  dialect: Dialect;
  logging: boolean;
  dialectOptions?: {
    ssl?: {
      rejectUnauthorized: boolean;
    };
  };
};

const options: Options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setUpModels(sequelize);
export default sequelize;
