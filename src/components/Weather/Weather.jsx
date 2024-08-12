import React, { useEffect, useState } from "react";
import { fetchData } from "./WeatherAPI";
import cities from "./Cities";
import WeatherCard from "./WeatherCard";
import styles from "./Weather.module.css";

function Weather() {
  const [city, setCity] = useState("Ankara");
  const [weatherData, setWeatherData] = useState({});
  const [weather, setWeather] = useState();
  const [desc, setDesc] = useState("");
  const [wind, setWind] = useState(0);

  const groupByDay = () => {
    if (weatherData && weatherData.list) {
      const groupedData = weatherData.list.reduce((acc, entry) => {
        const day = new Date(entry.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        });

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(entry.main.temp);
        setDesc(entry.weather[0].main);
        setWind(entry.wind.speed);
        console.log("kıjgkjkhjgkjh", weatherData);
        return acc;
      }, {});
      return {
        city: weatherData.city.name.match(/^[^\s]+/)[0],
        weather: { description: desc, groupedData: groupedData },
      };
    }
  };
  const averageTemp = (data) => {
    if (data) {
      const weatherArray = Object.keys(data.weather.groupedData).map((day) => {
        const temps = data.weather.groupedData[day];
        const avgTemp =
          temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return { day, avgTemp };
      });
      return { city: data.city, weather: weatherArray };
    }
    return null;
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(city);
      setWeatherData(data);
    };
    getData();
  }, [city, fetchData]);

  useEffect(() => {
    if (weatherData && weatherData.list) {
      const groupedData = groupByDay();
      const averagedData = averageTemp(groupedData);
      setWeather(averagedData);
    }
  }, [weatherData]);

  return (
    <div className={styles.container}>
      <select
        name="city"
        value={city}
        className={styles.citySelect}
        onChange={(e) => setCity(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city.id} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>

      {weather && weather.weather && (
        <div
          className={styles.cardContainer}
        >
          {weather.weather.map((item, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "row" }}>
              <WeatherCard
                cityName={weather.city}
                degree={item.avgTemp.toFixed(2)}
                day={item.day}
                description={desc}
                wind={wind}
              ></WeatherCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;
