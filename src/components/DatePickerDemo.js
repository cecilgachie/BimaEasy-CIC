import { useState } from 'react';
import DatePicker, { DateRangeCalendar, MonthPicker } from './shared/date picker';

const DatePickerDemo = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleDateChange = (date) => {
    console.log('Demo component received date change:', date);
    setSelectedDate(date);
  };

  const handleStartDateChange = (date) => {
    console.log('Demo component received start date change:', date);
    setDateRange(prev => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    console.log('Demo component received end date change:', date);
    setDateRange(prev => ({ ...prev, endDate: date }));
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    console.log('Selected month:', month);
  };

  return (
    <div className="date-picker-demo" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Get Your Quote Now</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Single Date Picker</h2>
        <DatePicker
          label="Date of Birth"
          selectedDate={selectedDate}
          onChange={handleDateChange}
          placeholder="Select date"
          required
        />
        {selectedDate && (
          <p>You selected: {new Date(selectedDate).toLocaleDateString()}</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Date Range Picker</h2>
        <DateRangeCalendar
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          startLabel="From"
          endLabel="To"
        />
        {(dateRange.startDate || dateRange.endDate) && (
          <p>
            Selected range:
            {dateRange.startDate ? ` From ${new Date(dateRange.startDate).toLocaleDateString()}` : ''}
            {dateRange.endDate ? ` To ${new Date(dateRange.endDate).toLocaleDateString()}` : ''}
          </p>
        )}
      </div>

      <div>
        <h2>Month Picker</h2>
        <MonthPicker
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          label="Select Month"
        />
        {selectedMonth && (
          <p>Selected month: {selectedMonth}</p>
        )}
      </div>
    </div>
  );
};

export default DatePickerDemo;
