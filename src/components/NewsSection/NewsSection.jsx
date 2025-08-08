import React from 'react';
import styles from './NewsSection.module.css';
import latestNewsImg from "../../assets/latestnews.png"
import latestNewsDoc from "../../assets/latestdoc.png"


const NewsSection = () => {
  const news = [
    {
      title: '6 Tips To Protect Your Mental Health',
      date: 'Medical | March 31, 2022',
      image: latestNewsImg,
      doc: latestNewsDoc,
      docName:"Rebecca lee"
    },
    {
      title: '6 Tips To Protect Your Mental Health',
      date: 'Medical | March 31, 2022',
      image: latestNewsImg,
      doc: latestNewsDoc,
      docName:"Rebecca lee"


    },
    {
      title: '6 Tips To Protect Your Mental Health',
      date: 'Medical | March 31, 2022',
      image: latestNewsImg,
      doc: latestNewsDoc,
      docName:"Rebecca lee"

    }
  ];

  return (
    <section className={styles.news}>
      <div className="container">
        <div className={styles.newsHeader}>
          <h2>Read Our Latest News</h2>
        </div>
        <div className={styles.newsGrid}>
          {news.map((article, index) => (
            <div key={index} className={styles.newsCard}>
              <div className={styles.newsImage}>
                <img src={article.image || "/placeholder.svg"} alt={article.title} />
              </div>
              <div className={styles.newsContent}>
                <p className={styles.newsDate}>{article.date}</p>
                <h3>{article.title}</h3>
                <div className={styles.newsDoc}>
                  <img src={article.doc} alt={article.title} />
                  <p>{article.docName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
