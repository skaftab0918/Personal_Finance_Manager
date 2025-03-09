const Expense = require('../models/Expense');

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    console.log("Received request to add expense:", req.body);

    if (!req.body.title || !req.body.amount || !req.body.category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const expense = new Expense({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user.id,
    });

    await expense.save();
    console.log("Expense saved:", expense);

    // Emit Socket.IO event for real-time updates
    const io = req.app.get('io');
    io.emit('expenseUpdated', { type: 'added', expense });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Error in createExpense:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Emit Socket.IO event for real-time updates
    const io = req.app.get('io');
    io.emit('expenseUpdated', { type: 'deleted', id });

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};