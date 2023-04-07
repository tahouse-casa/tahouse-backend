import { Pool } from 'pg';
import config from '../config/config';

type OptionsType = {
  connectionString: string;
  ssl?: object;
};

let options: OptionsType = {
  connectionString: config.dbUrl,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(options);

export default pool;
