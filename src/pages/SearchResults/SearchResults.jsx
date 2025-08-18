import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import AppDownload from '../../components/AppDownload/AppDownload';
import FAQSection from '../../components/FAQSection/FAQSection';
import Footer from '../../components/Footer/Footer';
import styles from './SearchResults.module.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const state = searchParams.get('state');
  const city = searchParams.get('city');

  useEffect(() => {
    if (state && city) {
      fetchMedicalCenters();
    } else {
      setLoading(false);
      setError('State and city parameters are required');
    }
  }, [state, city]);

  // const fetchMedicalCenters = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setMedicalCenters(Array.isArray(data) ? data : []);
  //   } catch (error) {
  //     console.error('Error fetching medical centers:', error);
  //     setError('Failed to fetch medical centers. Please try again.');
  //     setMedicalCenters([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMedicalCenters = async () => {
  setLoading(true);
  setError(null);
  try {
    const normalizedState = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();
    const normalizedCity = city.toUpperCase();

    const response = await fetch(
      `https://meddata-backend.onrender.com/data?state=${normalizedState}&city=${normalizedCity}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setMedicalCenters(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching medical centers:', error);
    setError('Failed to fetch medical centers. Please try again.');
    setMedicalCenters([]);
  } finally {
    setLoading(false);
  }
};


  const handleBooking = (center) => {
    setSelectedCenter(center);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = (bookingData) => {
    try {
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        ...selectedCenter,
        state,
        city,
        createdAt: new Date().toISOString(),
      };

      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      setShowBookingModal(false);
      setSelectedCenter(null);

      navigate('/my-bookings');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading} data-testid="loading">
        <div className={styles.spinner}></div>
        <p>Loading medical centers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} data-testid="error">
        <p>{error}</p>
        <button onClick={fetchMedicalCenters} className="btn-primary" data-testid="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.searchResults} data-testid="search-results">
      <div className="container">
        <div className={styles.resultsHeader}>
          <h1 data-testid="results-count">
            {medicalCenters.length} medical centers available in {city}
          </h1>
          <p>📅 Book appointments with minimum wait-time & verified doctor details</p>
        </div>

        <div className={styles.resultsContent}>
          <div className={styles.centersList} data-testid="centers-list">
            {medicalCenters.length === 0 ? (
              <div className={styles.noResults} data-testid="no-results">
                <p>No medical centers found for {city}, {state}</p>
              </div>
            ) : (
              medicalCenters.map((center, index) => (
                <div key={index} className={styles.centerCard} data-testid="center-card">
                  <div className={styles.centerIcon}>
                    <span role="img" aria-label="hospital">🏥</span>
                  </div>
                  <div className={styles.centerInfo}>
                    <h3>{center["Hospital Name"]}</h3>
                    <p className={styles.location}>
                      {center.Address}, {center.City}, {center.State} {center["ZIP Code"]}
                    </p>
                    <p className={styles.specialty}>
                      {center["Hospital Type"]} • {center["Hospital Ownership"]}
                    </p>
                    <div className={styles.consultation}>
                      <span className={styles.free}>FREE</span>
                      <span className={styles.consultationText}>₹500 Consultation fee at clinic</span>
                    </div>
                    <div className={styles.rating}>
                      <span className={styles.ratingBadge}>👍</span>
                    </div>
                  </div>
                  <div className={styles.centerActions}>
                    <div className={styles.availability}>
                      <span className={styles.availableToday}>Available Today</span>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => handleBooking(center)}
                      data-testid={`book-appointment-btn-${index}`}
                    >
                      Book FREE Center Visit
                    </button>
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

      <FAQSection />
      <AppDownload />
      <Footer />

      {showBookingModal && selectedCenter && (
        <BookingModal
          center={selectedCenter}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedCenter(null);
          }}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default SearchResults;
