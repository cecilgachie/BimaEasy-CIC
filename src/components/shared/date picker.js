import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import './datepicker.css';

/**
 * Modal DatePicker component
 *
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Function to call when date changes
 * @param {string|Date} props.selectedDate - Initial selected date
 * @param {string} props.label - Label for the date picker
 * @param {string} props.minDate - Minimum selectable date (YYYY-MM-DD)
 * @param {string} props.maxDate - Maximum selectable date (YYYY-MM-DD)
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Whether the field is required
 * @param {string} props.name - Name of the input field
 * @returns {JSX.Element} DatePicker component
 */
const DatePicker = (props) => {
  const {
    onChange,
    onDateSelect,
    selectedDate,
    label,
    minDate,
    maxDate,
    placeholder,
    required,
    name,
    className = '',
    form,
    setForm
  } = props;

  // Get theme from context
  const { theme } = useContext(ThemeContext);

  const [date, setDate] = useState(selectedDate || '');
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [tempDate, setTempDate] = useState('');
  const modalRef = useRef(null);

  // Update local state when selectedDate prop changes or form data changes
  useEffect(() => {
    console.log('selectedDate prop changed:', selectedDate);
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      if (!isNaN(dateObj.getTime())) {
        // Ensure consistent date format
        const formattedDate = dateObj.toISOString().split('T')[0];
        console.log('Setting date state to formatted date:', formattedDate);
        setDate(formattedDate);
        setCurrentMonth(dateObj.getMonth());
        setCurrentYear(dateObj.getFullYear());
        setSelectedDay(dateObj.getDate());
      } else {
        console.error('Invalid selectedDate prop:', selectedDate);
      }
    } else {
      // Clear the date if selectedDate is falsy
      setDate('');
    }
  }, [selectedDate]);

  // Check for date in form data
  useEffect(() => {
    if (form && name && form[name]) {
      console.log('Form data changed for field:', name, 'value:', form[name]);
      try {
        const dateObj = new Date(form[name]);
        if (!isNaN(dateObj.getTime())) {
          const formattedDate = dateObj.toISOString().split('T')[0];
          console.log('Setting date from form data:', formattedDate);
          setDate(formattedDate);
          setCurrentMonth(dateObj.getMonth());
          setCurrentYear(dateObj.getFullYear());
          setSelectedDay(dateObj.getDate());
        }
      } catch (error) {
        console.error('Error processing date from form:', error);
      }
    }
  }, [form, name]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log('Click outside detected, closing modal');
        // Force close the modal with a slight delay
        setTimeout(() => {
          setShowModal(false);
        }, 50);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  const handleDateChange = (newDate) => {
    console.log('handleDateChange called with:', newDate);
    setDate(newDate);

    // Handle different callback patterns
    if (onChange) {
      console.log('Calling onChange with:', newDate);
      onChange(newDate);
    } else {
      console.log('No onChange handler provided');
    }

    // Support onDateSelect callback pattern
    if (onDateSelect) {
      console.log('Calling onDateSelect with:', newDate);
      onDateSelect(newDate);
    }

    // Support form pattern used in quoteformsummary.js
    if (form && setForm && name) {
      console.log('Updating form with new date:', newDate, 'for field:', name);
      setForm(prevForm => {
        const updatedForm = {
          ...prevForm,
          [name]: newDate
        };
        console.log('Updated form:', updatedForm);
        return updatedForm;
      });
    } else if (name) {
      console.log('Form or setForm is missing for field:', name);
    }
  };

  const openModal = () => {
    console.log('Opening modal, current date:', date);
    if (date) {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        setCurrentMonth(dateObj.getMonth());
        setCurrentYear(dateObj.getFullYear());
        setSelectedDay(dateObj.getDate());

        // Ensure we're using a consistent date format (YYYY-MM-DD)
        const formattedDate = dateObj.toISOString().split('T')[0];
        setTempDate(formattedDate);
        console.log('Setting tempDate to existing date (formatted):', formattedDate);
      } else {
        console.error('Invalid date provided:', date);
        // Initialize with today's date as fallback
        const today = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setSelectedDay(null);
        setTempDate('');
      }
    } else {
      const today = new Date();
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
      setSelectedDay(null);
      setTempDate('');
      console.log('No existing date, tempDate cleared');
    }
    setShowModal(true);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    // Create a date object at noon to avoid timezone issues
    const newDate = new Date(Date.UTC(currentYear, currentMonth, day, 12, 0, 0));
    const formattedDate = newDate.toISOString().split('T')[0];
    console.log('Day clicked, setting tempDate to:', formattedDate);
    setTempDate(formattedDate);

    // Auto-select the date for quote summary form
    if (form && setForm && name) {
      console.log('Auto-selecting date for form field:', name);
      // Update internal state
      setDate(formattedDate);

      // Update the form directly
      setForm(prevForm => ({
        ...prevForm,
        [name]: formattedDate
      }));

      // Close the modal automatically if we're in a form context
      // setShowModal(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancel clicked, closing modal');
    // Force close the modal with a slight delay
    setTimeout(() => {
      setShowModal(false);
    }, 50);
  };

  const handleOk = () => {
    console.log('OK clicked, tempDate:', tempDate);
    if (tempDate) {
      try {
        // Ensure we're working with a valid date string in YYYY-MM-DD format
        const dateObj = new Date(tempDate);
        if (!isNaN(dateObj.getTime())) {
          const formattedDate = dateObj.toISOString().split('T')[0];
          console.log('Calling handleDateChange with formatted date:', formattedDate);

          // Update the internal state first
          setDate(formattedDate);

          // Then call the handler to update parent components
          handleDateChange(formattedDate);

          // Direct form update for quote summary (as a backup)
          if (form && setForm && name) {
            console.log('Direct form update with:', formattedDate);
            setForm(prevForm => ({
              ...prevForm,
              [name]: formattedDate
            }));
          }
        } else {
          console.error('Invalid date:', tempDate);
        }
      } catch (error) {
        console.error('Error processing date:', error);
      }
    } else {
      console.log('No date selected, not calling handleDateChange');
    }

    // Force close the modal with a slight delay to ensure state updates have completed
    setTimeout(() => {
      console.log('Closing modal after OK click');
      setShowModal(false);
    }, 50);
  };

  const renderCalendar = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Get the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the number of days in the previous month
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Create an array of days to display
    const days = [];

    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        disabled: true
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const formattedDate = date.toISOString().split('T')[0];
      const minDateObj = minDate ? new Date(minDate) : null;
      const maxDateObj = maxDate ? new Date(maxDate) : null;

      const isDisabled =
        (minDateObj && date < minDateObj) ||
        (maxDateObj && date > maxDateObj);

      days.push({
        day: i,
        currentMonth: true,
        disabled: isDisabled,
        selected: i === selectedDay && tempDate === formattedDate,
        today: new Date().toDateString() === date.toDateString()
      });
    }

    // Add days from next month
    const totalDays = Math.ceil(days.length / 7) * 7;
    for (let i = 1; i <= totalDays - days.length; i++) {
      days.push({
        day: i,
        currentMonth: false,
        disabled: true
      });
    }

    return (
      <div className="date-picker-modal" ref={modalRef}>
        <div className="date-picker-selected-date">
          {tempDate ? new Date(tempDate).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : 'Select a date'}
          <button
            className="date-picker-close-button"
            onClick={() => {
              console.log('Close button clicked');
              setTimeout(() => setShowModal(false), 50);
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
        <div className="date-picker-header">
          <div className="date-picker-month-selector">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            >
              {monthNames.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="date-picker-nav-buttons">
            <button className="date-picker-nav-button" onClick={handlePrevMonth}>
              &lt;
            </button>
            <button className="date-picker-nav-button" onClick={handleNextMonth}>
              &gt;
            </button>
          </div>
        </div>
        <div className="date-picker-calendar">
          <div className="date-picker-weekdays">
            {weekdays.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="date-picker-days">
            {days.map((day, index) => (
              <div
                key={index}
                className={`date-picker-day ${day.currentMonth ? '' : 'other-month'} ${day.selected ? 'selected' : ''} ${day.today ? 'today' : ''} ${day.disabled ? 'disabled' : ''}`}
                onClick={() => !day.disabled && handleDayClick(day.day)}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
        <div className="date-picker-footer">
          <button className="date-picker-button cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="date-picker-button ok" onClick={handleOk}>
            OK
          </button>
        </div>
      </div>
    );
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    console.log('Formatting date for display:', dateString);
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Invalid date for display:', dateString);
        return '';
      }

      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      console.log('Formatted date for display:', formatted);
      return formatted;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Get the display value from form if available
  const getDisplayValue = () => {
    // First check if we have a date in our local state
    if (date) {
      return formatDisplayDate(date);
    }

    // Then check if we have a date in the form
    if (form && name && form[name]) {
      return formatDisplayDate(form[name]);
    }

    // Otherwise return empty string
    return '';
  };

  return (
    <div className={`date-picker ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type="text"
        id={name}
        name={name}
        value={getDisplayValue()}
        onClick={openModal}
        readOnly
        placeholder={placeholder || 'Select date'}
        required={required}
        className="date-input"
      />
      {showModal && (
        <div
          className="date-picker-modal-overlay"
          onClick={(e) => {
            // Close modal when clicking on the overlay (outside the calendar)
            if (e.target.className === 'date-picker-modal-overlay') {
              console.log('Overlay clicked, closing modal');
              setTimeout(() => setShowModal(false), 50);
            }
          }}
        >
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};

/**
 * DateRangeCalendar component for selecting a date range
 *
 * @param {Object} props - Component props
 * @param {Function} props.onStartDateChange - Function to call when start date changes
 * @param {Function} props.onEndDateChange - Function to call when end date changes
 * @param {string|Date} props.startDate - Initial start date
 * @param {string|Date} props.endDate - Initial end date
 * @param {string} props.startLabel - Label for start date
 * @param {string} props.endLabel - Label for end date
 * @returns {JSX.Element} DateRangeCalendar component
 */
export const DateRangeCalendar = ({
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate,
  startLabel = 'Start Date',
  endLabel = 'End Date',
  onChangeStart,
  onChangeEnd
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(startDate || '');
  const [selectedEndDate, setSelectedEndDate] = useState(endDate || '');

  // Update local state when props change
  useEffect(() => {
    if (startDate) setSelectedStartDate(startDate);
    if (endDate) setSelectedEndDate(endDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);

    // Support both callback patterns
    if (onStartDateChange) onStartDateChange(date);
    if (onChangeStart) onChangeStart(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);

    // Support both callback patterns
    if (onEndDateChange) onEndDateChange(date);
    if (onChangeEnd) onChangeEnd(date);
  };

  return (
    <div className="date-range-calendar">
      <div className="date-input-group">
        <DatePicker
          label={startLabel}
          selectedDate={selectedStartDate}
          onChange={handleStartDateChange}
          minDate={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="date-input-group">
        <DatePicker
          label={endLabel}
          selectedDate={selectedEndDate}
          onChange={handleEndDateChange}
          minDate={selectedStartDate || new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

/**
 * MonthPicker component for selecting a month
 *
 * @param {Object} props - Component props
 * @param {Function} props.onMonthChange - Function to call when month changes
 * @param {string|number} props.selectedMonth - Initial selected month (1-12)
 * @param {string} props.label - Label for the month picker
 * @returns {JSX.Element} MonthPicker component
 */
export const MonthPicker = ({
  onMonthChange,
  selectedMonth,
  label = 'Select Month',
  onChange,
  selectedDate
}) => {
  const [month, setMonth] = useState(selectedMonth || selectedDate || '');

  // Update local state when props change
  useEffect(() => {
    if (selectedMonth) setMonth(selectedMonth);
    if (selectedDate) setMonth(selectedDate);
  }, [selectedMonth, selectedDate]);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);

    // Support both callback patterns
    if (onMonthChange) onMonthChange(selectedMonth);
    if (onChange) onChange(selectedMonth);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="month-picker">
      <label>{label}</label>
      <select value={month} onChange={handleMonthChange} className="month-select">
        <option value="">Select a month</option>
        {months.map((monthName, index) => (
          <option key={index} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
};

// Export the DatePicker as default and named exports
export { DatePicker as default };
