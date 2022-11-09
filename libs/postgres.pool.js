const { Pool } = require("pg");
const { config } = require("../config/config");

let URL = config.dbUrl;

const pool = new Pool({ connectionString: URL });

module.exports = pool;
