import React from 'react';
import styles from './StatsSection.module.css';
import ele1 from "../../assets/ele1.png"
import ele2 from "../../assets/ele2.png"
import ele3 from "../../assets/ele3.png"
import ele4 from "../../assets/ele4.png"


const StatsSection = () => {
  const stats = [
    { number: '5000+', label: 'Happy Patients' },
    { number: '200+', label: 'Hospitals' },
    { number: '1000+', label: 'Laboratories' },
    { number: '700+', label: 'Expert Doctors' }
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsContent}>
          <div className={styles.statsText}>
            <h2>Our Families</h2>
            <p>
              We will work with you to develop individualised care plans, 
              including management of chronic diseases. If we cannot assist, 
              we can provide referrals or advice about the type of practitioner 
              you require. We treat all enquiries sensitively and in the 
              strictest confidence.
            </p>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>
                  {index === 0 && <img src={ele1}/>}
                  {index === 1 && <img src={ele2}/>}
                  {index === 2 && <img src={ele3}/>}
                  {index === 3 && <img src={ele4}/>}
                </div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
