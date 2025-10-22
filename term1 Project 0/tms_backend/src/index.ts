import { Elysia } from "elysia";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import openapi from "@elysiajs/openapi";

export const app = new Elysia();

// DB connection
mongoose.connect("mongodb://localhost:27017/taskdb");
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error")
);

// Register routes
taskRoutes(app);

app.get("/", () => "Task API is running!");

app.use(openapi()).listen(3000);

console.log(`🦊 Elysia is running at http://localhost:3000`);
