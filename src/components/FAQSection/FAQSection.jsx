import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import happyImg from "../../assets/happypatient.png"
import smile from "../../assets/smile.png"

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Why choose our medical for your family?',
      answer: 'We provide comprehensive healthcare services with experienced doctors and state-of-the-art facilities.'
    },
    {
      question: 'Why we are different from others?',
      answer: 'Our patient-centric approach, advanced technology, and personalized care make us stand out.'
    },
    {
      question: 'Trusted & experience senior care & love',
      answer: 'Our team has years of experience in providing quality healthcare with compassion and care.'
    },
    {
      question: 'How to get appointment for emergency cases?',
      answer: 'For emergency cases, you can call our 24/7 helpline or visit our emergency department directly.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className="container">
        <div className={styles.faqContent}>
          <div className={styles.faqImage}>
            <img 
              src={happyImg}
              alt="Happy patients" 
            />
            <div className={styles.ratingBadge}>
              <span className={styles.emoji}><img src={smile} height={44} width={44} alt="" /></span>
              <div>
                <div className={styles.rating}>84k+</div>
                <div className={styles.ratingText}>Happy Patients</div>
              </div>
            </div>
          </div>
          <div className={styles.faqList}>
            <h2>Get Your Answer</h2>
            <h3>Frequently Asked Questions</h3>
            <div className={styles.faqItems}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span className={styles.faqIcon}>
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className={styles.faqAnswer}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
