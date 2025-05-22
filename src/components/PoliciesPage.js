import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import cicLogo from '../assets/cic_insurance.png';

const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0'
};
const cardStyle = {
  background: '#fff',
  borderRadius: '18px',
  boxShadow: '0 6px 32px rgba(80, 0, 0, 0.10)',
  padding: '40px 32px',
  maxWidth: 500,
  width: '100%',
  textAlign: 'center',
  position: 'relative'
};

const buttonStyle = {
  background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 0',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  marginTop: 8,
  marginBottom: 8,
  transition: 'background 0.2s'
};

const PoliciesPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`policies-page ${theme}-mode`} style={containerStyle}>
      <div style={cardStyle}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>My Policies</h1>
        <div className="policies-list" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          <div className="policy-card" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)'
          }}>
            <h2 style={{ color: '#A92219', fontSize: 18, margin: 0 }}>Motor Insurance</h2>
            <p style={{ margin: '8px 0', color: '#008000', fontWeight: 500 }}>Status: Active</p>
            <p style={{ margin: '8px 0', color: '#333' }}>Start: 2024-01-01</p>
            <p style={{ margin: '8px 0', color: '#333' }}>End: 2025-01-01</p>
            <button style={buttonStyle}>View Details</button>
          </div>
          <div className="policy-card" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)'
          }}>
            <h2 style={{ color: '#A92219', fontSize: 18, margin: 0 }}>Family Health</h2>
            <p style={{ margin: '8px 0', color: '#A92219', fontWeight: 500 }}>Status: Expired</p>
            <p style={{ margin: '8px 0', color: '#333' }}>Start: 2023-01-01</p>
            <p style={{ margin: '8px 0', color: '#333' }}>End: 2024-01-01</p>
            <button style={buttonStyle}>Renew</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
