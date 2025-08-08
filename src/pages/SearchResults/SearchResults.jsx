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
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const state = searchParams.get('state');
  const city = searchParams.get('city');

  useEffect(() => {
    if (state && city) {
      fetchMedicalCenters();
    }
  }, [state, city]);

  const fetchMedicalCenters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );
      const data = await response.json();
      setMedicalCenters(data);
    } catch (error) {
      console.error('Error fetching medical centers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (center) => {
    setSelectedCenter(center);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = (bookingData) => {
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      center: selectedCenter,
      state,
      city
    };
    
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    setShowBookingModal(false);
    setSelectedCenter(null);
    
    // Navigate to my bookings
    navigate('/my-bookings');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading medical centers...</p>
      </div>
    );
  }

  return (
    <div className={styles.searchResults}>
      <div className="container">
        <div className={styles.resultsHeader}>
          <h1>{medicalCenters.length} medical centers available in {city}</h1>
          <p>📅 Book appointments with minimum wait-time & verified doctor details</p>
        </div>

        <div className={styles.resultsContent}>
          <div className={styles.centersList}>
            {medicalCenters.map((center, index) => (
              <div key={index} className={styles.centerCard}>
                <div className={styles.centerIcon}>
                  <span>🏥</span>
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
                  >
                    Book FREE Center Visit
                  </button>
                </div>
              </div>
            ))}
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

      {showBookingModal && (
        <BookingModal
          center={selectedCenter}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default SearchResults;
