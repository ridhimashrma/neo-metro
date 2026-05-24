const express = require('express');
const Complaint = require('../models/Complaint');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json(complaints);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json(complaint);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({ message: 'Complaint deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;