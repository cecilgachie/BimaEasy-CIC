import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../utils/auth';
import cicLogo from '../../assets/cic_insurance.png';

function Sidebar({ userData, theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={cicLogo} alt="Logo" />
      </div>
      <hr />
      <ul className="nav-menu">
        <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className={`nav-item ${location.pathname === '/policies' ? 'active' : ''}`}>
          <a href="/policies">My Policies</a>
        </li>
        <li className={`nav-item ${location.pathname === '/claims' ? 'active' : ''}`}>
          <a href="/claims">Claims</a>
        </li>
        <li className={`nav-item ${location.pathname === '/payments' ? 'active' : ''}`}>
          <a href="/payments">Payments</a>
        </li>
        <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <a href="/profile">Profile</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;