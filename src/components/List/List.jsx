import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import dayjs from 'dayjs';

function List() {
  const { selectedCity, date } = useParams()
  const [geoID, setGeoID] = useState("")
  const dateArray = date.toString().split(',');

  const formattedDate1 = dayjs(dateArray[0].trim()).format('YYYY-MM-DD')
  const formattedDate2 = dayjs(dateArray[1].trim()).format('YYYY-MM-DD')

  const locationOptions = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
    params: {query: selectedCity},
    headers: {
      'x-rapidapi-key': '2a9fb91f69msh9980232d3b00c08p16ca17jsna9e8716caa20',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };
  const cityOptions = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels',
    params: {
      geoId: geoID,
      checkIn: formattedDate1,
      checkOut: formattedDate2,
      pageNumber: '1',
      currencyCode: 'USD'
    },
    headers: {
      'x-rapidapi-key': '2a9fb91f69msh9980232d3b00c08p16ca17jsna9e8716caa20',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
    }
  };
  
  useEffect(() => {
    try {
      axios.request(locationOptions).then((res) => setGeoID(res.data[0]?.geoID))
      
    } catch (error) {
      console.error(error);
    }
  })
  useEffect(() => {
    axios.request(cityOptions).then((res) => console.log(res.data))
  }, [geoID])
  return (
<div></div>
  )
}

export default List