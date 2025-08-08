import React from 'react';
import styles from './HeroSection.module.css';
import hero_img from "../../assets/hero_image.png"
import SearchSection from '../SearchSection/SearchSection';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              Skip the travel! Find Online
              <br />
              <span className={styles.highlight}>Medical Centers</span>
            </h1>
            <p>
              Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
            </p>
            <button className="btn-primary">Find Centers</button>
          </div>
          <div className={styles.heroImage}>
            <img 
              src={hero_img} 
              alt="Medical professionals" 
              className={styles.doctorImage}
            />
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default HeroSection;
