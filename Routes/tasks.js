const express = require("express");
const router = express.Router();
const { getTasks, createTask, getTaskById, deleteTask, updateTask } = require("../Services/tasks");

// Get route to get all tasks
router.get("/tasks", (req, res) => {
  try {
    
    // get all tasks
    const json = getTasks();

    // return there is not tasks message with status 404 if there is no tasks
    if (!json) {
        return res.status(404).json({ message: "There is no tasks" });
    }

    // return tasks with status 200
    return res.status(200).json(json);

  } catch (error) {
    console.log("Something went wrong: ", error);
  }
});

// Get route to get task by id
router.get("/tasks/:id", (req, res) => {
  try {
    
    // get taskId from req params , and define an empty task to store the desired task in it
    let taskId = req.params.id;
    
    // get task by id
    let singleTask = getTaskById(taskId)
    
    // return task with status 200
    return res.status(200).json(singleTask);

  } catch (error) {
    console.log("Something went wrong: ", error);
  }
});

// Post route to create new task
router.post("/tasks", (req,res) => {
    try {
        // get task passed by the user
        const {task} = req.body

        // return error if there is no task passed by the user
        if (!task) {
            return res.status(400).json({ message: "Please enter a task" });    
        }

        // create new task and get updated tasks list
        let updatedTasks = createTask(task)

        // return updated tasks list to user with status 200
        return res.status(200).json(updatedTasks);


    } catch (error) {
        console.log("Something went wrong: ", error)
    }
})

// Delete route to delet route by id
router.delete("/tasks/:id", (req,res) => {
    try {
        
        // get task id to delete from req.params
        const taskId = req.params.id

        // run delete Task function
        let updatedTasks = deleteTask(taskId)

        // return updated tasks with status 200
        return res.status(200).json(updatedTasks)

    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}) 

// put route to update task by id
router.put("/tasks/:id", (req,res) => {
    try {
        
        // get task id from req.params
        const taskId = req.params.id

        // get updated task
        const updatedTask = req.body.task

        if (!updatedTask) {
            return res.status(400).json({ message: "task content is required" })
        }

        let tasks = updateTask(taskId, updatedTask)

        // return updated tasks with status 200
        return res.status(200).json(tasks)

    } catch (error) {
        console.log("Something went wrong: ", error)
    }
})

module.exports = router;