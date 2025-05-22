import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import FAQSection from './shared/faq/FAQSection';
import '../styles/faqs.css';
import cicLogo from '../assets/cic_insurance.png';

const FAQs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [logoError, setLogoError] = useState(false);

  return (
    <div className={`faqs-page ${theme}-mode`}>
      {/* Header with logo and navigation */}
      <header className="faqs-header">
        <div className="faqs-container">
          <div className="faqs-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="faqs-logo">
              {!logoError ? (
                <img
                  src={cicLogo}
                  alt="CIC GROUP"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="faqs-logo-text">
                  CIC GROUP
                </div>
              )}
            </div>
            <nav className="faqs-nav">
              <Link to="/" className="faqs-nav-link">Home</Link>
              <button
                onClick={toggleTheme}
                className="faqs-nav-link theme-toggle-btn"
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <Link to="/login" className="faqs-nav-link faqs-login-link">
                <i className="fa-regular fa-user"></i> Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="faqs-container">
        <div className="faqs-content-wrap">
          {/* Main FAQ Section using the shared component */}
          <FAQSection
            showTitle={true}
            showCategories={true}
            showSearch={true}
            showContactCTA={true}
          />
        </div>
      </main>

      <footer className="faqs-footer">
        <div className="faqs-container">
          <div className="faqs-footer-content">
            <p>Let us guide you through your life's journey</p>
            <p className="faqs-contact-info">
              Call us directly on <span>0703 099 120</span> or Email us at <a
                href="mailto:callc@cic.co.ke"
                className="faqs-footer-email"
              >
                callc@cic.co.ke
              </a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQs;