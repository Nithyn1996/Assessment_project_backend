// /routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask, getTasks } = require('../controller/taskController');

router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks', getTasks);

module.exports = router;
