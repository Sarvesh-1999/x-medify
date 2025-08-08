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
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch('https://meddata-backend.onrender.com/states');
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (state) => {
    if (!state) return;
    setLoading(true);
    try {
      const response = await fetch(`https://meddata-backend.onrender.com/cities/${state}`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    if (state) {
      fetchCities(state);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search-results?state=${selectedState}&city=${selectedCity}`);
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
        onCityChange={setSelectedCity}
        onSearch={handleSearch}
        loading={loading}
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
