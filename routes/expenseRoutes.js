const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const mongoose = require('mongoose');
const User = require('../models/User');




router.post('/create/:userId', async (req, res) => {
  try {
    const { name, description, category, date, amount } = req.body;
    const createdBy = "Me"; // hardcoded
    const { userId } = req.params;
    const newExpense = new Expense({ name, description, category, date, amount, createdBy, user: userId, });
    await newExpense.save();

    res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/getall/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully', deletedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ existingExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, date, amount } = req.body;
    
    const existingExpense = await Expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    existingExpense.name = name;
    existingExpense.description = description;
    existingExpense.category = category;
    existingExpense.date = date;
    existingExpense.amount = amount;
    const updatedExpense = await existingExpense.save();

    res.status(200).json({ message: 'Expense updated successfully', updatedExpense });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;