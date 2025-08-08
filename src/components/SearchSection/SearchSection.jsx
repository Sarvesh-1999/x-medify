import React from "react";
import styles from "./SearchSection.module.css";
import searchlogo from "../../assets/Search.png";
import searchlogo2 from "../../assets/Icon.png";
import Doctor from "../../assets/Doctor.png";
import Drugstore from "../../assets/Drugstore.png";
import Capsule from "../../assets/Capsule.png";
import Hospital from "../../assets/Hospital.png";
import Ambulance from "../../assets/Ambulance.png";

const SearchSection = ({
  states,
  cities,
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
  onSearch,
  loading,
  error,
}) => {
  let optionCardsData = [
    {
      icon: Doctor,
      title: "Doctors",
    },
    {
      icon: Capsule,
      title: "Labs",
    },
    {
      icon: Hospital,
      title: "Hospitals",
    },
    {
      icon: Drugstore,
      title: "Medical Store",
    },
    {
      icon: Ambulance,
      title: "Ambulance",
    },
  ];
  return (
    <section className={styles.searchSection}>
      <div className="container">
        <form onSubmit={onSearch} className={styles.searchForm}>
          <div className={styles.searchInputs}>
            <div className={styles.inputGroup} id="state">
              <img src={searchlogo} alt="" />
              <select
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value)}
                className={styles.select}
                required
                data-testid="state-select"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup} id="city">
              <img src={searchlogo} alt="" />
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className={styles.select}
                disabled={!selectedState || loading}
                required
                data-testid="city-select"
              >
                <option value="">
                  {loading ? "Loading cities..." : "Select City"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            id="searchBtn"
            className={`btn-primary ${styles.searchBtn}`}
            disabled={!selectedState || !selectedCity || loading}
            data-testid="search-btn"
          >
            <img src={searchlogo2} alt="" />
            Search
          </button>
        </form>

        <div className={styles.searchOptions}>
          <p>You may be looking for</p>
          <div className={styles.optionCards}>
            {optionCardsData.map((ele, idx) => {
              return (
                <div className={styles.optionCard} key={idx}>
                  <img src={ele.icon} className={styles.icon} height={60} width={60}/>
                  <span>{ele.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
