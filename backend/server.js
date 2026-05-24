const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require('./routes/auth');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

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
const busRoutes = require("./routes/busRoutes");

app.use("/api/emergencies", emergencyRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/buses", busRoutes);

app.get("/", (req, res) => {
  res.send("Neo Metro Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});