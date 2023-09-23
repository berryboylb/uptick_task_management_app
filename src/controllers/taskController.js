const Task = require("../models/task");
const create = async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "please add a title" });
  try {
    const newTodo = new Task({
      description,
      title,
    });
    //save it
    await newTodo.save();
    res
      .status(201)
      .json({ statusCode: 201, message: "task created", data: newTodo });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchAll = async (req, res) => {
  const { page, perPage } = req.query;
  try {
    const skip = ((page || 1) - 1) * (perPage || 12);
    const tasks = await Task.find().skip(skip).limit(perPage);
    const totalTasks = await Task.countDocuments();
    const nextPage =
      (page || 1) * (perPage || 12) < totalTasks ? page + 1 : null;
    res.status(200).json({
      statusCode: 201,
      message: "tasks fetched successfully",
      data: { page: page || 1, perPage: perPage || 12, tasks, nextPage },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchOne = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById({ _id: id });
    if (!task) return res.status(404).json({ err: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, reminder } = req.body;
  try {
    const task = await Task.findById({ _id: id });
    if (!task) return res.status(404).json({ err: "Task not found" });
    if (title) task.title = title;
    if (description) task.description = description;
    const newData = await task.save();
    res
      .status(200)
      .json({ message: "task updated successfully", data: newData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatereminder = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById({ _id: id });
    if (!task) return res.status(404).json({ err: "Task not found" });
    task.reminder = !task.reminder;
    const newData = await task.save();
    res
      .status(200)
      .json({ message: "task updated successfully", data: newData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById({ _id: id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    await task.deleteOne({ _id: id });
    res.json({ message: "Todo Deleted", data: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  create,
  fetchAll,
  fetchOne,
  update,
  deleteOne,
  updatereminder,
};
