// src/pages/analytics/AnalyticsPage.jsx
import React from "react";
import Sidebar from "../../components/sidbar/Sidebar";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  // Dummy chart data
  const modelPerformanceData = {
    labels: ["Epoch 1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "Model 1",
        data: [0.1, 0.2, 0.35, 0.48, 0.58, 0.67, 0.72],
        borderColor: "#3b82f6",
        tension: 0.4,
      },
      {
        label: "Model 2",
        data: [0.08, 0.19, 0.3, 0.43, 0.51, 0.61, 0.7],
        borderColor: "#22d3ee",
        tension: 0.4,
      },
      {
        label: "Model 3",
        data: [0.05, 0.15, 0.25, 0.35, 0.45, 0.52, 0.6],
        borderColor: "#f87171",
        tension: 0.4,
      },
      {
        label: "Model 4",
        data: [0.09, 0.18, 0.3, 0.4, 0.5, 0.59, 0.64],
        borderColor: "#38bdf8",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ["#3b82f6", "#22d3ee", "#0ea5e9", "#2dd4bf"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Forecast",
        data: [10, 20, 35, 25, 40],
        backgroundColor: "#3b82f6",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="d-flex min-vh-100 text-light" style={{ backgroundColor: "#0f172a" }}>
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">Analytics</h2>

        <div className="row g-4">
          {/* Charts */}
          <div className="col-md-6">
            <div className="rounded p-3 h-100" style={{ backgroundColor: "#1a2238", cursor: "pointer" }} >
              <h5 className="mb-3">Model Performance</h5>
              <Line data={modelPerformanceData} options={{ responsive: true, plugins: { legend: { labels: { color: "#fff" } } }, scales: { x: { ticks: { color: "#fff" } }, y: { ticks: { color: "#fff" } } } }} />
            </div>
          </div>

          <div className="col-md-6">
            <div className="rounded p-3 h-100" style={{ backgroundColor: "#1a2238", cursor: "pointer" }} >
              <h5 className="mb-3">Data Distribution</h5>
              <Doughnut data={doughnutData} options={{ plugins: { legend: { labels: { color: "#fff" } } } }} />
            </div>
          </div>

          {/* Metrics */}
          <div className="col-md-4">
            <div className="rounded p-4 text-center" style={{ backgroundColor: "#1a2238", cursor: "pointer" }} >
              <h6 className="text-muted">Tabular Metric</h6>
              <h2 className="mt-2">0,812</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="rounded p-4 text-center" style={{ backgroundColor: "#1a2238", cursor: "pointer" }} >
              <h6 className="text-muted">Clusters</h6>
              <h2 className="mt-2">5</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="rounded p-3" style={{ backgroundColor: "#1a2238", cursor: "pointer" }} >
              <h6 className="text-muted text-center mb-3">Time Series Forecast</h6>
              <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { x: { ticks: { color: "#fff" } }, y: { ticks: { color: "#fff" } } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
