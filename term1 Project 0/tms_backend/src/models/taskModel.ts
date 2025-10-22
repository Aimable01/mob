import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

export default mongoose.model("task", taskSchema);
