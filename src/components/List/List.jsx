import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./List.module.css";
import { useNavigate } from "react-router-dom";
import CardGroup from "../CardGroup/CardGroup";
import bgImage from "../../assets/white-bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../context/slices/citySlice";
import { addItem } from "../../context/slices/planSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";
import Select from "react-select/async";
import { Border } from "react-bootstrap-icons";

function List({date}) {

  const city = useSelector((state) => state.city.value);
  const [items, setItems] = useState();
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate("/");
  };
  const plan = useSelector((state) => state.plan.value);
  const [isIteminList, setIsItemInList] = useState(false);
  const dispatch = useDispatch();
  const [geoID, setGeoID] = useState();

  //const dateArray = date.match(/.*?GMT/g);
  // Parse and format each date string
  const formattedDate1 = dayjs(date[0]).format("YYYY-MM-DD");
  const formattedDate2 = dayjs(date[1]).format("YYYY-MM-DD");
  const locationOptions = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
    params: { query: city?.value },
    headers: {
      "x-rapidapi-key": "2a9fb91f69msh9980232d3b00c08p16ca17jsna9e8716caa20",
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };
  const cityOptions = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
    params: {
      dest_id: geoID,
      arrival_date: formattedDate1,
      departure_date: formattedDate2,
      search_type: "CITY",
      pageNumber: "1",
      currencyCode: "USD",
    },
    headers: {
      "x-rapidapi-key": "2a9fb91f69msh9980232d3b00c08p16ca17jsna9e8716caa20",
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };
  // These request will be executed when the tripadvisor api is available
  useEffect(() => {
    axios
      .request(locationOptions)
      .then((res) => {
        if (res.data) {
          console.log("geo:", res.data)
          const id = res.data.data[0]?.dest_id;
          if (id) {
            setGeoID(id);
          } else {
            console.error("dest_id not found in response");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching location options:", error);
      });
  }, [city]);

  useEffect(() => {
    if (geoID !== null) {
      axios
        .request(cityOptions)
        .then((res) => {
          //console.log("hotels", res.data);
          setItems(res.data.data.hotels);
        })
        .catch((error) => {
          console.error("Error fetching city options:", error);
        });
    }
  }, [geoID]);

  const fetchCities = async (inputValue) => {
    try {
      const response = await axios.get(`http://localhost:3000/cities`);
      const filteredCities = response.data
        .filter((city) =>
          city.name.toLowerCase().includes(inputValue.toLowerCase())
        )
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
  const PAGE_SIZE = 50;
  const [page, setPage] = useState(1);
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
      backgroundColor: "transparent",
      fontFamily: "Radio Canada Big",
      fontSize: 60,
      color: "white",
      borderWidth: 0,
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Radio Canada Big",
      fontSize: 60,
      color: "rgb(236, 236, 230)",
      paddingLeft: 24,
    }),
    singleValue: (base) => ({
      ...base,
      fontFamily: "Radio Canada Big",
      fontSize: 60,
      color: "rgb(236, 236, 230)",
      paddingLeft: 24,
    }),
    menu: (base) => ({
      ...base,
      marginTop: 0,
      width: 400,
    }),
  }
  const addToList = (item) => {
    const isItemInPlan = plan.some(
      (planItem) => planItem.id === item.property.id
    )
    setIsItemInList(isItemInPlan);
    if (!isIteminList) {
      //item.type = menuType;
      dispatch(addItem(item));
    }
  }
  const customComponents = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
  }
  return (
    // <div className={styles.container}>
    //   <row style={{ display: "flex", alignItems: "center" }}>
    //     <Select
    //       value={city}
    //       onChange={dispatch(setCity())}
    //       onInputChange={handleInputChange}
    //       loadOptions={debouncedLoadOptions}
    //       defaultOptions
    //       cacheOptions
    //       components={customComponents}
    //       styles={customStyles}
    //       onMenuScrollToBottom={handleMenuScrollToBottom}
    //     />
    //     <div className={styles.title}>{menuType}</div>
    //   </row>
    //   <div className={styles.innerContainer}>
    //     {items && (
    //       <CardGroup
    //         items={items}
    //         routeLink={onCardClick}
    //         isCategory={false}
    //         addToList={addToList}
    //       ></CardGroup>
    //     )}
    //   </div>
    // </div>
    <CardGroup
            items={items}
            routeLink={onCardClick}
            isCategory={false}
            addToList={addToList}
          ></CardGroup>
  );
}

export default List;
