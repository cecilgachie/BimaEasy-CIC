import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import cicLogo from '../assets/cic_insurance.png';
import '../styles/theme.css';

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [useSystemTheme, setUseSystemTheme] = useState(!localStorage.getItem('theme'));

  // State for profile info
  const [profile, setProfile] = useState({ name: 'Andy Mugata Ked', email: 'andy.mugata@cicgroup.co.ke' });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // State for password change
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

  // State for notification preferences
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [notifMsg, setNotifMsg] = useState('');

  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      setUseSystemTheme(true);
      // Let the ThemeContext handle system theme
    } else {
      localStorage.setItem('theme', newTheme);
      setUseSystemTheme(false);
      toggleTheme();
    }
  };

  // Handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileMsg('Profile updated!');
    setEditingProfile(false);
    setTimeout(() => setProfileMsg(''), 2000);
    // TODO: Integrate with API
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    setPasswordMsg('');
    // Simulate API call
    setTimeout(() => {
      setLoadingPassword(false);
      if (password.length < 6) {
        setPasswordMsg('Password must be at least 6 characters.');
      } else {
        setPasswordMsg('Password updated successfully!');
        setPassword('');
      }
    }, 1200);
  };

  const handleNotifChange = (type) => {
    if (type === 'email') setEmailNotif((v) => !v);
    if (type === 'sms') setSmsNotif((v) => !v);
    setNotifMsg('Preferences updated!');
    setTimeout(() => setNotifMsg(''), 1500);
    // TODO: Integrate with API
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setDeleteMsg('Account deleted. (Simulated)');
    // TODO: Integrate with API
  };

  return (
    <div className={`settings-page theme-container ${theme}-mode`} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0'
    }} aria-label="Settings Page">
      <div className="theme-card" style={{
        padding: '40px 32px',
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 className="theme-text" style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>Settings</h1>
        
        {/* Theme Settings */}
        <div className="settings-section" style={{ marginBottom: 24 }}>
          <h2 className="theme-text" style={{ color: '#A92219', fontSize: 18, marginBottom: 16 }}>Theme Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label className="theme-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="radio"
                name="theme"
                checked={useSystemTheme}
                onChange={() => handleThemeChange('system')}
                style={{ accentColor: '#A92219' }}
              />
              Use System Theme
            </label>
            <label className="theme-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="radio"
                name="theme"
                checked={!useSystemTheme && theme === 'light'}
                onChange={() => handleThemeChange('light')}
                style={{ accentColor: '#A92219' }}
              />
              Light Theme
            </label>
            <label className="theme-text" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="radio"
                name="theme"
                checked={!useSystemTheme && theme === 'dark'}
                onChange={() => handleThemeChange('dark')}
                style={{ accentColor: '#A92219' }}
              />
              Dark Theme
            </label>
          </div>
        </div>

        <div className="settings-section" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Profile Info */}
          <h2 style={{ color: '#A92219', fontSize: 18, marginBottom: 8 }}>Profile Information</h2>
          {editingProfile ? (
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
              <label htmlFor="name" style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: theme === 'dark' ? '#444' : '#f8f8f8', color: theme === 'dark' ? '#fff' : '#222' }}
                aria-label="Name"
                required
              />
              <label htmlFor="email" style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: theme === 'dark' ? '#444' : '#f8f8f8', color: theme === 'dark' ? '#fff' : '#222' }}
                aria-label="Email"
                required
              />
              <button type="submit" style={{
                background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 8
              }}>Save</button>
              <button type="button" onClick={() => setEditingProfile(false)} style={{
                background: '#f5f5f5',
                color: '#800000',
                border: '1px solid #800000',
                borderRadius: 8,
                padding: '10px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 8
              }}>Cancel</button>
            </form>
          ) : (
            <div style={{ marginBottom: 8 }}>
              <div style={{ marginBottom: 4 }}><b>Name:</b> {profile.name}</div>
              <div style={{ marginBottom: 4 }}><b>Email:</b> {profile.email}</div>
              <button onClick={() => setEditingProfile(true)} style={{
                background: '#f5f5f5',
                color: '#800000',
                border: '1px solid #800000',
                borderRadius: 8,
                padding: '6px 0',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                marginTop: 4
              }}>Edit</button>
            </div>
          )}
          {profileMsg && <div role="status" style={{ color: '#008000', marginBottom: 8 }}>{profileMsg}</div>}

          {/* Account Settings */}
          <h2 style={{ color: '#A92219', fontSize: 18, marginBottom: 8 }}>Account Settings</h2>
          <form className="settings-form" onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <label htmlFor="new-password" style={{ textAlign: 'left', color: '#A92219', fontWeight: 500 }}>Change Password</label>
            <input
              id="new-password"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: theme === 'dark' ? '#444' : '#f8f8f8', color: theme === 'dark' ? '#fff' : '#222', marginBottom: 8 }}
              aria-label="New Password"
              required
            />
            <button type="submit" disabled={loadingPassword} style={{
              background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 15,
              cursor: loadingPassword ? 'not-allowed' : 'pointer',
              marginTop: 8,
              transition: 'background 0.2s',
              opacity: loadingPassword ? 0.7 : 1
            }}>{loadingPassword ? 'Updating...' : 'Update Password'}</button>
            {passwordMsg && <div role="status" style={{ color: passwordMsg.includes('success') ? '#008000' : '#A92219', marginTop: 4 }}>{passwordMsg}</div>}
          </form>

          {/* Notification Preferences */}
          <h2 style={{ color: '#A92219', fontSize: 18, marginBottom: 8 }}>Notification Preferences</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => handleNotifChange('email')}
              style={{ accentColor: '#A92219' }}
              aria-checked={emailNotif}
              aria-label="Email Notifications"
            /> Email Notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => handleNotifChange('sms')}
              style={{ accentColor: '#A92219' }}
              aria-checked={smsNotif}
              aria-label="SMS Notifications"
            /> SMS Notifications
          </label>
          {notifMsg && <div role="status" style={{ color: '#008000', marginBottom: 8 }}>{notifMsg}</div>}

          {/* Privacy & Security */}
          <h2 style={{ color: '#A92219', fontSize: 18, marginBottom: 8 }}>Privacy & Security</h2>
          <button style={{
            background: '#f5f5f5',
            color: '#800000',
            border: '1px solid #800000',
            borderRadius: 8,
            padding: '10px 0',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 8,
            transition: 'background 0.2s'
          }}
            aria-label="Download My Data"
            onClick={() => alert('Download started! (Simulated)')}
          >Download My Data</button>
          <button style={{
            background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 0',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 8,
            transition: 'background 0.2s'
          }}
            aria-label="Delete My Account"
            onClick={() => setShowDeleteConfirm(true)}
          >Delete My Account</button>
          {deleteMsg && <div role="status" style={{ color: '#A92219', marginBottom: 8 }}>{deleteMsg}</div>}
        </div>
        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div role="dialog" aria-modal="true" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#fff',
              color: '#222',
              borderRadius: 12,
              padding: 32,
              minWidth: 300,
              textAlign: 'center',
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
            }}>
              <h3 style={{ color: '#A92219', marginBottom: 16 }}>Are you sure?</h3>
              <p style={{ marginBottom: 24 }}>This action will permanently delete your account.</p>
              <button onClick={handleDeleteAccount} style={{
                background: 'linear-gradient(90deg, #A92219 0%, #800000 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginRight: 12
              }}>Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} style={{
                background: '#f5f5f5',
                color: '#800000',
                border: '1px solid #800000',
                borderRadius: 8,
                padding: '10px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
