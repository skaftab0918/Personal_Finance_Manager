import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import ExportButtons from "../components/ExportButtons";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]); // State for expenses
  const categories = ['Food', 'Travel', 'Bills', 'Other'];
  const [selectedCategory, setSelectedCategory] = useState('');
  const token = localStorage.getItem("token");

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { 'x-auth-token': token },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchExpenses();
  }, [token]);

  // Add expense function
  const addExpense = async (expense) => {
    try {
      const res = await axios.post('http://localhost:5000/api/expenses', expense, {
        headers: { 'x-auth-token': token },
      });
      setExpenses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Delete expense function
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Filter expenses by category
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="top-grid">
        <div className="dashboard-card">
          <ExpenseForm categories={categories} addExpense={addExpense} />
        </div>
        <div className="dashboard-card">
          <div className="filter-section">
            <label>Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="dashboard-card">
          {/* Pass setExpenses to ExpenseList */}
          <ExpenseList
            expenses={filteredExpenses}
            setExpenses={setExpenses}
            deleteExpense={deleteExpense}
          />
        </div>
      </div>
      <div className="chart-grid">
        <div className="dashboard-card">
          <ExpenseChart expenses={expenses} />
          <ExportButtons expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;