import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import './App.css';

const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <div className="main-section">
      <Header />
      <MainContent />
    </div>
  </div>
);

export default Dashboard;
