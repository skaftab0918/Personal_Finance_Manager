import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/ExpenseChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const categories = ['Food', 'Travel', 'Bills', 'Other'];
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map((category) =>
          expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff', // White text for legend
        },
      },
      title: {
        display: true,
        text: 'Expense Distribution by Category',
        color: '#ffffff', // White text for title
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // White text for x-axis
        },
        grid: {
          color: '#333', // Dark grid lines for x-axis
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // White text for y-axis
        },
        grid: {
          color: '#333', // Dark grid lines for y-axis
        },
      },
    },
  };

  return (
    <div className="expense-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;