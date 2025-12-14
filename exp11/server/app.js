require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./taskModel'); // Import the Task model
const cors = require('cors');

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());               // Allow cross-origin requests
app.use(express.json());       // Parse JSON request bodies

// ---------------- MONGODB ATLAS CONNECTION ----------------
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI environment variable is not defined');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ---------------- API ROUTES ----------------

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST create a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      deletedTask: task
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ---------------- SERVER START ----------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
