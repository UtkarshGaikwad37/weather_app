import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

function WeatherInfo({ info }) {
  const { temp, feels_like, humidity } = info.main;
  const { description, icon } = info.weather[0];
  const windSpeed = info.wind?.speed || "N/A";

  return (
    <div className="center">
      <Card className="weather-card">
        <CardHeader
          avatar={
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
            />
          }
          title={info.name}
          subheader={new Date().toLocaleString()}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Temperature: {temp}°C
          </Typography>
          <div className="weather-details">
            <Typography variant="body2">Feels Like: {feels_like}°C</Typography>
            <Typography variant="body2">Humidity: {humidity}%</Typography>
            <Typography variant="body2">Wind Speed: {windSpeed} m/s</Typography>
            <Typography variant="body2">Condition: {description}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

WeatherInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

export default memo(WeatherInfo);
