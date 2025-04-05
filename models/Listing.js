const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({ name: String, product: String, price: Number, phone: String, description: String, state: String, imageUrl: String, createdAt: { type: Date, default: Date.now } });

module.exports = mongoose.model("Listing", ListingSchema);
