import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { pool } from "../db/database";

dotenv.config();

// async function hashAndUpdatePassword() {
//     const email = 'user1@some.com';
//     const password = 'user1@some.com';

//     try {
//         // Generate hash
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log('Generated hash:', hashedPassword);

//         // Update user in database
//         const result = await pool.query(
//             'UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING *',
//             [hashedPassword, email]
//         );

//         if (result.rows.length > 0) {
//             console.log('Successfully updated user:', result.rows[0]);
//         } else {
//             console.log('User not found');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await pool.end();
//     }
// }

// // Run the function
// hashAndUpdatePassword();

console.log("Creating the required tables");

const createAndFillUsersTableWithHashedPasswords = async () => {
  try {
    // Create a users table
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL
        );`
    );

    // Fill insert users into users table
    const users = await JSON.parse(process.env.USERS!);
    const existingUsersResult = await pool.query("SELECT email FROM users");
    const existingUsers = new Set(
      existingUsersResult.rows.map((row) => row.email)
    );

    // Delete users not in the current USERS list
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
      const { email, password } = user;

      // Validate email and handle undefined or empty values
      if (!email) {
        console.error("Error: Email is required for all users");
        continue;
      }

      // Validate password and handle undefined or empty values
      if (!password) {
        console.error("Error: Password is required for all users");
        continue; // Skip if password is missing
      }

      // Hash the provided password or the email as fallback
      const dataToHash = password || email;
      const hashedPassword = await bcrypt.hash(dataToHash, 10);

      // Insert user into the database
      const result = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING *",
        [email, hashedPassword]
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

createAndFillUsersTableWithHashedPasswords();

// const createTestTable = async () => {
//   try {
//     await pool.query(
//       "CREATE TABLE IF NOT EXISTS schedules2 (id SERIAL PRIMARY KEY, day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), start_time TIME NOT NULL, end_time TIME NOT NULL, last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
//     );
//     console.log("Table creation check completed");
//   } catch (error) {
//     console.error("Error creating table:", error);
//     throw error;
//   }
// };

// createTestTable();
