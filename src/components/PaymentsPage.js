import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import cicLogo from '../assets/cic_insurance.png';

const PaymentsPage = () => {
  const { theme } = useContext(ThemeContext);
  const darkMode = theme === 'dark';

  return (
    <div className={`payments-page ${theme}-mode`} style={{
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      color: darkMode ? '#fff' : '#222',
      transition: 'background 0.3s, color 0.3s'
    }}>
      <div style={{
        background: darkMode ? '#2c2c2c' : '#fff',
        borderRadius: '18px',
        boxShadow: darkMode 
          ? '0 6px 32px rgba(0, 0, 0, 0.3)'
          : '0 6px 32px rgba(80, 0, 0, 0.10)',
        padding: '40px 32px',
        maxWidth: 500,
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        transition: 'background 0.3s, box-shadow 0.3s'
      }}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>Payments</h1>
        <div className="payments-list" style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
          <div className="payment-card" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)'
          }}>
            <h2 style={{ color: '#A92219', fontSize: 18, margin: 0 }}>Premium Payment</h2>
            <p style={{ margin: '8px 0', color: '#333' }}>Amount: <b>KES 15,000</b></p>
            <p style={{ margin: '8px 0', color: '#333' }}>Date: 2025-05-01</p>
            <p style={{ margin: '8px 0', color: '#008000', fontWeight: 500 }}>Status: Successful</p>
          </div>
          <div className="payment-card" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)'
          }}>
            <h2 style={{ color: '#A92219', fontSize: 18, margin: 0 }}>Claim Payout</h2>
            <p style={{ margin: '8px 0', color: '#333' }}>Amount: <b>KES 50,000</b></p>
            <p style={{ margin: '8px 0', color: '#333' }}>Date: 2025-04-15</p>
            <p style={{ margin: '8px 0', color: '#008000', fontWeight: 500 }}>Status: Completed</p>
          </div>
        </div>
        <button className="make-payment-btn" style={{
          background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(128,0,0,0.10)',
          transition: 'background 0.2s'
        }}>Make a Payment</button>
      </div>
    </div>
  );
};

export default PaymentsPage;
