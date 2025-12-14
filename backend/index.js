const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/petcare")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("PETCARE backend running 🐾");
});

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);




