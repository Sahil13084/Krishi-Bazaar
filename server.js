const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const Listing = require("./models/Listing");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

// Routes
app.post("/api/listings", upload.single("image"), async (req, res) => {
  try {
    const { name, product, price, phone, description, state } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newListing = new Listing({ name, product, price, phone, description, imageUrl, state });
    await newListing.save();

    res.status(201).json({ message: "Listing created", listing: newListing });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
app.use("/uploads", express.static("uploads"));
app.get("/api/listings", async (req, res) => { try { const listings = await Listing.find().sort({ createdAt: -1 }); res.json(listings); } catch (err) { res.status(500).json({ error: "Failed to fetch listings" }); } });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

