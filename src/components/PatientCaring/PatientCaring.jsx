import React from 'react';
import styles from './PatientCaring.module.css';
import patientcaringImg from "../../assets/patientcaring.png"

const PatientCaring = () => {
  return (
    <section className={styles.patientCaring}>
      <div className="container">
        <div className={styles.caringContent}>
          <div className={styles.caringImage}>
            <img 
              src={patientcaringImg} 
              alt="Patient caring" 
            />
          </div>
          <div className={styles.caringText}>
            <h2>Patient <span className={styles.highlight}>Caring</span></h2>
            <p>
              Our goal is to deliver quality of care in a courteous, respectful, and 
              compassionate manner. We hope you will allow us to care for you and 
              strive to be the first and best choice for healthcare.
            </p>
            <ul className={styles.features}>
              <li>✓ Stay Updated About Your Health</li>
              <li>✓ Check Your Results Online</li>
              <li>✓ Manage Your Appointments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientCaring;
