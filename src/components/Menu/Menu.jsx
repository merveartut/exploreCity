import React, { useState, useCallback } from "react";
import CardGroup from "../CardGroup/CardGroup";
import { data } from "./data";
import styles from "./Menu.module.css";
import Select from "react-select/async";
import { useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash/debounce";
import Picker from "../DatePicker/Picker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function Menu() {
  const [selectedCity, setSelectedCity] = useState(null);
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const PAGE_SIZE = 50;
  const [page, setPage] = useState(1);
  const [date, setDate] = useState([
    dayjs(), // Today
    dayjs().add(1, "day"), // Tomorrow
  ]);
  const navigate = useNavigate()
 
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
    <div className={styles.outerContainer}>
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
        <Picker dateValue={date} onSelectDate={setDate}></Picker>
      </div>
      <CardGroup
        items={data}
        isCategory={true}
        selectedCity={selectedCity?.value}
      ></CardGroup>
    </div>
  );
}

export default Menu;
