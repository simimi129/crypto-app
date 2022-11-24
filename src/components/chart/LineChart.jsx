import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#eee",
        borderColor: "#ddd",
      },
    ],
  };

  const options = {};

  return (
    <>
      <div className="chart-header">
        <span className="chart-title">{coinName} Price Chart</span>
        <div className="price-container">
          <span className="price-change">{coinHistory?.data?.change}%</span>
          <span className="current-price">
            Current {coinName} Price: ${currentPrice}
          </span>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
