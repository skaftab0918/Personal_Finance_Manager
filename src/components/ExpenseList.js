
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/ExpenseList.css";

const socket = io("http://localhost:5000");

const ExpenseList = ({ expenses, setExpenses, deleteExpense }) => {
  useEffect(() => {
    socket.on("expenseUpdated", (update) => {
      if (update.type === "added") {
        setExpenses((prev) => [update.expense, ...prev]); // Correct way to update
      } else if (update.type === "deleted") {
        setExpenses((prev) => prev.filter((expense) => expense._id !== update.id));
      }
    });

    return () => {
      socket.off("expenseUpdated");
    };
  }, [setExpenses]);

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <span>{expense.title}</span> - <span>${expense.amount}</span> - <span>{expense.category}</span>
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
