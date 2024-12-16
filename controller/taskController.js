// /controllers/taskController.js
const Task = require('../model/task');

exports.createTask = async (req, res) => {
    try {
        const { uid, task_name } = req.body;
        const task = await Task.create({ uid, task_name });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { deleted_at: null } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, completed, important } = req.body;
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.task_name = task_name ?? task.task_name;
        task.completed = completed ?? task.completed;
        task.important = important ?? task.important;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.deleted_at = new Date();
        await task.save();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
