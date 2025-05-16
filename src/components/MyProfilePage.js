import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import cicLogo from '../assets/cic_insurance.png';

const MyProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className={`profile-page ${theme}-mode`}>
      {/* Header with logo and navigation */}
      <header className="cover-header">
        <div className="logo">
          {!logoError ? (
            <img 
              src={cicLogo} 
              alt="CIC GROUP" 
              onError={() => setLogoError(true)}
              style={{ height: 48 }}
            />
          ) : (
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              color: '#800000' 
            }}>
              CIC GROUP
            </div>
          )}
        </div>
        <div className="nav-links">
          <div className="auth-links">
            <button className="nav-link login-link" style={{ background: 'none', border: 'none', color: '#800000', cursor: 'pointer' }}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <div style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)',
        display: 'flex',
        flexDirection: 'row',
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
          position: 'relative',
          margin: '0 auto'
        }}>
          <div style={{ position: 'absolute', top: 24, right: 24 }}>
            <Link to="/settings" title="Settings">
              <i className="fa-solid fa-gear" style={{ color: '#800000', fontSize: 22 }}></i>
            </Link>
          </div>
          <div className="profile-avatar" style={{width:120,height:120,borderRadius:'50%',background:'#eee',margin:'0 auto 20px', border:'4px solid #800000', display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,color:'#800000'}}>
            <i className="fa-regular fa-user"></i>
          </div>
          <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>My Profile</h1>
          <form className="profile-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Name</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', marginBottom: 8 }}>
              <i className="fa-regular fa-user" style={{ marginRight: 8, color: '#800000' }}></i>
              <input type="text" value="Robert Smith" readOnly style={{ border: 'none', background: 'transparent', width: '100%' }} />
            </div>
            <label style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Email</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', marginBottom: 8 }}>
              <i className="fa-regular fa-envelope" style={{ marginRight: 8, color: '#800000' }}></i>
              <input type="email" value="user@example.com" readOnly style={{ border: 'none', background: 'transparent', width: '100%' }} />
            </div>
            <label style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Mobile</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', marginBottom: 8 }}>
              <i className="fa-solid fa-phone" style={{ marginRight: 8, color: '#800000' }}></i>
              <input type="text" value="+254700000000" readOnly style={{ border: 'none', background: 'transparent', width: '100%' }} />
            </div>
          </form>
          <button style={{
            marginTop: 24,
            background: '#800000',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 0',
            width: '100%',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(128,0,0,0.08)'
          }}>
            Edit Profile
          </button>
        </div>
      </div>

      <footer className="cic-footer">
        <div className="footer-content">
          <p>Let us guide you through your life's journey</p>
          <p className="contact-info">
            Call us directly on 0703 099 120 or Email us at <a 
              href="mailto:callc@cic.co.ke" 
              style={{ 
                color: 'white', 
                textDecoration: 'underline' 
              }}
            >
              callc@cic.co.ke
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyProfilePage;
