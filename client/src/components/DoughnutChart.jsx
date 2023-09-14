import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { getMonth } from "../utils/timeUtils";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function DoughnutChart({ requests }) {
  const data = {
    labels: ["Network", "Printer", "Laptop", "Desktop"],
    datasets: [
      {
        label: "Request",
        data: [4, 6, 10, 2],
        backgroundColor: ["#06B6D4", "#00CACE", "#32DBBC", "#78E9A1"],
        borderWidth: 5,
        // pointBorder: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // cutout: 50,
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          boxWidth: 20,
        },
      },

    },
  };

  return (
    <div className="h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
