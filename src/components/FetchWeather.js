import axios from "axios";

const URL = "https://api.weatherbit.io/v2.0/current";
const API_KEY = "5cdcbe91365c41e68d36eb79f1ca1c21";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      city: query,
      key: API_KEY,
    },
  });
  return data;
};
