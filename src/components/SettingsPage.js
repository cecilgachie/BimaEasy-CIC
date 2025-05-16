import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import cicLogo from '../assets/cic_insurance.png';

const SettingsPage = () => {
  const { theme } = useContext(ThemeContext);

  // State for profile info
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john.doe@email.com' });
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

  // State for theme
  const [darkMode, setDarkMode] = useState(false);

  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

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

  const handleThemeToggle = () => {
    setDarkMode((v) => !v);
    // Optionally persist theme
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    setDeleteMsg('Account deleted. (Simulated)');
    // TODO: Integrate with API
  };

  return (
    <div className={`settings-page ${theme}-mode`} style={{
      minHeight: '100vh',
      background: darkMode
        ? 'linear-gradient(135deg, #232526 0%, #414345 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e3e6f3 100%)',
      color: darkMode ? '#fff' : '#222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      transition: 'background 0.3s, color 0.3s'
    }} aria-label="Settings Page">
      <div style={{
        background: darkMode ? '#2c2c2c' : '#fff',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(80, 0, 0, 0.10)',
        padding: '40px 32px',
        maxWidth: 420,
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        transition: 'background 0.3s'
      }}>
        <img src={cicLogo} alt="CIC Logo" style={{ width: 80, marginBottom: 24 }} />
        <h1 style={{ color: '#800000', fontWeight: 700, marginBottom: 24 }}>Settings</h1>
        {/* Theme Switcher */}
        <div style={{ position: 'absolute', top: 24, right: 32 }}>
          <button
            aria-label="Toggle dark mode"
            onClick={handleThemeToggle}
            style={{
              background: 'none',
              border: 'none',
              color: darkMode ? '#fff' : '#800000',
              fontSize: 20,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
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
                style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: darkMode ? '#444' : '#f8f8f8', color: darkMode ? '#fff' : '#222' }}
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
                style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: darkMode ? '#444' : '#f8f8f8', color: darkMode ? '#fff' : '#222' }}
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
              style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '10px', background: darkMode ? '#444' : '#f8f8f8', color: darkMode ? '#fff' : '#222', marginBottom: 8 }}
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
