const express = require("express");

const router = express.Router();

let complaints = [];

router.get("/", (req, res) => {
  res.json(complaints);
});

router.post("/", (req, res) => {

  const newComplaint = {
    id: Date.now(),
    ...req.body,
  };

  complaints.push(newComplaint);

  res.status(201).json(newComplaint);

});

router.delete("/:id", (req, res) => {

  complaints = complaints.filter(
    (item) => item.id != req.params.id
  );

  res.json({
    message: "Complaint deleted",
  });

});

module.exports = router;