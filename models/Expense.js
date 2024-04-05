const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const expenseSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  date: Date,
  amount: Number,
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  user : String,
});

module.exports = mongoose.model('Expense', expenseSchema);