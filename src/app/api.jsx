const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:3000/to-Do-List', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Task schema
const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        completed: false
    });
    await task.save();
    res.json(task);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${ http://localhost:3000}`));
