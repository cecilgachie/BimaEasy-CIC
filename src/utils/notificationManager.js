// src/utils/notificationManager.js
// Basic notification management utility for Dashboard.js

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

let notifications = [
  {
    id: 1,
    title: 'Welcome!',
    message: 'Thank you for using EasyBima.',
    type: NOTIFICATION_TYPES.SUCCESS,
    read: false,
    timestamp: Date.now() - 1000000,
  },
  {
    id: 2,
    title: 'Profile Updated',
    message: 'Your profile was updated successfully.',
    type: NOTIFICATION_TYPES.INFO,
    read: false,
    timestamp: Date.now() - 500000,
  },
];

export function getNotifications() {
  return notifications;
}

export function markAsRead(id) {
  notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
}

export function markAllAsRead() {
  notifications = notifications.map(n => ({ ...n, read: true }));
}

export function addNotification(notification) {
  notifications = [
    {
      id: Date.now(),
      read: false,
      timestamp: Date.now(),
      ...notification,
    },
    ...notifications,
  ];
}

export { NOTIFICATION_TYPES };
