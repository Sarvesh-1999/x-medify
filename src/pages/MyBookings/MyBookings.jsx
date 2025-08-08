import React, { useState, useEffect } from 'react';
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer';
import styles from './MyBookings.module.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    // Filter bookings based on search term
    const filtered = bookings.filter(booking => 
      booking.center && 
      booking.center["Hospital Name"] && 
      booking.center["Hospital Name"].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [bookings, searchTerm]);

  const loadBookings = () => {
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(savedBookings);
      setFilteredBookings(savedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
      setFilteredBookings([]);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
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
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="btn-secondary">
                Clear
              </button>
            )}
            <button className="btn-primary">🔍 Search</button>
          </div>
        </div>

        <div className={styles.bookingsContent}>
          <div className={styles.bookingsList}>
            {bookings.length === 0 ? (
              <div className={styles.noBookings}>
                <p>No bookings found. Book your first appointment!</p>
                <button 
                  className="btn-primary" 
                  onClick={() => window.location.href = '/'}
                >
                  Book Appointment
                </button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className={styles.noBookings}>
                <p>No bookings match your search criteria.</p>
                <button onClick={clearSearch} className="btn-primary">
                  Clear Search
                </button>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className={styles.bookingCard} data-testid="booking-card">
                  <div className={styles.centerIcon}>
                    <span>🏥</span>
                  </div>
                  <div className={styles.bookingInfo}>
                    <h3>{booking.center && booking.center["Hospital Name"]}</h3>
                    <p className={styles.location}>
                      {booking.center && booking.center.Address}, {booking.center && booking.center.City}, {booking.center && booking.center.State}
                    </p>
                    <p className={styles.specialty}>
                      {booking.center && booking.center["Hospital Type"]} • {booking.center && booking.center["Hospital Ownership"]}
                    </p>
                    <p className={styles.bookingMeta}>
                      <span>State: {booking.state}</span>
                      <span>City: {booking.city}</span>
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
