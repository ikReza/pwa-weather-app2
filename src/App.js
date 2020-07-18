import React, { useState } from "react";
import "./App.css";

import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";

import { fetchWeather } from "./components/FetchWeather";
import Footer from "./components/Footer";

const InputField = withStyles({
  root: {
    border: "none",
    outline: "none",
    borderRadius: "15px",
    boxShadow:
      "inset -2px -2px 6px rgba(255, 255, 255, 0.1), inset 2px 2px 6px rgba(0, 0, 0, 0.8)",

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0,0,0)",
        borderRadius: "15px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0,0,0)",
        borderRadius: "15px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0,0,0)",
        borderRadius: "15px",
      },
    },
  },
})(TextField);

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data.data[0]);
      setQuery("");
    }
  };

  return (
    <Box component="div" className="root">
      <Grid
        container
        justify="center"
        component="div"
        className="main-container"
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={6}
          component="div"
          className="user-control"
        >
          <Box component="div" className="search-bar">
            <InputField
              variant="outlined"
              placeholder="Search"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search style={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: { color: "black" },
              }}
            />
          </Box>
          <br />
          {weather.app_temp && (
            <Box component="div" className="output">
              <Typography variant="h5" gutterBottom>
                <span>{weather.city_name}</span>
                <sup className="country">{weather.country_code}</sup>
              </Typography>
              <Typography variant="h4">
                {Math.round(weather.app_temp)}
                <sup style={{ fontSize: "18px" }}>&deg;C</sup>
              </Typography>
              <Box component="div">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                  alt={weather.weather.description}
                />
                <Typography className="weather-description">
                  {weather.weather.description}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default App;
