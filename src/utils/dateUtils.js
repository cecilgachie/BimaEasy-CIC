/**
 * Date Utility Functions
 * 
 * This file contains utility functions for handling dates with time zone support
 * using date-fns and its time zone extensions.
 */

import { format, parse, isValid, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { TZDate, tz } from '@date-fns/tz';
import { UTCDate } from '@date-fns/utc';

// Default time zone - can be overridden by app settings
const DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Creates a date with the specified time zone
 * 
 * @param {Date|number|string} date - Date to convert
 * @param {string} [timeZone=DEFAULT_TIMEZONE] - Time zone to use
 * @returns {TZDate} Date in the specified time zone
 */
export const createTZDate = (date, timeZone = DEFAULT_TIMEZONE) => {
  if (!date) return null;
  
  try {
    if (typeof date === 'string') {
      // Parse the string to a date first
      const parsedDate = new Date(date);
      if (!isValid(parsedDate)) return null;
      return new TZDate(parsedDate, timeZone);
    }
    
    return new TZDate(date, timeZone);
  } catch (error) {
    console.error('Error creating TZDate:', error);
    return null;
  }
};

/**
 * Creates a UTC date
 * 
 * @param {Date|number|string} date - Date to convert
 * @returns {UTCDate} Date in UTC
 */
export const createUTCDate = (date) => {
  if (!date) return null;
  
  try {
    if (typeof date === 'string') {
      // Parse the string to a date first
      const parsedDate = new Date(date);
      if (!isValid(parsedDate)) return null;
      return new UTCDate(parsedDate);
    }
    
    return new UTCDate(date);
  } catch (error) {
    console.error('Error creating UTCDate:', error);
    return null;
  }
};

/**
 * Formats a date with time zone support
 * 
 * @param {Date|TZDate|UTCDate} date - Date to format
 * @param {string} formatStr - Format string (date-fns format)
 * @param {Object} options - Format options
 * @param {string} [options.timeZone] - Time zone to use for formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'MMMM d, yyyy', options = {}) => {
  if (!date) return '';
  
  try {
    const { timeZone } = options;
    
    if (timeZone) {
      // Format in specific time zone
      return format(date, formatStr, { 
        in: tz(timeZone),
        ...options 
      });
    }
    
    // Use the date's own time zone if it's a TZDate
    if (date instanceof TZDate) {
      return format(date, formatStr, options);
    }
    
    // Regular formatting
    return format(date, formatStr, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Formats a date with time
 * 
 * @param {Date|TZDate|UTCDate} date - Date to format
 * @param {string} [timeZone] - Time zone to use
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date, timeZone) => {
  return formatDate(date, 'MMMM d, yyyy h:mm aa', { timeZone });
};

/**
 * Formats a date range
 * 
 * @param {Date|TZDate|UTCDate} startDate - Start date
 * @param {Date|TZDate|UTCDate} endDate - End date
 * @param {string} [timeZone] - Time zone to use
 * @returns {string} Formatted date range with duration
 */
export const formatDateRange = (startDate, endDate, timeZone) => {
  if (!startDate || !endDate) return '';
  
  try {
    const formattedStart = formatDate(startDate, 'MMM d, yyyy', { timeZone });
    const formattedEnd = formatDate(endDate, 'MMM d, yyyy', { timeZone });
    const duration = calculateDuration(startDate, endDate);
    
    return `${formattedStart} to ${formattedEnd} (${duration})`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Invalid date range';
  }
};

/**
 * Calculates human-readable duration between two dates
 * 
 * @param {Date|TZDate|UTCDate} startDate - Start date
 * @param {Date|TZDate|UTCDate} endDate - End date
 * @returns {string} Human-readable duration
 */
export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  try {
    // Calculate differences
    const days = differenceInDays(endDate, startDate);
    const months = differenceInMonths(endDate, startDate);
    const years = differenceInYears(endDate, startDate);
    
    if (years > 0) {
      const remainingMonths = months % 12;
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    } else if (months > 0) {
      const remainingDays = days % 30;
      return `${months} month${months !== 1 ? 's' : ''}${remainingDays > 0 ? `, ${remainingDays} day${remainingDays !== 1 ? 's' : ''}` : ''}`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '';
  }
};

/**
 * Gets a list of common time zones
 * 
 * @returns {Array<{value: string, label: string}>} List of time zones
 */
export const getCommonTimeZones = () => {
  return [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
    { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
    { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Asia/Shanghai', label: 'Shanghai' },
    { value: 'Australia/Sydney', label: 'Sydney' },
    { value: 'Africa/Nairobi', label: 'Nairobi' }
  ];
};

/**
 * Gets the user's local time zone
 * 
 * @returns {string} Local time zone
 */
export const getLocalTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export default {
  createTZDate,
  createUTCDate,
  formatDate,
  formatDateTime,
  formatDateRange,
  calculateDuration,
  getCommonTimeZones,
  getLocalTimeZone,
  DEFAULT_TIMEZONE
};
