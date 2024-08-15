import React, { useState, useCallback } from "react";
import styles from "./CardGroup.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { City } from "country-state-city";
import Select from "react-select/async";
import axios from "axios";
import debounce from "lodash/debounce";
import Picker from "../DatePicker/Picker";
import dayjs from 'dayjs';


function CardGroup({ items }) {
 
  const [date, setDate] = useState([
    dayjs(), // Today
    dayjs().add(1, 'day'), // Tomorrow
  ])
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const [selectedCity, setSelectedCity] = useState(null);
  const PAGE_SIZE = 50;
  const [page, setPage] = useState(1);
  const fetchCities = async (inputValue) => {
    try {
      const response = await axios.get(`http://localhost:3000/cities`);
      const filteredCities = response.data
        .filter((city) =>
          city.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      return filteredCities.map((city) => ({
        label: `${city.name}, ${city.country}`,
        value: city.name,
      }));
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };
  const loadOptions = (inputValue, callback, { page = 1 } = {}) => {
    fetchCities(inputValue, page).then(callback);
  };
  const handleInputChange = (newValue) => {
    setPage(1); // Reset page on input change
    return newValue;
  };
  const handleMenuScrollToBottom = () => {
    setPage((prevPage) => prevPage + 5); // Load more data on scroll to bottom
  };
  const debouncedLoadOptions = useCallback(
    debounce((inputValue, callback) => {
      loadOptions(inputValue, callback, { page });
    }, 500),
    [page]
  );
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 55,
      minHeight: 35,
      width: 400,
      alignContent: "center",
      alignItems: "center",
      paddingTop: 0,
      paddingBottom: 0,
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      width: 400,
    }),
  };
  return (
    <div>
      <div className={styles.selectContainer}>
        <Select
          value={selectedCity}
          placeholder="Select a city"
          onChange={setSelectedCity}
          onInputChange={handleInputChange}
          loadOptions={debouncedLoadOptions}
          defaultOptions
          cacheOptions
          styles={customStyles}
          onMenuScrollToBottom={handleMenuScrollToBottom}
        />
            <Picker dateValue={date}
            onSelectDate={setDate}></Picker>
      </div>
      <div className={styles.cardContainer}>
        <div
          className="row"
          style={{ gap: 12, justifyContent: "space-evenly" }}
        >

          {items.map((item) => (
            <Link to={loggedIn ? `/list/${selectedCity?.value}/${date}` : "/login"} className={styles.card}>
              <div key={item.id} className={styles.card}>
                <img
                  className={styles.menuImg}
                  src={item.src}
                  width="100%"
                  height="100%"
                ></img>
                <div className={styles.titles}>
                  <h2>{item.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardGroup;
