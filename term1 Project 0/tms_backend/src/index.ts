import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

export const app = new Elysia().use(openapi()).listen(3000);
app.get("/", () => "Hello Elysia");

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
