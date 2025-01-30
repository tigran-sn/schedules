import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../db/database";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const users = await JSON.parse(process.env.USERS!);
  const allowedUsers = users.map((user: any) => user.email);
  if (!allowedUsers.includes(email)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
