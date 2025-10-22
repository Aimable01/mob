import { app } from "..";
import {
  createTask,
  findCompleteTasks,
  findIncompleteTasks,
  toggleCompleted,
} from "../controllers/taskController";

app.get("/complete", async () => {
  return await findCompleteTasks;
});

app.get("/inccomplete", async () => {
  return await findIncompleteTasks;
});

app.post("/create", async ({ body }: { body: any }) => {
  return await createTask(body);
});

app.patch("/task/:id", async ({ params: { id } }) => {
  const updatedTask = await toggleCompleted(id);
});
