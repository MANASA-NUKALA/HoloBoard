import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  deadline: String,
  status: { type: String, default: "Pending" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
