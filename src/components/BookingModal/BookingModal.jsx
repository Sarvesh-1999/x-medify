import React, { useState } from 'react';
import styles from './BookingModal.module.css';

const BookingModal = ({ center, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          day: 'numeric', 
          month: 'short' 
        }),
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }
    return dates;
  };

  const timeSlots = {
    morning: ['11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
    evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
  };

  const dates = generateDates();

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Book Appointment</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.centerInfo}>
          <div className={styles.centerIcon}>🏥</div>
          <div>
            <h3>{center["Hospital Name"]}</h3>
            <p>{center.Address}, {center.City}</p>
          </div>
        </div>

        <div className={styles.dateSelection}>
          <h4>Select Date</h4>
          <div className={styles.dateButtons}>
            {dates.map((dateObj) => (
              <button
                key={dateObj.date}
                className={`${styles.dateBtn} ${selectedDate === dateObj.date ? styles.selected : ''}`}
                onClick={() => handleDateSelect(dateObj.date)}
                data-testid={`date-${dateObj.date}`}
              >
                <div className={styles.dateLabel}>{dateObj.label}</div>
                <div className={styles.slotsAvailable}>11 Slots Available</div>
              </button>
            ))}
          </div>
        
          <p
            style={{cursor: 'pointer', fontWeight: selectedDate ? 'bold' : 'normal'}}
            onClick={() => selectedDate && setSelectedDate(selectedDate)}
          >Today</p>
        </div>

        {selectedDate && (
          <div className="time-slots">
            <p style={{cursor: 'pointer'}}>Morning</p>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("09:00 AM")}
            >
              09:00 AM
            </button>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("10:30 AM")}
            >
              10:30 AM
            </button>

            <p style={{cursor: 'pointer'}}>Afternoon</p>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("01:00 PM")}
            >
              01:00 PM
            </button>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("02:30 PM")}
            >
              02:30 PM
            </button>

            <p style={{cursor: 'pointer'}}>Evening</p>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("06:00 PM")}
            >
              06:00 PM
            </button>
            <button
               className={`${styles.timeBtn} ${selectedTime === "09:00 AM" ? styles.selected : ""}`}
              onClick={() => handleTimeSelect("07:30 PM")}
            >
              07:30 PM
            </button>
          </div>
        )}

        <div className={styles.modalFooter}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            data-testid="confirm-booking-btn"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
