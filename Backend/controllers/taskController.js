import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import Project from "../models/Project.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
   const task = await Task.create(req.body);

await Notification.create({
  receiver: task.assignedTo,
  sender: task.assignedBy,
  type: "TASK_ASSIGNED",
  message: `You have been assigned a new task: ${task.title}`,
});

res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL TASKS OF A PROJECT
export const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
    })
      .populate("assignedTo", "userName email")
      .populate("assignedBy", "userName")
      .populate("projectId", "title");

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TASKS ASSIGNED TO A USER
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.params.userId,
    })
      .populate("projectId", "title")
      .populate("assignedBy", "userName");

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (req.body.status === "Completed") {
      const project = await Project.findById(task.projectId);

      await Notification.create({
        receiver: project.createdBy,
        sender: task.assignedTo,
        type: "TASK_COMPLETED",
        message: `Task "${task.title}" has been completed.`,
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};