import { Client, ClientConfig } from "pg";
import "dotenv/config";

const config = (): ClientConfig => {
  if (process.env.NODE_ENV === "test") {
    return {
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASSWORD,
      host: process.env.DB_TEST_HOST,
      database: process.env.DB_TEST_NAME,
      port: parseInt(process.env.DB_TEST_PORT!),
    };
  }

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!),
  };
};

const client: Client = new Client(config());

export default client;
