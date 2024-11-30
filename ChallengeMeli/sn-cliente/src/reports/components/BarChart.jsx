// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export const BarChart = ({ data }) => {
  // Prepare the data for the chart
  const chartData = {
    labels: data.map(item => item.month), // Months as labels
    datasets: [
      {
        label: 'Documentos Procesados',
        data: data.map(item => item.count), // Document counts for each month
        backgroundColor: 'rgba(0, 123, 255, 0.5)', // Semi-transparent blue color for the bars
        borderColor: 'rgba(0, 123, 255, 1)', // Solid blue color for the border
        borderWidth: 1,
      }
    ],
  };

  // Configure the chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} documentos`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Numero de documentos',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


