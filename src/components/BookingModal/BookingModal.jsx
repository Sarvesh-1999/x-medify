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
          <div className={styles.dateButtons}>
            {dates.map((dateObj) => (
              <button
                key={dateObj.date}
                className={`${styles.dateBtn} ${selectedDate === dateObj.date ? styles.selected : ''}`}
                onClick={() => setSelectedDate(dateObj.date)}
              >
                <div className={styles.dateLabel}>{dateObj.label}</div>
                <div className={styles.slotsAvailable}>11 Slots Available</div>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className={styles.timeSelection}>
            <div className={styles.timeSection}>
              <p className={styles.timeLabel}>Morning</p>
              <div className={styles.timeSlots}>
                {timeSlots.morning.map((time) => (
                  <button
                    key={time}
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.timeSection}>
              <p className={styles.timeLabel}>Afternoon</p>
              <div className={styles.timeSlots}>
                {timeSlots.afternoon.map((time) => (
                  <button
                    key={time}
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.timeSection}>
              <p className={styles.timeLabel}>Evening</p>
              <div className={styles.timeSlots}>
                {timeSlots.evening.map((time) => (
                  <button
                    key={time}
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
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
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
