const Task = require('../model/Task');

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    if (!tasks) return res.status(204).json({ 'message': 'No tasks found' });
    res.json(tasks);
}

const deleteTask = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Task ID required' });
    const task = await Task.findOne({ _id: req.body.id }).exec();
    if (!task) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await task.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getTask = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Task ID required' });
    const task = await Task.findOne({ _id: req.params.id }).exec();
    if (!task) {
        return res.status(204).json({ 'message': `Task ID ${req.params.id} not found` });
    }
    res.json(task);
}

module.exports = {
    getAllTasks,
    deleteTask,
    getTask
}