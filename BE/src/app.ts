import express from "express";
import cors from "cors";

import { authenticateToken } from "./middleware/auth";
import * as authController from "./controllers/authController";
import * as userController from "./controllers/userController";
import * as scheduleController from "./controllers/scheduleController";

export const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/login", authController.login);

app.get("/api/users", authenticateToken, userController.getUsers);
app.get("/api/users/current", authenticateToken, userController.getCurrentUser);

app.get("/api/schedules", authenticateToken, scheduleController.getSchedules);
app.put(
  "/api/schedules/:id",
  authenticateToken,
  scheduleController.updateSchedule
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
