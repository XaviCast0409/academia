import { url } from "inspector";

process.loadEnvFile();

const dataConfig = {
  development: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
  },
  production: {
    url: process.env.DATABASE_URL as string,
}
}
export default dataConfig;
