import React from 'react';
import styles from './Footer.module.css';
import fb from "../../assets/fb.png"
import yt from "../../assets/yt.png"
import tweet from "../../assets/tweet.png"
import pin from "../../assets/pin.png"
import applogo from "../../assets/applogo.png"


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>
                <img src={applogo} alt="" />
              <span>Medify</span>
            </div>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <img src={fb} alt="" />
              </a>
              <a href="#" className={styles.socialLink}>
                <img src={tweet} alt="" />
              </a>
              <a href="#" className={styles.socialLink}>
                <img src={yt} alt="" />
              </a>
              <a href="#" className={styles.socialLink}>
                <img src={pin} alt="" />
              </a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Pricing</a></li>
              <li><a href="#">Our Gallery</a></li>
              <li><a href="#">Appointment</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <ul>
              <li><a href="#">Orthology</a></li>
              <li><a href="#">Neurology</a></li>
              <li><a href="#">Dental Care</a></li>
              <li><a href="#">Opthalmology</a></li>
              <li><a href="#">Cardiology</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Pricing</a></li>
              <li><a href="#">Our Gallery</a></li>
              <li><a href="#">Appointment</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>Copyright ©2023 Surya Nursing Home.com. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
