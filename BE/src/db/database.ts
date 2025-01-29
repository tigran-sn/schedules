import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: "postgres",
  host: "localhost",
  database: "schedule_db",
  password: "54321",
  port: 5432,
});
