const express = require("express");
const router = express.Router();

const SOS = require("../models/SOS");

router.post("/", async (req, res) => {
  try {
    const sos = new SOS(req.body);

    await sos.save();

    res.status(201).json({
      success: true,
      message: "Emergency Reported Successfully",
      data: sos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await SOS.find().sort({ timestamp: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;