import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import cicLogo from '../assets/cic_insurance.png';

const AnalyticsPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`analytics-page ${theme}-mode`} style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)',
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
        maxWidth: 600,
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>Analytics Dashboard</h1>
        <div className="analytics-widgets" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="widget kpi" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)',
            marginBottom: 8
          }}>
            <h2 style={{ color: '#A92219', fontSize: 20, margin: 0 }}>Total Policies</h2>
            <p style={{ fontSize: 32, fontWeight: 600, color: '#333', margin: 0 }}>42</p>
          </div>
          <div className="widget kpi" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)',
            marginBottom: 8
          }}>
            <h2 style={{ color: '#A92219', fontSize: 20, margin: 0 }}>Active Claims</h2>
            <p style={{ fontSize: 32, fontWeight: 600, color: '#333', margin: 0 }}>3</p>
          </div>
          <div className="widget chart" style={{
            background: '#f9f6ff',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 2px 8px rgba(128,0,0,0.06)'
          }}>
            <h2 style={{ color: '#A92219', fontSize: 20, margin: 0, marginBottom: 12 }}>Premiums Over Time</h2>
            <div style={{height:200,background:'#f5f5f5',borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#bbb'}}>Chart Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
