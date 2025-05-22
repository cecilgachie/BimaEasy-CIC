import React from 'react';
import { FaBell, FaUser, FaCog } from 'react-icons/fa';

function Header({ userData, profileImage, notifications, toggleNotificationCenter, toggleProfileModal }) {
  return (
    <div className="header">
      <div className="welcome-text">
        <h1>Welcome back, {userData.name.split(' ')[0]}</h1>
        <p>Last login: {userData.lastLogin}</p>
      </div>
      <div className="user-actions">
        <div className="notification-bell" onClick={toggleNotificationCenter}>
          <FaBell />
          <span className="notification-badge">{notifications.length}</span>
        </div>
        <div className="user-dropdown" onClick={toggleProfileModal}>
          <div className="avatar">
            <img
              src={profileImage || require('../../assets/dashboard-placeholder.jpg')}
              alt={`${userData.name} profile`}
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;