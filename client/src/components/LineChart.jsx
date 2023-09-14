import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { getMonth } from "../utils/timeUtils";

ChartJS.register(
  Tooltip,
  Title,
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function LineChart({ requests }) {
  const [showLabels, setShowLabels] = useState(window.innerWidth >= 428);
  const requestCountsByMonth = {};

  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  

  useEffect(() => {
    const handleResize = () => {
      setShowLabels(window.innerWidth >= 428);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   const sortedRequest = [...requests].sort((a, b) => {
  //     return a.createdAt._seconds - b.createdAt._seconds;
  //   });

  requests.forEach((request) => {
    const month = getMonth(request.createdAt._seconds);
    if (!requestCountsByMonth[month]) {
      requestCountsByMonth[month] = 1;
    } else {
      requestCountsByMonth[month]++;
    }
  });

  const uniqueMonths = Object.keys(requestCountsByMonth);
  const requestCounts = uniqueMonths.map(
    (month) => requestCountsByMonth[month]
  );

  const data = (canvas) => {
    return {
      labels: MONTHS,
      datasets: [
        {
          label: "Request",
          data: [4, 6, 10, 14, 13, 20, 10, 12, 8, 12, 10, 9],
          borderColor: "#06b6d4",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 180);
            gradient.addColorStop(0, "#06b6d4");
            gradient.addColorStop(1, "#5eead420");
            return gradient;
          },
          fill: "start",
          tension: 0.4,
          borderWidth: 0,
          pointColor: "white",
        },
      ],
    };
  };

  const options = {
    layout: {
      autoPadding: false,
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: "Monthly Number of Requests",
        // padding: 20,
      },
      legend: {
        display: false,
      },
      tooltip: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "#06b6d4",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: showLabels ? true : false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        // display: false,
      },
      y: {
        beginAtZero: true,
        display: showLabels ? true : false,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Line data={data()} options={options} />
    </div>
  );
}

export default LineChart;
