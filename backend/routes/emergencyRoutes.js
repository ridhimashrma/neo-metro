const express = require("express");

const router = express.Router();

let emergencies = [];

router.get("/", (req, res) => {
  res.json(emergencies);
});

router.post("/", (req, res) => {

  const newEmergency = {
    id: Date.now(),
    ...req.body,
  };

  emergencies.push(newEmergency);

  res.status(201).json(newEmergency);

});

router.delete("/:id", (req, res) => {

  emergencies = emergencies.filter(
    (item) => item.id != req.params.id
  );

  res.json({
    message: "Emergency deleted",
  });

});

module.exports = router;