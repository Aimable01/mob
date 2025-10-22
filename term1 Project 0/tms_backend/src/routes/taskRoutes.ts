import {
  createTask,
  findCompleteTasks,
  findIncompleteTasks,
  toggleCompleted,
} from "../controllers/taskController";

export default (app: any) => {
  app.post("/task", async ({ body }: { body: any }) => {
    try {
      const task = await createTask(body);
      return {
        success: true,
        message: "Task created successfully",
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to create task",
      };
    }
  });

  app.get("/tasks/complete", async () => {
    try {
      const tasks = await findCompleteTasks();
      return {
        success: true,
        data: tasks,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch completed tasks",
      };
    }
  });

  app.get("/tasks/incomplete", async () => {
    try {
      const tasks = await findIncompleteTasks();
      return {
        success: true,
        data: tasks,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch incomplete tasks",
      };
    }
  });

  app.patch("/task/:id", async ({ params }: { params: { id: string } }) => {
    try {
      const updatedTask = await toggleCompleted(params.id);

      if (!updatedTask) {
        return {
          success: false,
          message: "Task not found",
        };
      }

      return {
        success: true,
        message: "Task status updated successfully",
        data: updatedTask,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to update task",
      };
    }
  });
};
