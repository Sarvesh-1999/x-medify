import React from "react";
import styles from "./SpecialistSection.module.css";
import docimg1 from "../../assets/doc1.png";
import docimg2 from "../../assets/doc2.png";
import docimg3 from "../../assets/doc3.png";
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const SpecialistSection = () => {
  const specialists = [
    {
      name: "Dr. Ahmad Khan",
      specialty: "Neurologist",
      image: docimg1,
    },
    {
      name: "Dr. Heena Sachdeva",
      specialty: "Orthopadics",
      image: docimg2,
    },
    {
      name: "Dr. Ankur Sharma",
      specialty: "Medicine",
      image: docimg3,
    },
    {
      name: "Dr. Ahmad Khan",
      specialty: "Neurologist",
      image: docimg1,
    },
    {
      name: "Dr. Heena Sachdeva",
      specialty: "Orthopadics",
      image: docimg2,
    },
    {
      name: "Dr. Ankur Sharma",
      specialty: "Medicine",
      image: docimg3,
    },
  ];

  return (
    <section className={styles.specialists}>
      <div className="container">
        <h2>Our Medical Specialist</h2>

        {/* <div className={styles.specialistGrid}> */}

        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
        >
          {specialists.map((specialist, index) => (
            <SwiperSlide className={styles.swiperSlide}>
            <div key={index} className={styles.specialistCard}>
              <div className={styles.specialistImage}>
                <img
                  src={specialist.image || "/placeholder.svg"}
                  alt={specialist.name}
                />
              </div>
              <h3>{specialist.name}</h3>
              <p>{specialist.specialty}</p>
            </div>
        </SwiperSlide>
          ))}
        </Swiper>

        {/* </div> */}
      </div>
    </section>
  );
};

export default SpecialistSection;


       
