import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

export default function SearchBox({ getCity }) {
  const [city, setCity] = useState("");

  const handleChange = (e) => setCity(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      getCity(city);
      setCity("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="search-box">
      <TextField
        label="Enter place name"
        variant="outlined"
        fullWidth
        value={city}
        onChange={handleChange}
        sx={{
          input: { color: "var(--text-color)" },
          label: { color: "var(--text-color)" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "var(--text-color)",
            },
            "&:hover fieldset": {
              borderColor: "var(--text-color)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--text-color)",
            },
          },
        }}
        InputLabelProps={{ style: { color: "var(--text-color)" } }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Search
      </Button>
    </Box>
  );
}

SearchBox.propTypes = {
  getCity: PropTypes.func.isRequired,
};
