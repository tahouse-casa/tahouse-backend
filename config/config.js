require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || "admin",
  dbPassword: process.env.DB_PASSWORD || "admin123",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "real_estates",
  dbPort: process.env.DB_PORT || 5432,
  apiKey: process.env.API_KEY || 321,
  jwtSecret: process.env.JWT_SECRET || "tania",
  emailPass: process.env.EMAIL_PASS,
  emailUser: process.env.EMAIL_USER,
  dbUrl: process.env.DATABASE_URL || "postgres://admin:admin123@localhost:5432/real_estates",
  key_storage_project_id: process.env.GCP_PROJECT_ID || "tahouse",
};

module.exports = { config };
