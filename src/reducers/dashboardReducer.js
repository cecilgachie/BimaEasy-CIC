export function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    
    case 'SET_NOTIFICATIONS':
      return { 
        ...state, 
        notifications: action.payload,
        stats: { ...state.stats, notifications: action.payload.length }
      };
    
    case 'SET_PROFILE_IMAGE':
      return { ...state, profileImage: action.payload };
    
    case 'TOGGLE_NOTIFICATION_CENTER':
      return { ...state, showNotificationCenter: !state.showNotificationCenter };
    
    case 'TOGGLE_PROFILE_MODAL':
      return { ...state, showProfileModal: !state.showProfileModal };
    
    case 'TOGGLE_SETTINGS_MODAL':
      return { ...state, showSettingsModal: !state.showSettingsModal };
    
    case 'TOGGLE_LOGOUT_CONFIRM':
      return { ...state, showLogoutConfirm: !state.showLogoutConfirm };
    
    case 'SET_SESSION_WARNING':
      return { ...state, showSessionWarning: action.payload };
    
    case 'UPDATE_DASHBOARD_LAYOUT':
      const newLayout = { ...state.dashboardLayout, ...action.payload };
      localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
      return { ...state, dashboardLayout: newLayout };
    
    default:
      return state;
  }
}