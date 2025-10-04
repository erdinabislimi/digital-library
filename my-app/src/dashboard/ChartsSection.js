import React from 'react';
import { FaChartLine, FaChartPie } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Borrowings',
      data: [65, 59, 80, 81, 56, 55],
      
      borderColor: '#981c5c',
      tension: 0.1,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Borrowing Trend (Last 6 Months)' },
  },
};

const doughnutData = {
  labels: ['In-Person', 'Online', 'Referral', 'Social Media'],
  datasets: [
    {
      label: 'Engagement',
      data: [38, 25, 20, 17],
      backgroundColor: ['#981c5c', '#e8dcdc', '#981c5c', '#e8dcdc'],
      hoverOffset: 4,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: { position: 'bottom' },
  },
};

const ChartsSection = () => (
  <div className="row my-4">
    {/* Borrowing Trend Chart */}
    <div className="col-md-6 mb-3">
      <div className="card shadow-sm border-0">
        <div
          className="chart-card-header d-flex align-items-center px-3 py-2"
          style={{
            background: 'linear-gradient(45deg, #e8dcdc,#981c5c)',
            color: '#fff',
          }}
        >
          <FaChartLine className="me-2" size={24} />
          <h5 className="mb-0">Borrowing Trend</h5>
        </div>
        <div className="card-body p-4">
          {/* Fixed-height container for a smaller chart */}
          <div style={{ height: '250px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>

    {/* Member Engagement Chart */}
    <div className="col-md-6 mb-3">
      <div className="card shadow-sm border-0">
        <div
          className="chart-card-header d-flex align-items-center px-3 py-2"
          style={{
            background: 'linear-gradient(45deg, #e8dcdc, #981c5c)',
            color: '#fff',
          }}
        >
          <FaChartPie className="me-2" size={24} />
          <h5 className="mb-0">Member Engagement</h5>
        </div>
        <div className="card-body p-4">
          {/* Fixed-height container for a smaller chart */}
          <div style={{ height: '250px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChartsSection;
