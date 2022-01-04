const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A tour should have a name"], unique: true },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, "A tour should have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    //A new schema type to keep in your mind --> valid only for string --> removes the whitespace before and after the string gets removed
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have an image cover"],
  },
  images: [String],
  createdAt: {
    //Yes, Date is also one of the valid Schema type
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
