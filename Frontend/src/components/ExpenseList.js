import React, { useEffect, useContext, useCallback } from "react";
import { SocketContext } from "../SocketContext";
import "../styles/ExpenseList.css";

const ExpenseList = ({ expenses, setExpenses, deleteExpense }) => {
  const socket = useContext(SocketContext);

  // Use useCallback to ensure a stable reference for handleExpenseUpdated
  const handleExpenseUpdated = useCallback((update) => {
    console.log("Received expenseUpdated event:", update);

    if (update.type === "added") {
      // Use a functional update to ensure the latest state is used
      setExpenses((prev) => {
        // Check if the expense already exists in the list using a Set
        const expenseIds = new Set(prev.map((expense) => expense._id));
        if (!expenseIds.has(update.expense._id)) {
          return [update.expense, ...prev];
        }
        return prev; // If it exists, don't add it again
      });
    } else if (update.type === "deleted") {
      setExpenses((prev) => prev.filter((expense) => expense._id !== update.id));
    }
  }, [setExpenses]);

  useEffect(() => {
    if (!socket || !setExpenses) return;

    // Listen for expenseUpdated events
    socket.on("expenseUpdated", handleExpenseUpdated);

    // Cleanup function
    return () => {
      console.log("Cleaning up expenseUpdated event listener");
      socket.off("expenseUpdated", handleExpenseUpdated); // Remove the specific listener
    };
  }, [socket, setExpenses, handleExpenseUpdated]);

  // Log expenses for debugging
  useEffect(() => {
    console.log("Expenses:", expenses.map((expense) => expense._id));
  }, [expenses]);

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <span>{expense.title}</span> - <span>${expense.amount}</span> - <span>{expense.category}</span>
            <button onClick={() => deleteExpense(expense._id)} aria-label="Delete expense">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;