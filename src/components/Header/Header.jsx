import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import applogo from "../../assets/applogo.png"


const Header = () => {
  const location = useLocation();

  return (
    <>
      <div className={styles.topBanner}>
        The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
      </div>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
                <img src={applogo} alt="" />
              <span>Medify</span>
            </Link>
            <nav className={styles.nav}>
              <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
                Find Doctors
              </Link>
              <Link to="/">Hospitals</Link>
              <Link to="/">Medicines</Link>
              <Link to="/">Surgeries</Link>
              <Link to="/">Software for Provider</Link>
              <Link to="/">Facilities</Link>
              <Link 
                to="/my-bookings" 
                className={`${styles.bookingsBtn} ${location.pathname === '/my-bookings' ? styles.active : ''}`}
              >
                My Bookings
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
