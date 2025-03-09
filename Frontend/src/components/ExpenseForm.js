import React, { useState } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseForm = ({ categories, addExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]); // Default to the first category

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ title, amount, category }); // Call addExpense with the new expense
    setTitle('');
    setAmount('');
    setCategory(categories[0]); // Reset the form
  };

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;