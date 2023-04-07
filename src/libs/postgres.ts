import { Client } from 'pg';
import config from '../config/config';

export const getConnection = async () => {
  const newConfig = { ...config };

  const client = new Client({
    host: newConfig.dbHost,
    port: newConfig.dbPort,
    user: newConfig.dbUser,
    password: newConfig.dbPassword,
    database: newConfig.dbName,
  });

  await client.connect();
  return client;
};
