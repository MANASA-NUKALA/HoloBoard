import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/tasks", taskRoutes);

// root
app.get("/", (req, res) => res.send("HoloBoard API is running"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
