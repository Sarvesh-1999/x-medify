import React from 'react';
import styles from './AppDownload.module.css';
import downloadImg from "../../assets/appdownload.png"
import google from "../../assets/google.png"
import apple from "../../assets/apple.png"


const AppDownload = () => {
  return (
    <section className={styles.appDownload}>
      <div className="container">
        <div className={styles.downloadContent}>
          <div className={styles.phoneImages}>
            <img 
              src={downloadImg} 
              alt="Medify App Screenshot 1" 
              className={styles.phone1}
            />
          
          </div>
          <div className={styles.downloadText}>
            <h2>Download the</h2>
            <h3><span className={styles.highlight}>Medify</span> App</h3>
            <p>Get the link to download the app</p>
            <div className={styles.phoneInput}>
              <div className={styles.countryCode}>+91</div>
              <input 
                type="tel" 
                placeholder="Enter phone number" 
                className={styles.phoneField}
              />
              <button className="btn-primary">Send SMS</button>
            </div>
            <div className={styles.storeButtons}>
              <img src={google} className={styles.storeBtn}>
               
              </img>
              <img src={apple} className={styles.storeBtn}>
              </img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
