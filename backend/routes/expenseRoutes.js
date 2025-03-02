const express = require('express');
const { createExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with authentication middleware
router.use(authMiddleware);

// Create a new expense
router.post('/', createExpense);

// Get all expenses
router.get('/', getExpenses);

// Delete an expense
router.delete('/:id', deleteExpense);

module.exports = router;