import Task from "../models/taskModel";

export const createTask = async (body: any) => {
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
    // First find the current task
    const task = await Task.findById(id);
    if (!task) {
      return null;
    }

    // Then update with toggled value
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isCompleted: !task.isCompleted },
      { new: true }
    );

    return updatedTask;
  } catch (e) {
    console.error("Failed to toggle task");
    throw e;
  }
};
