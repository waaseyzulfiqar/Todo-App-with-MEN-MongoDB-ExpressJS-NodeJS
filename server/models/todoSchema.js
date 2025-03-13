import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;
