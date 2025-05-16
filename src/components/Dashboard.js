import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/auth.css';
import { DateRangeCalendar, MonthPicker } from './shared/Calendar';
import { isAuthenticated, logout, getCurrentUser, USER_TYPES } from '../utils/auth';
import { initializeSession } from '../utils/sessionManager';
import { getNotifications, markAsRead, markAllAsRead, NOTIFICATION_TYPES, addNotification } from '../utils/notificationManager';
import Chart from 'chart.js/auto';
import ProductSelectionModal from './productselectionmodule';
import { ThemeContext } from '../App';

function Dashboard() {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const quoteData = location.state || null;
  
  // Get complete user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('registrationData') || '{}');
  
  const [userData, setUserData] = useState({
    name: storedUser.firstName || 'User',
    email: storedUser.email || '',
    lastLogin: storedUser.lastLogin || new Date().toLocaleString(),
    userType: storedUser.userType || 'customer',
    fullName: `${storedUser.firstName || ''} ${storedUser.lastName || ''}`.trim(),
    mobileNo: storedUser.mobileNo || '',
    nationality: storedUser.nationality || '',
    idNumber: storedUser.id || ''
  });
  const [stats, setStats] = useState({
    totalVisits: 156,
    activeProjects: 3,
    notifications: 5
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [quoteOptions, setQuoteOptions] = useState([
    { id: 1, name: 'Basic Cover', price: 15000, coverage: 'Essential coverage' },
    { id: 2, name: 'Standard Cover', price: 25000, coverage: 'Comprehensive coverage with added benefits' },
    { id: 3, name: 'Premium Cover', price: 40000, coverage: 'Full coverage with all benefits included' }
  ]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [dashboardLayout, setDashboardLayout] = useState(
    JSON.parse(localStorage.getItem('dashboardLayout')) || {
      showStats: true,
      showActivity: true,
      showQuickActions: true,
      showFAQ: true,
      showCalendar: true
    }
  );
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Add modals for quick actions
  const [showNewPolicyModal, setShowNewPolicyModal] = useState(false);
  const [showPayPremiumModal, setShowPayPremiumModal] = useState(false);

  // Update NewPolicyModal to use ProductSelectionModal
  const NewPolicyModal = () => showNewPolicyModal && (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '90%'
      }}>
        <ProductSelectionModal
          open={true}
          onClose={() => setShowNewPolicyModal(false)}
          onSelect={(product) => {
            setShowNewPolicyModal(false);
            alert(`You selected: ${product}`);
          }}
        />
      </div>
    </div>
  );

  const PayPremiumModal = () => showPayPremiumModal && (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '90%'
      }}>
        <h2>Pay Premium</h2>
        <div>
          <h3>Life Insurance Plans</h3>
          <ul>
            <li>Basic Plan: KES 15,000</li>
            <li>Standard Plan: KES 25,000</li>
            <li>Premium Plan: KES 40,000</li>
          </ul>
          <button
            onClick={() => alert('Premium payment process initiated!')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#882323',
              color: 'white',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Proceed to Payment
          </button>
        </div>
        <button
          onClick={() => setShowPayPremiumModal(false)}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#882323',
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  // Add useEffect to update user data when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('registrationData') || '{}');
      setUserData({
        name: updatedUser.firstName || 'User',
        email: updatedUser.email || '',
        lastLogin: updatedUser.lastLogin || new Date().toLocaleString(),
        userType: updatedUser.userType || 'customer',
        fullName: `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim(),
        mobileNo: updatedUser.mobileNo || '',
        nationality: updatedUser.nationality || '',
        idNumber: updatedUser.id || ''
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    // TEMPORARY BYPASS for testing: always allow dashboard access
    // Remove or comment out this block after testing
    // if (!isAuthenticated()) {
    //   navigate('/login');
    //   return;
    // }

    // Simulate fetching user data
    let isCancelled = false;

    const fetchUserData = async () => {
      if (!isMounted || isCancelled) return;

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get user data using the centralized utility
        const currentUser = getCurrentUser();
        let userId = 'Unknown';
        let userType = USER_TYPES.CUSTOMER;

        if (currentUser) {
          userId = currentUser.id || 'Unknown';
          userType = currentUser.userType || USER_TYPES.CUSTOMER;
        }

        // For demo purposes, we'll use mock data
        if (!isCancelled) {
          setUserData({
            name: quoteData?.formData?.name || `User ${userId}`,
            email: quoteData?.formData?.email || 'user@example.com',
            lastLogin: new Date().toLocaleString(),
            userType: userType
          });

          setStats({
            totalVisits: 156,
            activeProjects: 3,
            notifications: 5
          });
        }

        // If we have quote data, generate some mock quote options based on product type
        if (quoteData && !isCancelled) {
          const productTitle = quoteData.productDetails.title;
          let basePrice = 10000;

          // Adjust base price based on product type
          if (productTitle.includes('Motor')) {
            basePrice = 15000;
          } else if (productTitle.includes('Family')) {
            basePrice = 20000;
          } else if (productTitle.includes('Seniors')) {
            basePrice = 25000;
          }

          setQuoteOptions([
            { id: 1, name: 'Basic Cover', price: basePrice, coverage: 'Essential coverage' },
            { id: 2, name: 'Standard Cover', price: basePrice * 1.5, coverage: 'Comprehensive coverage with added benefits' },
            { id: 3, name: 'Premium Cover', price: basePrice * 2.5, coverage: 'Full coverage with all benefits included' }
          ]);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching user data:', error);
        }
        if (!isCancelled) {
          setError('Failed to load user data. Please refresh the page.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();

    // Cleanup function to handle component unmounting
    return () => {
      setIsMounted(false);
      isCancelled = true;
    };
  }, [quoteData, navigate, isMounted]);

  // Initialize session management
  useEffect(() => {
    initializeSession(navigate, setShowSessionWarning);
  }, [navigate]);

  // Load notifications
  useEffect(() => {
    const loadNotifications = () => {
      const userNotifications = getNotifications();
      setNotifications(userNotifications);
    };

    loadNotifications();
    // Refresh notifications every minute
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      const result = await logout();

      if (result.success) {
        // Show logout confirmation
        alert('You have been logged out successfully');
        // Redirect to login page
        navigate('/login');
      } else {
        alert(result.error || 'Failed to logout. Please try again.');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
      alert('Failed to logout. Please try again.');
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleSelectQuote = (quote) => {
    setSelectedQuote(quote);
  };

  const handlePurchaseQuote = () => {
    alert('Thank you for your purchase! Your insurance policy will be processed shortly.');
    navigate('/');
  };

  const handleBackToProducts = () => {
    navigate('/');
  };

  const handleStartDateChange = (date) => {
    setDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setDateRange(prev => ({ ...prev, endDate: date }));
  };

  // Load profile image for the current user from localStorage
  useEffect(() => {
    if (userData.idNumber) {
      const storedImage = localStorage.getItem(`profileImage_${userData.idNumber}`);
      setProfileImage(storedImage || null);
    }
  }, [userData.idNumber]);

  // Profile image handling
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        if (userData.idNumber) {
          localStorage.setItem(`profileImage_${userData.idNumber}`, reader.result);
        }
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          title: 'Profile Picture Updated',
          message: 'Your profile picture has been successfully updated.'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Dashboard customization
  const toggleDashboardSection = (section) => {
    const newLayout = {
      ...dashboardLayout,
      [section]: !dashboardLayout[section]
    };
    setDashboardLayout(newLayout);
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
  };

  // Profile update handling
  const handleProfileUpdate = async (updatedData) => {
    try {
      // Update user data in localStorage
      const currentData = JSON.parse(localStorage.getItem('registrationData') || '{}');
      const newData = { ...currentData, ...updatedData };
      localStorage.setItem('registrationData', JSON.stringify(newData));
      
      // Update state
      setUserData(prev => ({
        ...prev,
        ...updatedData,
        fullName: `${updatedData.firstName || ''} ${updatedData.lastName || ''}`.trim()
      }));

      // Show success notification
      addNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.'
      });

      setShowProfileModal(false);
    } catch (error) {
      addNotification({
        type: NOTIFICATION_TYPES.ERROR,
        title: 'Update Failed',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const QuickActions = () => (
    <div className="quick-actions" style={{
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    }}>
      <button
        onClick={() => setShowNewPolicyModal(true)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#882323',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        New Policy
      </button>
      <button
        onClick={() => setShowPayPremiumModal(true)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#882323',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Pay Premium
      </button>
      <button
        onClick={() => setShowProfileModal(true)}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#882323',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Update Profile
      </button>
    </div>
  );

  // Session warning modal
  const SessionWarningModal = () => showSessionWarning && (
    <div className="session-warning-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="session-warning-dialog" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h3>Session Expiring</h3>
        <p>Your session will expire in 5 minutes. Would you like to stay logged in?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            onClick={() => {
              setShowSessionWarning(false);
              initializeSession(navigate, setShowSessionWarning);
            }}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#882323',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );

  // Profile modal
  const ProfileModal = () => showProfileModal && (
    <div className="profile-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="profile-modal" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h2>Edit Profile</h2>
        <div className="profile-image-section" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#882323',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                {userData.name.charAt(0)}
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ display: 'none' }}
            id="profile-image-input"
          />
          <label
            htmlFor="profile-image-input"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#882323',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Change Photo
          </label>
        </div>
        {/* Add profile form fields here */}
        <QuickActions />
        <button
          onClick={() => setShowProfileModal(false)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#882323',
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  // Modernize the settings modal with improved styling
  const SettingsModal = () => showSettingsModal && (
    <div className="settings-modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="settings-modal" style={{
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '600px',
        width: '90%',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}>Settings</h2>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            Theme:
          </label>
          <select
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            Notifications:
          </label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            Dashboard Layout:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => toggleDashboardSection('showStats')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#882323',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Toggle Stats
            </button>
            <button
              onClick={() => toggleDashboardSection('showActivity')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#882323',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Toggle Activity
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowSettingsModal(false)}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#333',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  // Enhanced Notification center
  const EnhancedNotificationCenter = () => showNotificationCenter && (
    <div className="enhanced-notification-center" style={{
      position: 'fixed',
      top: '60px',
      right: '20px',
      width: '350px',
      maxHeight: '500px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Notifications</h3>
        <button
          onClick={() => markAllAsRead()}
          style={{
            border: 'none',
            background: 'none',
            color: '#882323',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Mark all as read
        </button>
      </div>
      <div style={{ maxHeight: '400px', overflow: 'auto', padding: '10px' }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
              backgroundColor: notification.read ? '#f9f9f9' : 'white',
              borderRadius: '8px',
              marginBottom: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onClick={() => markAsRead(notification.id)}
          >
            <div style={{ fontWeight: notification.read ? 'normal' : 'bold', fontSize: '1rem' }}>
              {notification.title}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
              {notification.message}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>
              {new Date(notification.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add a modernized dashboard layout with data analytics
  const DataAnalyticsSection = () => (
    <div className="data-analytics-section" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    }}>
      <div className="analytics-card" style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3>Total Visits</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#882323' }}>{stats.totalVisits}</p>
      </div>
      <div className="analytics-card" style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3>Active Projects</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#882323' }}>{stats.activeProjects}</p>
      </div>
      <div className="analytics-card" style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <h3>Notifications</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#882323' }}>{stats.notifications}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="reload-button"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className={`dashboard-page ${theme}-mode`}>
      {/* Flex container for sidebar and main content */}
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="sidebar" style={{ 
          minHeight: '100vh', 
          height: '100vh', 
          width: '260px',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          background: 'linear-gradient(180deg, #882323 60%, #a94442 100%)',
          padding: '1.5rem 0.5rem 1rem 0.5rem',
          boxSizing: 'border-box',
          position: 'relative',
        }}>
          <hr style={{ border: 'none', borderTop: '2px solid #eee', margin: '0 1.5rem 1rem 1.5rem' }} />
          <ul className="nav-menu" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/analytics" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>📊</span> <span>Analytics</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/profile" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>👤</span> <span>My Profile</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/settings" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>⚙️</span> <span>Profile Settings</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/policies" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>📋</span> <span>My Policies</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/claims" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>⚠️</span> <span>Claims</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/payments" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>💳</span> <span>Payments</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/support" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>🛟</span> <span>Support</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/FAQs" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>❓</span> <span>FAQs</span>
              </a>
            </li>
            <li className="nav-item" style={{ marginBottom: '1rem' }}>
              <a href="/settings" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '1.08rem', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'background 0.2s' }}>
                <span style={{ fontSize: '1.2rem' }}>⚙️</span> <span>Settings</span>
              </a>
            </li>
          </ul>
          <div className="logout-container" style={{ marginTop: 'auto', padding: '1rem 0 0 0', textAlign: 'center' }}>
            <button className="logout-btn" onClick={handleLogoutClick} style={{ background: 'white', color: '#882323', border: 'none', borderRadius: '6px', padding: '0.6rem 1.2rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
              <span style={{ fontSize: '1.2rem' }}>🚪</span> <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content - merged and modernized */}
        <div className="main-content">
          <div className="header">
            <div className="welcome-text">
              <h1>Welcome back, {userData.name.split(' ')[0]}</h1>
              <p>Last login: {userData.lastLogin}</p>
            </div>
            <div className="user-actions">
              <div className="notification-bell">
                <i>🔔</i>
                <span className="notification-badge">{stats.notifications}</span>
              </div>
              <div className="user-dropdown">
                <div className="avatar">
                  <img
                    src={profileImage || require('../assets/dashboard-placeholder.jpg')}
                    alt={`${userData.name} profile`}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-grid">
            <div className="card stat-card">
              <div className="stat-icon visits">
                <i>👁️</i>
              </div>
              <div className="stat-info">
                <h3>{stats.totalVisits}</h3>
                <p>Total Visits</p>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon projects">
                <i>📄</i>
              </div>
              <div className="stat-info">
                <h3>{stats.activeProjects}</h3>
                <p>Active Policies</p>
              </div>
            </div>

            <div className="card stat-card">
              <div className="stat-icon notifications">
                <i>🔔</i>
              </div>
              <div className="stat-info">
                <h3>{stats.notifications}</h3>
                <p>Notifications</p>
              </div>
            </div>
          </div>

          {/* Policy Analytics */}
          <div className="card">
            <div className="section-header">
              <h2 className="section-title">Policy Analytics</h2>
            </div>
            <div className="chart-container">
              <div className="chart-grid">
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
              </div>
              <div className="bar-chart">
                <div className="bar" style={{ height: '70%' }}>
                  <div className="bar-label">Jan</div>
                </div>
                <div className="bar" style={{ height: '45%' }}>
                  <div className="bar-label">Feb</div>
                </div>
                <div className="bar" style={{ height: '85%' }}>
                  <div className="bar-label">Mar</div>
                </div>
                <div className="bar" style={{ height: '60%' }}>
                  <div className="bar-label">Apr</div>
                </div>
                <div className="bar" style={{ height: '90%' }}>
                  <div className="bar-label">May</div>
                </div>
                <div className="bar" style={{ height: '40%' }}>
                  <div className="bar-label">Jun</div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
            {/* Recent Activity */}
            <div className="card">
              <div className="section-header">
                <h2 className="section-title">Recent Activity</h2>
                <a href="#" className="view-all">View All</a>
              </div>
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-icon icon-policy">
                    <i>📋</i>
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">Motor insurance policy updated</h3>
                    <p className="activity-time">2 hours ago</p>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-icon icon-payment">
                    <i>💰</i>
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">Premium payment confirmed</h3>
                    <p className="activity-time">5 hours ago</p>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-icon icon-service">
                    <i>💬</i>
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">Customer service chat completed</h3>
                    <p className="activity-time">1 day ago</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Actions & Help */}
            <div>
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h2 className="section-title">Quick Actions</h2>
                <div className="action-buttons" style={{ marginTop: '1rem' }}>
                  <button className="action-btn primary" onClick={() => setShowNewPolicyModal(true)}>
                    <i>➕</i> New Policy
                  </button>
                  <button className="action-btn" onClick={() => setShowPayPremiumModal(true)}>
                    <i>💳</i> Pay Premium
                  </button>
                  <button className="action-btn" onClick={() => setShowProfileModal(true)}>
                    <i>📋</i> Update Profile
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="section-header">
                  <h2 className="section-title">Need Help?</h2>
                  <a href="#" className="view-all">View All FAQs</a>
                </div>
                {/* <MiniFAQ title="Need Help?" category="general" maxItems={2} showViewAll={true} /> */}
              </div>
            </div>

            {/* Date Selection */}
            <div className="card">
              <h2 className="section-title">Date Selection</h2>
              <div className="date-filter">
                <div>
                  <p style={{ margin: '1rem 0 0.5rem' }}>Filter by Date Range</p>
                  <div className="date-range">
                    <DateRangeCalendar
                      startDate={dateRange.startDate}
                      endDate={dateRange.endDate}
                      onChangeStart={handleStartDateChange}
                      onChangeEnd={handleEndDateChange}
                      startLabel="From"
                      endLabel="To"
                      showSelectedRange={true}
                    />
                  </div>
                </div>

                <div className="month-selector">
                  <p style={{ marginBottom: '0.5rem' }}>View Reports For</p>
                  <MonthPicker
                    selectedDate={selectedMonth}
                    onChange={setSelectedMonth}
                    label="View Reports For"
                    showSelectedValue={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the logout confirmation popup */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="logout-confirm-dialog" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ marginTop: 0 }}>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={handleLogoutCancel}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#882323',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modals */}
      <SessionWarningModal />
      <ProfileModal />
      <SettingsModal />
      <EnhancedNotificationCenter />
      <NewPolicyModal />
      <PayPremiumModal />
    </div>
  );
}

export default Dashboard;