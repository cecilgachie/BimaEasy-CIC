import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import cicLogo from '../assets/cic_insurance.png';

const SupportPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`support-page ${theme}-mode`} style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#fdfbfb 0%,#fffcfc 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(80, 0, 0, 0.10)',
        padding: '40px 32px',
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>Support</h1>
        <div className="support-section" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 style={{ color: '#A92219', fontSize: 18, marginBottom: 8 }}>Contact Us</h2>
          <p style={{ color: '#333', margin: 0 }}>Email: <a href="mailto:support@cicinsurance.com" style={{ color: '#A92219', textDecoration: 'underline' }}>support@cicinsurance.com</a></p>
          <p style={{ color: '#333', margin: 0 }}>Phone: <a href="tel:+254700000000" style={{ color: '#A92219', textDecoration: 'underline' }}>+254 700 000 000</a></p>
          <form className="support-form" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
            <label style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Subject</label>
            <input type="text" placeholder="Subject" style={{
              borderRadius: 8,
              border: '1px solid #e0e0e0',
              padding: '10px',
              background: '#f8f8f8',
              marginBottom: 8
            }} />
            <label style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Message</label>
            <textarea placeholder="Describe your issue or question" style={{
              borderRadius: 8,
              border: '1px solid #e0e0e0',
              padding: '10px',
              background: '#f8f8f8',
              minHeight: 80,
              marginBottom: 8
            }} />
            <button type="submit" style={{
              background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              marginTop: 8,
              transition: 'background 0.2s'
            }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
