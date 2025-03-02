import React from 'react';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import '../styles/ExportButtons.css';

const ExportButtons = ({ expenses }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Report', 10, 10);
    expenses.forEach((expense, index) => {
      doc.text(
        `${expense.title} - $${expense.amount} - ${expense.category}`,
        10,
        20 + index * 10
      );
    });
    doc.save('expenses.pdf');
  };

  const csvData = expenses.map((expense) => ({
    Title: expense.title,
    Amount: expense.amount,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString(),
  }));

  return (
    <div className="export-buttons">
      <button onClick={handleExportPDF} className="export-button">
        Export as PDF
      </button>
      <CSVLink data={csvData} filename="expenses.csv" className="export-button">
        Export as CSV
      </CSVLink>
    </div>
  );
};

export default ExportButtons;