const express = require('express');
const Bus = require('../models/Bus');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });

    res.json(buses);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const bus = await Bus.create(req.body);

    res.status(201).json(bus);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Bus deleted'
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
