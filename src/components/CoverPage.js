import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import ProductSelectionModal from './productselectionmodule';
import cicLogo from '../assets/enhanced/cic_insurance.png';
import fillFormImg from '../assets/fill-form.png';
import quotationImg from '../assets/quotation.png';
import policyImg from '../assets/policy.png';
import { ThemeContext } from '../ThemeContext';

function CoverPage() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`coverpage-root ${theme}-mode`} 
      style={{
        minHeight: '100vh',
        background: theme === 'dark' ? '#232526' : '#fff',
        color: theme === 'dark' ? '#fff' : '#222',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px 8px 32px',
        borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#eee'}`,
        background: theme === 'dark' ? '#232526' : '#fff',
        position: 'relative',
        minHeight: 70,
        transition: 'background-color 0.3s, border-color 0.3s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={cicLogo} alt="CIC GROUP" style={{ height: 40 }} />
          <span style={{ fontWeight: 600, color: '#800000', fontSize: 14, marginLeft: 4 }}>CIC GROUP</span>
        </div>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 500, color: theme === 'dark' ? '#ccc' : '#888', fontSize: 16 }}>
          <Link to="/faqs" style={{ color: theme === 'dark' ? '#ccc' : '#888', textDecoration: 'none' }}>FAQs</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className="theme-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#fff' : '#800000',
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'background-color 0.3s'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/login" style={{ color: '#800000', fontWeight: 500, textDecoration: 'none', fontSize: 16 }}>
            <i className="fa-regular fa-user" style={{ marginRight: 4 }}></i> Login/Register
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div 
        style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '40px 16px 0 16px', 
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
          transition: 'opacity 1.5s ease-out, transform 1.5s ease-out'
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 20, color: theme === 'dark' ? '#ccc' : '#222', marginBottom: 8 }}>Welcome to CIC Insurance Group</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: theme === 'dark' ? '#fff' : '#111', marginBottom: 8 }}>We keep our word</div>
          <div style={{ fontSize: 18, color: theme === 'dark' ? '#aaa' : '#888', marginBottom: 32 }}>Getting Insured with us is easy as 1-2-3</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 60, marginBottom: 40, flexWrap: 'wrap' }}>
          {/* Step 1 */}
          <div style={{
            width: 260,
            minWidth: 220,
            padding: '20px',
            borderRadius: '12px',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
            boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'background-color 0.3s, box-shadow 0.3s'
          }}>
            <img src={fillFormImg} alt="Fill in details" style={{ width: 140, height: 140, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#b71c1c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontWeight: 600, fontSize: 18 }}>1</div>
            <div style={{ fontWeight: 500, color: '#b71c1c', fontSize: 17, marginBottom: 6 }}>Fill in some details</div>
            <div style={{ color: theme === 'dark' ? '#ccc' : '#888', fontSize: 15 }}>Fill in basic information about yourself and what you want to cover.</div>
          </div>
          {/* Step 2 */}
          <div style={{
            width: 260,
            minWidth: 220,
            padding: '20px',
            borderRadius: '12px',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
            boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'background-color 0.3s, box-shadow 0.3s'
          }}>
            <img src={quotationImg} alt="Get a quotation" style={{ width: 140, height: 140, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#b71c1c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontWeight: 600, fontSize: 18 }}>2</div>
            <div style={{ fontWeight: 500, color: '#b71c1c', fontSize: 17, marginBottom: 6 }}>Get a quotation</div>
            <div style={{ color: theme === 'dark' ? '#ccc' : '#888', fontSize: 15 }}>Pick from different quotations the cover that is best for you.</div>
          </div>
          {/* Step 3 */}
          <div style={{
            width: 260,
            minWidth: 220,
            padding: '20px',
            borderRadius: '12px',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
            boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'background-color 0.3s, box-shadow 0.3s'
          }}>
            <img src={policyImg} alt="Buy & Get Covered" style={{ width: 140, height: 140, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#b71c1c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', fontWeight: 600, fontSize: 18 }}>3</div>
            <div style={{ fontWeight: 500, color: '#b71c1c', fontSize: 17, marginBottom: 6 }}>Buy & Get Covered</div>
            <div style={{ color: theme === 'dark' ? '#ccc' : '#888', fontSize: 15 }}>Buy the cover you like and enjoy the personal attention you deserve.</div>
          </div>
        </div>
        <button
          style={{
            background: theme === 'dark' ? '#d32f2f' : '#b71c1c',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: 10,
            boxShadow: theme === 'dark' ? '0 4px 16px rgba(211, 47, 47, 0.3)' : '0 2px 8px rgba(183, 28, 28, 0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.2s',
            transform: 'translateY(0)',
          }}
          onClick={() => setShowModal(true)}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Let's start! <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      {showModal && (
        <ProductSelectionModal
          open={true}
          onClose={() => setShowModal(false)}
          onSelect={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CoverPage;