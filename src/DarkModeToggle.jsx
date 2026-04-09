import { Switch } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import PropTypes from "prop-types";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="toggle-container">
      <Brightness7 />
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        color="default"
      />
      <Brightness4 />
    </div>
  );
}

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
