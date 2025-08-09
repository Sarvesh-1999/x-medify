import React, { useState, useRef, useEffect } from "react";
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
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target)
      ) {
        setIsStateDropdownOpen(false);
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStateSelect = (state) => {
    onStateChange(state);
    setIsStateDropdownOpen(false);
  };

  const handleCitySelect = (city) => {
    onCityChange(city);
    setIsCityDropdownOpen(false);
  };

  const optionCardsData = [
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
            {/* State Dropdown */}
            <div
              className={styles.inputGroup}
              id="state"
              ref={stateDropdownRef}
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
            >
              <img src={searchlogo} alt="" />
              <div className={styles.customSelect}>
                <div className={styles.selectDisplay}>
                  {selectedState || "Select State"}
                </div>
                <ul
                  className={styles.dropdownList}
                  data-testid="state-dropdown"
                >
                  {isStateDropdownOpen &&
                    states.map((state, index) => (
                      <li
                        key={index}
                        data-testid={`state-${state}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStateSelect(state);
                        }}
                        className={styles.dropdownItem}
                      >
                        {state}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* City Dropdown */}
            <div
              className={styles.inputGroup}
              id="city"
              ref={cityDropdownRef}
              onClick={() =>
                !loading &&
                selectedState &&
                setIsCityDropdownOpen(!isCityDropdownOpen)
              }
            >
              <img src={searchlogo} alt="" />
              <div className={styles.customSelect}>
                <div className={styles.selectDisplay}>
                  {loading
                    ? "Loading cities..."
                    : selectedCity || "Select City"}
                </div>
                 <ul
                    className={styles.dropdownList}
                    data-testid="city-dropdown"
                  >
                {isCityDropdownOpen && !loading && selectedState && (
                 
                    cities.map((city, index) => (
                      <li
                        key={index}
                        data-testid={`city-${city}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCitySelect(city);
                        }}
                        className={styles.dropdownItem}
                      >
                        {city}
                      </li>
                    ))
                  
                )}
                </ul>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}

          {/* Search Button */}
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

        {/* Option Cards */}
        <div className={styles.searchOptions}>
          <p>You may be looking for</p>
          <div className={styles.optionCards}>
            {optionCardsData.map((ele, idx) => {
              return (
                <div className={styles.optionCard} key={idx}>
                  <img
                    src={ele.icon}
                    className={styles.icon}
                    height={60}
                    width={60}
                  />
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
