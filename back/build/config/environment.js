"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.loadEnvFile();
const dataConfig = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
    },
    production: {
        url: process.env.DATABASE_URL,
    }
};
exports.default = dataConfig;
