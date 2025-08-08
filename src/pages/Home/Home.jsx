import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection';
import SearchSection from '../../components/SearchSection/SearchSection';
import SpecializationSection from '../../components/SpecializationSection/SpecializationSection';
import SpecialistSection from '../../components/SpecialistSection/SpecialistSection';
import PatientCaring from '../../components/PatientCaring/PatientCaring';
import NewsSection from '../../components/NewsSection/NewsSection';
import StatsSection from '../../components/StatsSection/StatsSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer';
import BookingModal from '../../components/BookingModal/BookingModal';
import styles from './Home.module.css';
import Accordion from '../../components/Accordion/Accordion';

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
    loadBookings();
  }, []);

  // Fetch hospitals when both state and city are selected
  useEffect(() => {
    if (selectedState && selectedCity) {
      fetchHospitals();
    }
  }, [selectedState, selectedCity]);

  // Persist bookings in localStorage
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    console.log('Bookings saved to localStorage:', bookings);
  }, [bookings]);

  const fetchStates = async () => {
    try {
      setError(null);
      const response = await fetch('https://meddata-backend.onrender.com/states');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching states:', error);
      setError('Failed to fetch states. Please try again.');
    }
  };

  const fetchCities = async (state) => {
    if (!state) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://meddata-backend.onrender.com/cities/${encodeURIComponent(state)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Failed to fetch cities. Please try again.');
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching hospitals for:', selectedState, selectedCity);
      const response = await fetch(
        `https://meddata-backend.onrender.com/data?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Hospitals fetched:', data);
      setHospitals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('Failed to fetch hospitals. Please try again.');
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    setHospitals([]);
    setError(null);
    if (state) {
      fetchCities(state);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setError(null);
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = (bookingData) => {
    try {
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        center: selectedHospital,
        state: selectedState,
        city: selectedCity,
        createdAt: new Date().toISOString()
      };
      
      console.log('New booking created:', newBooking);
      setBookings([...bookings, newBooking]);
      setShowBookingModal(false);
      setSelectedHospital(null);
      
      // Navigate to my bookings
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  const loadBookings = () => {
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(savedBookings);
      console.log('Bookings loaded from localStorage:', savedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search-results?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    } else {
      setError('Please select both state and city');
    }
  };

  return (
    <div className={styles.home}>
      <HeroSection  />
      <SearchSection 
        states={states}
        cities={cities}
        selectedState={selectedState}
        selectedCity={selectedCity}
        onStateChange={handleStateChange}
        onCityChange={handleCityChange}
        onSearch={handleSearch}
        loading={loading}
        error={error}
      />
      
      {/* Display hospitals if available */}
      {hospitals.length > 0 && (
        <div className="container">
          <div className={styles.hospitalsSection}>
            <h2>Available Hospitals in {selectedCity}</h2>
            <div className={styles.hospitalsList}>
              {hospitals.map((hospital, index) => (
                <div key={index} className={styles.hospitalCard}>
                  <div className={styles.hospitalIcon}>🏥</div>
                  <div className={styles.hospitalInfo}>
                    <h3>{hospital["Hospital Name"]}</h3>
                    <p>{hospital.Address}, {hospital.City}, {hospital.State}</p>
                    <p>{hospital["Hospital Type"]} • {hospital["Hospital Ownership"]}</p>
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => handleHospitalClick(hospital)}
                    data-testid="book-appointment-btn"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Accordion/>
      <SpecializationSection />
      <SpecialistSection />
      <PatientCaring />
      <NewsSection />
      <StatsSection />
      <FAQSection />
      <AppDownload />
      <Footer />

      {showBookingModal && selectedHospital && (
        <BookingModal
          center={selectedHospital}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedHospital(null);
          }}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
};

export default Home;
