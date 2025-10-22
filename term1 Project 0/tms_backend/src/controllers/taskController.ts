import Task from "../models/taskModel";

export const createTask = async ({ body }: { body: any }) => {
  try {
    const newTask = new Task(body);
    await newTask.save();
    return newTask;
  } catch (e) {
    console.error("Error creating task");
    throw e;
  }
};

export const findIncompleteTasks = async () => {
  try {
    const tasks = await Task.find({ isCompleted: false });
    return tasks;
  } catch (e) {
    console.error("Error finding incomplete tasks");
    throw e;
  }
};

export const findCompleteTasks = async () => {
  try {
    const tasks = await Task.find({ isCompleted: true });
    return tasks;
  } catch (e) {
    console.error("Error finding completed tasks");
    throw e;
  }
};

export const toggleCompleted = async (id: string) => {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          isCompleted: { $not: "$isCompleted" },
        },
      },
      { new: true }
    );

    if (!task) {
      console.log("Task not found");
      return null;
    }

    return task;
  } catch (e) {
    console.error("Failed to toggle task");
    throw e;
  }
};
