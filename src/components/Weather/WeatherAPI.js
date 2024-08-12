import axios from "axios";

const apiKey = "65cb5e93233b68f780d26b0f313dcc96"

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

export const fetchData = async(city) => {
  try {
   const response = await api.get('/forecast', {
      params: {
        q: city,
        appid: apiKey,
        units: "metric"
      }
    })
    //console.log('Data Response: ', response.data)
    return response.data
  } catch (error) {
    console.log('Data fetch failed!')
    throw error
  }
}