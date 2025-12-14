// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  editTask,
  deleteTask
} = require('../controllers/taskController');

// GET /api/tasks
router.get('/', getAllTasks);

// POST /api/tasks
router.post('/', createTask);

// PUT /api/tasks/:id
router.put('/:id', editTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;
