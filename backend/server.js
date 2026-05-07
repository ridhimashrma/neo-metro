const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Emergency Schema
const emergencySchema = new mongoose.Schema({
  type: String,
  description: String,
  address: String,
  status: { type: String, default: 'in-progress' },
  createdAt: { type: Date, default: Date.now }
});

const Emergency = mongoose.model('Emergency', emergencySchema);

// Complaint Schema
const complaintSchema = new mongoose.Schema({
  subject: String,
  description: String,
  category: String,
  status: { type: String, default: 'pending' },
  submittedBy: String,
  createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

// === ROUTES ===

// Get All Emergencies
app.get('/api/emergencies', async (req, res) => {
  const data = await Emergency.find().sort({ createdAt: -1 });
  res.json(data);
});

// Add Emergency
app.post('/api/emergencies', async (req, res) => {
  const emergency = new Emergency(req.body);
  await emergency.save();
  res.json(emergency);
});

// Update Status
app.put('/api/emergencies/:id', async (req, res) => {
  const updated = await Emergency.findByIdAndUpdate(req.params.id, 
    { status: req.body.status }, { new: true });
  res.json(updated);
});

// Delete Emergency
app.delete('/api/emergencies/:id', async (req, res) => {
  await Emergency.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Complaints Routes (Similar)
app.get('/api/complaints', async (req, res) => {
  const data = await Complaint.find().sort({ createdAt: -1 });
  res.json(data);
});

app.post('/api/complaints', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.json(complaint);
});

app.delete('/api/complaints/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));