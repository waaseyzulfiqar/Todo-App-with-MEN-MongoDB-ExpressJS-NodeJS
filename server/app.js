import express from "express";
import cors from "cors";
import { dbConnection } from "./DB/db.js";
import todoModel from "./models/todoSchema.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.get("/", (req, res) => {
  res.send("API Working😊");
});

// Create Todo API

app.post("/createTodo", async (req, res) => {
  try {
    await todoModel.create(req.body);
    res.json({ message: "Todo Created!" });
  } catch (error) {
    res.json({
      message: error.message || "Oops😕 Something went wrong!",
    });
  }
});

// Read All Todos

app.get("/getAllTodos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.send(todos);
  } catch (error) {
    res.json({
      message: error.message || "Oops😕 Something went wrong!",
    });
  }
});

// Update Todo

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await todoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (error) {
    res.json({
      message: error.message || "Oops😕 Something went wrong!",
    });
  }
});

// Delete Todo

app.delete("/delete/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    await todoModel.findByIdAndDelete(todoId);
    res.send("Todo Deleted!");
  } catch (error) {
    res.json({
      message: error.message || "Oops😕 Something went wrong!",
    });
  }
});

app.listen(4211, () => console.log("server is running"));
