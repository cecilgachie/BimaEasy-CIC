import React, { useState } from 'react';
import { FaPlus, FaCreditCard, FaUserEdit, FaFileAlt, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PremiumModal from './PremiumModal';
import './QuickActions.css';

function QuickActions({ onNewPolicy }) {
  const navigate = useNavigate();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handlePayPremium = () => {
    setShowPremiumModal(true);
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleFileClaim = () => {
    navigate('/claims');
  };

  const handleGetSupport = () => {
    navigate('/support');
  };

  const handlePrintPremium = () => {
    window.print();
  };

  return (
    <div className="card quick-actions slide-in" style={{ animationDelay: '0.1s' }}>
      <h2>Quick Actions</h2>
      <div className="action-buttons">
        <button className="action-btn primary" onClick={onNewPolicy}>
          <FaPlus /> New Policy
        </button>
        <button className="action-btn" onClick={handlePayPremium}>
          <FaCreditCard /> Pay Premium
        </button>
        <button className="action-btn" onClick={handleUpdateProfile}>
          <FaUserEdit /> Update Profile
        </button>
        <button className="action-btn" onClick={handleFileClaim}>
          <FaFileAlt /> File Claim
        </button>
        <button className="action-btn" onClick={handleGetSupport}>
          <FaHeadset /> Get Support
        </button>
      </div>

      {showPremiumModal && (
        <PremiumModal
          onClose={() => setShowPremiumModal(false)}
          onPrint={handlePrintPremium}
        />
      )}
    </div>
  );
}

export default QuickActions;