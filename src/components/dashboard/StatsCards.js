import React from 'react';
import { FaEye, FaClipboardList, FaBell } from 'react-icons/fa';

function StatsCards({ stats }) {
  return (
    <div className="stats-container">
      <div className="card stat-card fade-in">
        <div className="stat-icon visits">
          <FaEye />
        </div>
        <div className="stat-info">
          <h3>{stats.totalVisits}</h3>
          <p>Portal Visits</p>
        </div>
      </div>
      
      <div className="card stat-card fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="stat-icon projects">
          <FaClipboardList />
        </div>
        <div className="stat-info">
          <h3>{stats.activeProjects}</h3>
          <p>Active Policies</p>
        </div>
      </div>
      
      <div className="card stat-card fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="stat-icon notifications">
          <FaBell />
        </div>
        <div className="stat-info">
          <h3>{stats.notifications}</h3>
          <p>Notifications</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;