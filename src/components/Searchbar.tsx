import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

const Searchbar: React.FC<{
  onSearch: (term: string, country: string) => void;
}> = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    await axios.get("https://restcountries.com/v3.1/all").then((res) => {
      const countriesRes = res.data
        .map((country: any) => country.name.common)
        .sort();
      setCountries(countriesRes);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(term, selectedCountry);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search for universities"
        variant="outlined"
        onChange={handleChange}
        sx={{ width: "400px" }}
      />

      <FormControl>
        <InputLabel>Country</InputLabel>
        <Select
          value={selectedCountry}
          label="Country"
          onChange={handleCountryChange}
          sx={{ width: "200px" }}
        >
          <MenuItem value="" key={300}>
            All countries
          </MenuItem>
          {countries.map((country, index) => (
            <MenuItem value={country} key={index}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        sx={{ marginLeft: "8px", backgroundColor: "#333333", color: "#FFF" }}
        type="submit"
        variant="contained"
      >
        Search
      </Button>
    </form>
  );
};

export default Searchbar;
