import React, { useState, useEffect, useCallback, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../ThemeContext';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { initializeSession } from '../utils/sessionManager';
import { getNotifications, markAsRead, markAllAsRead, NOTIFICATION_TYPES, addNotification } from '../utils/notificationManager';
import { dashboardReducer } from '../reducers/dashboardReducer';

// Import components
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import StatsCards from './dashboard/StatsCards';
import ActivityFeed from './dashboard/ActivityFeed';
import QuickActions from './dashboard/QuickActions';
import DataAnalytics from './dashboard/DataAnalytics';
import Modal from './shared/Modal';
import NotificationCenter from './shared/NotificationCenter';
import ProductSelectionModal from './productselectionmodule';
// import { DateRangeCalendar } from './shared/DatePicker';

// Import styles
import '../styles/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showProductModal, setShowProductModal] = useState(false);
  
  // State management with useReducer
  const [state, dispatch] = useReducer(dashboardReducer, {
    userData: {
      name: 'User',
      email: '',
      lastLogin: new Date().toLocaleString(),
      userType: 'customer',
      fullName: '',
      mobileNo: '',
      nationality: '',
      idNumber: ''
    },
    stats: {
      totalVisits: 0,
      activeProjects: 0,
      notifications: 0
    },
    notifications: [],
    profileImage: null,
    showNotificationCenter: false,
    showProfileModal: false,
    showSettingsModal: false,
    showLogoutConfirm: false,
    showSessionWarning: false,
    dashboardLayout: JSON.parse(localStorage.getItem('dashboardLayout')) || {
      showStats: true,
      showActivity: true,
      showQuickActions: true,
      showFAQ: true,
      showCalendar: true
    }
  });

  // Check authentication
  useEffect(() => {
    // Enforce authentication: redirect to login if not authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Initialize user data
    const user = getCurrentUser();
    dispatch({ type: 'SET_USER_DATA', payload: {
      name: user.firstName || 'User',
      email: user.email || '',
      lastLogin: user.lastLogin || new Date().toLocaleString(),
      userType: user.userType || 'customer',
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      mobileNo: user.mobileNo || '',
      nationality: user.nationality || '',
      idNumber: user.id || ''
    }});
    
    // Load profile image
    const savedImage = user.id ? localStorage.getItem(`profileImage_${user.id}`) : null;
    if (savedImage) {
      dispatch({ type: 'SET_PROFILE_IMAGE', payload: savedImage });
    }
    
    // Load notifications
    const userNotifications = getNotifications();
    dispatch({ type: 'SET_NOTIFICATIONS', payload: userNotifications });
    
    // Initialize session timeout
    const cleanupSession = initializeSession(navigate, 
      () => dispatch({ type: 'SET_SESSION_WARNING', payload: true }));
    
    return cleanupSession;
  }, [navigate]);

  // Main render
  return (
    <div className={`dashboard-page ${theme}-mode`}>
      <div className="dashboard-container">
        <Sidebar 
          userData={state.userData} 
          theme={theme} 
        />
        
        <div className="main-content">
          <Header 
            userData={state.userData}
            profileImage={state.profileImage}
            notifications={state.notifications}
            toggleNotificationCenter={() => dispatch({ type: 'TOGGLE_NOTIFICATION_CENTER' })}
            toggleProfileModal={() => dispatch({ type: 'TOGGLE_PROFILE_MODAL' })}
          />
          
          <div className="dashboard-content">
            {state.dashboardLayout.showStats && (
              <StatsCards stats={state.stats} />
            )}
            
            <div className="dashboard-grid">
              {state.dashboardLayout.showActivity && (
                <ActivityFeed activities={state.activities} />
              )}
              
              {state.dashboardLayout.showQuickActions && (
                <QuickActions 
                  onNewPolicy={() => setShowProductModal(true)}
                  onPayPremium={() => dispatch({ type: 'TOGGLE_PAY_PREMIUM_MODAL' })}
                  onUpdateProfile={() => dispatch({ type: 'TOGGLE_PROFILE_MODAL' })}
                />
              )}
              
              {/* {state.dashboardLayout.showCalendar && (
                <DateRangeCalendar 
                  onDateChange={(dates) => dispatch({ type: 'SET_DATE_RANGE', payload: dates })}
                />
              )} */}
            </div>
            
            <DataAnalytics stats={state.stats} />
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <NotificationCenter 
        show={state.showNotificationCenter}
        notifications={state.notifications}
        onClose={() => dispatch({ type: 'TOGGLE_NOTIFICATION_CENTER' })}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
      
      {showProductModal && (
        <ProductSelectionModal
          open={true}
          onClose={() => setShowProductModal(false)}
          onSelect={() => setShowProductModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
