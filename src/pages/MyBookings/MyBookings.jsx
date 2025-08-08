import React, { useState, useEffect } from 'react';
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer';
import styles from './MyBookings.module.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.myBookings}>
      <div className="container">
        <div className={styles.header}>
          <h1>My Bookings</h1>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search by hospital" 
              className={styles.searchInput}
            />
            <button className="btn-primary">🔍 Search</button>
          </div>
        </div>

        <div className={styles.bookingsContent}>
          <div className={styles.bookingsList}>
            {bookings.length === 0 ? (
              <div className={styles.noBookings}>
                <p>No bookings found. Book your first appointment!</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className={styles.bookingCard}>
                  <div className={styles.centerIcon}>
                    <span>🏥</span>
                  </div>
                  <div className={styles.bookingInfo}>
                    <h3>{booking.center["Hospital Name"]}</h3>
                    <p className={styles.location}>
                      {booking.center.Address}, {booking.center.City}, {booking.center.State}
                    </p>
                    <p className={styles.specialty}>
                      {booking.center["Hospital Type"]} • {booking.center["Hospital Ownership"]}
                    </p>
                  </div>
                  <div className={styles.bookingDetails}>
                    <div className={styles.dateTime}>
                      <span className={styles.time}>{booking.time}</span>
                      <span className={styles.date}>{formatDate(booking.date)}</span>
                    </div>
                    <div className={styles.rating}>
                      <span className={styles.ratingBadge}>👍</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.adCard}>
              <div className={styles.adContent}>
                <h3>This World Oral Health Day,</h3>
                <h4>Get a <span className={styles.freeText}>FREE</span> Appointment*</h4>
                <h4>with Top Dentists.</h4>
                <div className={styles.limitedOffer}>LIMITED PERIOD OFFER</div>
                <p className={styles.hashtag}>#BeSensitiveToOralHealth</p>
                <p className={styles.terms}>*T&C Apply - only consultation fee. Procedures/surgeries not covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppDownload />
      <Footer />
    </div>
  );
};

export default MyBookings;
