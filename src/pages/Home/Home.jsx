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
import styles from './Home.module.css';
import Accordion from '../../components/Accordion/Accordion';

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

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

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    setError(null);
    if (state) {
      fetchCities(state);
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setError(null);
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
      
      <Accordion/>
      <SpecializationSection />
      <SpecialistSection />
      <PatientCaring />
      <NewsSection />
      <StatsSection />
      <FAQSection />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
