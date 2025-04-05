const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema( { name: String, product: String, price: Number, phone: String, description: String, state: String, imageUrl: String }, { timestamps: true }); // ← adds createdAt and updatedAt automatically );

module.exports = mongoose.model("Listing", listingSchema);