import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from 'chart.js';

// Registrar los componentes necesarios en Chart.js
ChartJS.register(Tooltip, Legend, Title, ArcElement);

export const Chart = ({ signedCount, pendingCount, inProcessCount }) => {
  // Datos para el gráfico
  const data = {
    labels: ['Signed', 'Pending', 'In Process'],
    datasets: [
      {
        data: [signedCount, pendingCount, inProcessCount],
        backgroundColor: ['#003366', '#6c757d', '#004d00'],
        hoverOffset: 4,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="mb-4">
      <div style={{ width: '100%', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

