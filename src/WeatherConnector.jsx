import { useState, useCallback } from "react";
import { Button, CircularProgress, Alert } from "@mui/material";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";

export default function WeatherConnector() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherByCity = useCallback(
    async (city) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, API_URL],
  );

  const fetchWeatherByCoords = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
          );
          if (!res.ok) throw new Error("Unable to fetch weather data");
          const data = await res.json();
          setInfo(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location");
        setLoading(false);
      },
    );
  }, [API_KEY, API_URL]);

  const handleCityChange = useCallback(
    (newCity) => {
      fetchWeatherByCity(newCity);
    },
    [fetchWeatherByCity],
  );

  return (
    <div className="weather-connector">
      <SearchBox getCity={handleCityChange} />
      <Button
        onClick={fetchWeatherByCoords}
        variant="outlined"
        fullWidth
        style={{ marginTop: "1rem", maxWidth: "500px" }}
      >
        Use Current Location
      </Button>
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      {error && (
        <div className="center">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {info && <WeatherInfo info={info} />}
    </div>
  );
}
