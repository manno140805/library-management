const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  availableCopies: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
  description: { type: String },
  publishedYear: { type: Number },
  photo: { type: String }, // Path to the uploaded photo
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);