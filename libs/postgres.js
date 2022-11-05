const { Client } = require("pg");

const getConnection = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "admin123",
    database: "real_estate",
  });

  await client.connect();
  return client;
};

module.exports = getConnection;
