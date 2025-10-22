import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import mongoose from "mongoose";

export const app = new Elysia().use(openapi()).listen(3000);
app.get("/", () => "Hello Elysia");

// db connection
mongoose.connect("mongodb://localhost:27017");

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error")
);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
