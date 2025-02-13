import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { pool } from "../db/database";

dotenv.config();

console.log("Creating users and schedules tables");

const createAndFillUsersTableWithHashedPasswords = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            password_hash VARCHAR(255) NOT NULL,
            profile_image_url VARCHAR(500),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
    );

    const users = await JSON.parse(process.env.USERS!);
    const existingUsersResult = await pool.query("SELECT email FROM users");
    const existingUsers = new Set(
      existingUsersResult.rows.map((row) => row.email)
    );

    const emailsToDelete = existingUsersResult.rows
      .filter((row) => !users.some((user: any) => user.email === row.email))
      .map((row) => row.email);

    if (emailsToDelete.length > 0) {
      await pool.query("DELETE FROM users WHERE email = ANY($1)", [
        emailsToDelete,
      ]);
      console.log("Deleted users:", emailsToDelete);
    }

    for (const user of users) {
      const {
        email,
        password,
        username,
        first_name,
        last_name,
        profile_image_url,
      } = user;

      if (!email) {
        console.error("Error: Email is required for all users");
        continue;
      }

      if (!password) {
        console.error("Error: Password is required for all users");
        continue;
      }

      const dataToHash = password || email;
      const hashedPassword = await bcrypt.hash(dataToHash, 10);

      const result = await pool.query(
        "INSERT INTO users (email, password_hash, username, first_name, last_name, profile_image_url, updated_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) ON CONFLICT (email) DO NOTHING RETURNING *",
        [
          email,
          hashedPassword,
          username,
          first_name || null,
          last_name || null,
          profile_image_url || null,
        ]
      );

      if (result.rows.length > 0) {
        console.log("Inserted user:", result.rows[0]);
      } else {
        console.log(`User "${email}" already exists. Skipping.`);
      }
    }
  } catch (error) {
    console.error("Error creating and filling users table:", error);
    throw error;
  }
};

const createAndFillSchedulesTable = async () => {
  try {
    const checkTableQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'schedules'
        );
      `;

    const tableExists = await pool.query(checkTableQuery);

    await pool.query(
      `CREATE TABLE IF NOT EXISTS schedules (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
    );

    if (!tableExists.rows[0].exists) {
      console.log("Table schedules was created successfully");

      const checkDataQuery = `
          SELECT EXISTS (
            SELECT 1 FROM schedules 
            WHERE user_id IN (1, 2)
            LIMIT 1
          );
        `;

      const dataExists = await pool.query(checkDataQuery);

      if (!dataExists.rows[0].exists) {
        const result = await pool.query(
          `
            INSERT INTO schedules (day_of_week, user_id, start_time, end_time) VALUES 
                (0, 1, '00:00', '24:00'),
                (1, 1, '00:00', '24:00'),
                (2, 1, '00:00', '24:00'),
                (3, 1, '00:00', '24:00'),
                (4, 1, '00:00', '24:00'),
                (5, 1, '00:00', '24:00'),
                (6, 1, '00:00', '24:00'),
                (0, 2, '00:00', '24:00'),
                (1, 2, '00:00', '24:00'),
                (2, 2, '00:00', '24:00'),
                (3, 2, '00:00', '24:00'),
                (4, 2, '00:00', '24:00'),
                (5, 2, '00:00', '24:00'),
                (6, 2, '00:00', '24:00')
            RETURNING *;
            `
        );

        console.log(
          `Successfully inserted ${result.rowCount} schedule records`
        );
      } else {
        console.log(
          "Schedule data already exists for users 1 and 2. Skipping insertion."
        );
      }
    } else {
      console.log("Table schedules already existed, no action taken");
    }
  } catch (error) {
    console.error("Error creating and filling schedules table:", error);
    throw error;
  }
};

const main = async () => {
  try {
    await createAndFillUsersTableWithHashedPasswords();
    await createAndFillSchedulesTable();
    console.log("\x1b[32m✔ Tables created and populated successfully\x1b[0m");
  } catch (error) {
    console.error("Error setting up tables:", error);
  }
};

main();
