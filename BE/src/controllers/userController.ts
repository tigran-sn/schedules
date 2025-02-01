import { Request, Response } from "express";

import { pool } from "../db/database";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [req.user?.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { id, email } = result.rows[0];
    res.json({ id, email });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
