import React, { useState, useCallback } from "react";
import CardGroup from "../CardGroup/CardGroup";
import { data } from "./data";
import styles from "./Menu.module.css";
import Select from "react-select/async";
import { useSelector, useDispatch } from "react-redux";
import { setCity } from "../../context/slices/citySlice";
import axios from "axios";
import debounce from "lodash/debounce";
import Picker from "../DatePicker/Picker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DailyPlan from "../DailyPlan/DailyPlan";
function Menu({fullpageApi}) {
  const selectedCity = useSelector((state) => state.city.value);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const PAGE_SIZE = 50;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [date, setDate] = useState([
    dayjs(), // Today
    dayjs().add(1, "day"), // Tomorrow
  ]);
  const [dayRange, setDayRange] = useState([])
  const generateDateArray = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
  
    const datesInRange = [];
    let currentDate = start;
  
    while (currentDate.isBefore(end, 'day') || currentDate.isSame(end, 'day')) {
      datesInRange.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, 'day');
    }
  
    return datesInRange;
  }

  const handleDateChange = (date) => {
    const start = dayjs(date[0]);
    const end = dayjs(date[1]);
  
    const datesArray = generateDateArray(start, end);
    setDayRange(datesArray)
  
    setDate([start, end]); // Make sure you're setting `dayjs` objects in the state
  }
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
        label: city.name,
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
          onChange={(selectedOption) => dispatch(setCity(selectedOption))}
          onInputChange={handleInputChange}
          loadOptions={debouncedLoadOptions}
          defaultOptions
          cacheOptions
          styles={customStyles}
          onMenuScrollToBottom={handleMenuScrollToBottom}
        />
       <Picker dateValue={date} onSelectDate={handleDateChange}></Picker>
      </div>
      <div style={{justifyContent:"center", display:"flex", justifyItems:"center"}}>
      <DailyPlan fullpageApi={fullpageApi} days={dayRange} date={date}></DailyPlan>
      </div>
     
      {/* <CardGroup
        items={data}
        isCategory={true}
        selectedCity={selectedCity?.value}
        date={date}
      ></CardGroup> */}
    </div>
  );
}

export default Menu;
