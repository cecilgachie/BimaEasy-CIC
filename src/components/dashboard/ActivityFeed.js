import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

function ActivityFeed({ activities = [] }) {
  // If no activities are provided, use sample data
  const sampleActivities = [
    { id: 1, type: 'policy', title: 'Motor Insurance Renewed', date: new Date(2023, 5, 15), status: 'success' },
    { id: 2, type: 'claim', title: 'Claim #CL-78945 Submitted', date: new Date(2023, 5, 10), status: 'pending' },
    { id: 3, type: 'payment', title: 'Premium Payment Received', date: new Date(2023, 5, 5), status: 'success' },
    { id: 4, type: 'document', title: 'Policy Document Updated', date: new Date(2023, 4, 28), status: 'info' },
  ];
  
  const displayActivities = activities.length > 0 ? activities : sampleActivities;
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'policy': return '📋';
      case 'claim': return '🛡️';
      case 'payment': return '💰';
      case 'document': return '📄';
      default: return '📌';
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'success': return 'status-success';
      case 'pending': return 'status-pending';
      case 'error': return 'status-error';
      case 'info': return 'status-info';
      default: return '';
    }
  };
  
  return (
    <div className="card activity-feed slide-in">
      <h2>Recent Activity</h2>
      <div className="activities-list">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">{getActivityIcon(activity.type)}</div>
            <div className="activity-details">
              <h3>{activity.title}</h3>
              <div className="activity-meta">
                <span className="activity-date" title={format(activity.date, 'PPP')}>
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </span>
                <span className={`activity-status ${getStatusClass(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All Activity</button>
    </div>
  );
}

export default ActivityFeed;