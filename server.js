// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cybersecurity_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a simple model
const LogSchema = new mongoose.Schema({
  timestamp: Date,
  type: String,
  message: String
});
const Log = mongoose.model('Log', LogSchema);

// Routes
app.get('/logs', async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

app.post('/logs', async (req, res) => {
  const newLog = new Log(req.body);
  await newLog.save();
  res.status(201).json(newLog);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
