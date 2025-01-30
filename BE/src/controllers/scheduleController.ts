import { Request, Response } from "express";

import { pool } from "../db/database";

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM schedules WHERE user_id = $1 ORDER BY day_of_week",
      [req.user!.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { day_of_week, start_time, end_time } = req.body;
  const user_id = req.user!.id;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid schedule ID" });
  }

  try {
    const result = await pool.query(
      `UPDATE schedules 
         SET day_of_week = $1, start_time = $2, end_time = $3, last_modified = CURRENT_TIMESTAMP
         WHERE id = $4 AND user_id = $5
         RETURNING *`,
      [day_of_week, start_time, end_time, id, user_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Schedule not found or unauthorized" });
    }

    res.json({
      message: "Schedule updated successfully",
      schedule: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: "Server error" });
  }
};
