import React from 'react';
import styles from './SpecializationSection.module.css';
import specializationimg1 from "../../assets/specialization1.png"
import specializationimg2 from "../../assets/specialization2.png"
import specializationimg3 from "../../assets/specialization3.png"
import specializationimg4 from "../../assets/specialization4.png"
import specializationimg5 from "../../assets/specialization5.png"
import specializationimg6 from "../../assets/specialization6.png"
import specializationimg7 from "../../assets/specialization7.png"
import specializationimg8 from "../../assets/specialization8.png"


const SpecializationSection = () => {
  const specializations = [
    { icon: specializationimg1, name: 'Dentistry' },
    { icon: specializationimg2, name: 'Primary Care' },
    { icon: specializationimg3, name: 'Cardiology' },
    { icon: specializationimg4, name: 'MRI Resonance' },
    { icon: specializationimg5, name: 'Blood Test' },
    { icon: specializationimg6, name: 'Piscologist' },
    { icon: specializationimg7, name: 'Laboratory' },
    { icon: specializationimg8, name: 'X-Ray' }
  ];

  return (
    <section className={styles.specialization}>
      <div className="container">
        <h2>Find By Specialisation</h2>
        <div className={styles.specializationGrid}>
          {specializations.map((spec, index) => (
            <div key={index} className={styles.specCard}>
              <img src={spec.icon} className={styles.specIcon}></img>
              <span>{spec.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.viewAll}>
          <button className="btn-primary">View All</button>
        </div>
      </div>
    </section>
  );
};

export default SpecializationSection;
