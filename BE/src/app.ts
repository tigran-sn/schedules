import express from "express";
import cors from "cors";
import { authenticateToken } from "./middleware/auth";
import * as authController from "./controllers/authController";
import * as scheduleController from "./controllers/scheduleController";

export const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.post("/api/auth/login", authController.login);
app.get("/api/schedule/getone", scheduleController.getOne);
app.get("/api/auth/getone", authController.getOne);
app.get("/api/auth/test", authController.testConnection);

// Schedule routes
app.get("/api/schedules", authenticateToken, scheduleController.getSchedules);
app.get("/api/schedule", authenticateToken, scheduleController.getSchedule);
app.put(
  "/api/schedule/:id",
  authenticateToken,
  scheduleController.updateSchedule
);

// Public access check
app.get("/api/access", scheduleController.checkAccess);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
