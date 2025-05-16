import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import ProductSelectionModal from './productselectionmodule';
import '../styles/claims.css';

const ClaimsPage = () => {
  const { theme } = useContext(ThemeContext);
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <div className={`claims-page ${theme}-mode`}>
      <h1 className="claims-title">Claims</h1>
      <div className="claims-list">
        {/* List user's claims here */}
        <div className="claim-card claim-card--processing">
          <div className="claim-header">
            <h2>Claim #12345</h2>
            <span className="claim-status processing">Processing</span>
          </div>
          <p className="claim-type">Type: <span>Motor</span></p>
          <button className="view-details-btn">View Details</button>
        </div>
        <div className="claim-card claim-card--settled">
          <div className="claim-header">
            <h2>Claim #67890</h2>
            <span className="claim-status settled">Settled</span>
          </div>
          <p className="claim-type">Type: <span>Health</span></p>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
      <button className="new-claim-btn" onClick={() => setShowProductModal(true)}>
        + File New Claim
      </button>
      <ProductSelectionModal open={showProductModal} onClose={() => setShowProductModal(false)} />
    </div>
  );
};

export default ClaimsPage;
