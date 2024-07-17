function getTasks() {
  return [
    { id: 1, task: "task 1" },
    { id: 2, task: "task 2" },
    { id: 3, task: "task 3" },
    { id: 4, task: "task 4" },
    { id: 5, task: "task 5" },
  ];
}

function getTaskById(id) {
  let task;

  // get all tasks
  const json = getTasks();

  // for each task in tasks, check if task id matches the taskId requested by the user
  json.forEach((element) => {
    if (element.id == id) {
      task = element;
    }
  });

  // if task with this id is not found, return task not found with status 404
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return task;
}

function createTask(task) {
  // get old tasks
  let oldTasks = getTasks();

  // add old tasks to updatedTasks
  let updatedTasks = [];

  updatedTasks.push(oldTasks);

  let newTask = {
    id: oldTasks.length + 1,
    task: task,
  };

  // add new task to existing old tasks in updatedTasks ( [0] to add the new task with the old ones not as a new element in updatedTasks)
  updatedTasks[0].push(newTask);

  // return updated tasks
  return updatedTasks;
}

function deleteTask(id) {
  // get all tasks
  let tasks = getTasks()

  // return error if there is no tasks
  if (!tasks) {
      return res.status(400).json({ message: "There is no tasks" });    
  }

  // updatedTasks = tasks where task.id != taskId
  let updatedTasks = tasks.filter((element) => element.id != id)

  // return updated tasks
  return updatedTasks
}

function updateTask(id, updatedTask) {
  // get old tasks
  let tasks = getTasks()

  // update task
  tasks.forEach(task => {
      if (task.id == id) {
          task.task = updatedTask
      }
  });

  // return updated tasks
  return tasks
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask
};
