export const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return require("../../assets/sunny.png");
      case "clear sky":
        return require("../../assets/sunny.png");
      case "light rain":
        return require("../../assets/sunny.png");

      case "Clouds":
        return require("../../assets/cloudy.png");
      case "few clouds":
        return require("../../assets/cloudy.png");
      case "overcast clouds":
        return require("../../assets/cloudy.png");
      case "scattered clouds":
        return require("../../assets/cloudy.png");
      case "broken clouds":
        return require("../../assets/cloudy.png");

      case "snow":
        return require("../../assets/snowy.png");
      case "light snow":
        return require("../../assets/snowy.png");

      case "Rain":
        return require("../../assets/rainy.png");

    default:
        return "../../assets/sunny.png";
    }
  };