import { useState, useEffect } from "react";
import WeatherConnector from "./WeatherConnector";
import DarkModeToggle from "./DarkModeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <WeatherConnector />
    </div>
  );
}

export default App;
