const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const sosRoutes = require("./routes/sosRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/emergencies", emergencyRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/sos", sosRoutes);

app.get("/", (req, res) => {
  res.send("Neo Metro Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});