const Task = require("../model/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  if (!tasks) return res.status(204).json({ message: "No tasks found" });
  res.json(tasks);
};

const createNewTask = async (req, res) => {
  const { title, allDay, start, end, house } = req.body;
  if (!title || !allDay || !start || !end || !house)
    return res.status(400).json({ message: "All fields are required." });

  const foundTask = await Task.findOne({
    title: title,
    start: start,
    house: house,
  }).exec();
  if (foundTask) {
    //Conflict
    res.sendStatus(409);
  }
  try {
    //Same task doesnt exist
    const result = await Task.create({
      title: title,
      allDay: "true",
      start: start,
      end: end,
      house: house,
    });
    res.status(201).json({ success: `New task ${title} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Task ID required" });
  const task = await Task.findOne({ _id: req.body.id }).exec();
  if (!task) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await task.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getTasks = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Task ID required" });
  const task = await Task.find({ house: req.params.id }).exec();
  if (!task) {
    return res
      .status(204)
      .json({ message: `Task/s for house ${req.params.id} not found` });
  }
  res.json(task);
};

module.exports = {
  getAllTasks,
  createNewTask,
  deleteTask,
  getTasks,
};
