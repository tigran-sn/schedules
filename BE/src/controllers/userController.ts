import { Request, Response } from "express";

import { pool } from "../db/database";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const order =
      req.query.order?.toString().toUpperCase() === "DESC" ? "DESC" : "ASC";

    const result = await pool.query(
      `SELECT id, email, username, first_name, last_name FROM users ORDER BY id ${order}`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, email, username, first_name, last_name FROM users WHERE id = $1",
      [req.user?.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id, email, username, first_name, last_name } = result.rows[0];
    res.json({ id, email, username, first_name, last_name });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
